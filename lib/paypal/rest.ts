import "server-only";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const baseUrl =
  process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export const paypalCurrency = process.env.PAYPAL_CURRENCY ?? "MXN";

if (!clientId || !clientSecret) {
  throw new Error("Faltan las credenciales de PayPal");
}

type PayPalCapture = {
  id?: string;
  status?: string;
  custom_id?: string;
  amount?: {
    currency_code?: string;
    value?: string;
  };
};

type PayPalOrderResponse = {
  id: string;
  status: string;
  purchase_units?: Array<{
    custom_id?: string;
    amount?: {
      currency_code?: string;
      value?: string;
    };
    payments?: {
      captures?: PayPalCapture[];
    };
  }>;
};

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo autenticar con PayPal");
  }

  const data: { access_token: string } = await response.json();

  return data.access_token;
}

async function paypalRequest<T>(
  path: string,
  options: {
    method: "GET" | "POST";
    body?: unknown;
    requestId?: string;
  }
): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.requestId
        ? { "PayPal-Request-Id": options.requestId }
        : {}),
    },
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : {}),
    cache: "no-store",
  });

  if (!response.ok) {

    const errorBody = await response.text();

    console.error("PayPal API Error:", {
      status: response.status,
      path,
      body: errorBody,
    });

    // No devuelvas tokens ni credenciales al cliente.
    throw new Error(`PayPal respondió con HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function createPayPalOrder(params: {
  orderId: string;
  amount: string;
}): Promise<PayPalOrderResponse> {
  return paypalRequest<PayPalOrderResponse>(
    "/v2/checkout/orders",
    {
      method: "POST",
      requestId: `create-${params.orderId}`,
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            custom_id: params.orderId,
            amount: {
              currency_code: paypalCurrency,
              value: params.amount,
            },
          },
        ],
      },
    }
  );
}

export async function getPayPalOrder(
  paypalOrderId: string
): Promise<PayPalOrderResponse> {
  return paypalRequest<PayPalOrderResponse>(
    `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}`,
    { method: "GET" }
  );
}

export async function capturePayPalOrder(
  paypalOrderId: string,
  orderId: string
): Promise<PayPalOrderResponse> {
  return paypalRequest<PayPalOrderResponse>(
    `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: "POST",
      requestId: `capture-${orderId}`,
      body: {},
    }
  );
}