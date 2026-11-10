import { capturePayment, createPayment } from "@/app/actions/order/paypal";
import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";


interface Props {
    orderId:string;
    setProcessing: ( value : boolean ) => void;
    setPaid: ( value : boolean ) => void;
    setError: (error: string|null ) => void;
}


const PayPalButton = ({
    orderId,
    setProcessing,
    setPaid,
    setError,
} : Props) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const environment =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
      ? "production"
      : "sandbox";

  if (!clientId) {
    return (
      <p role="alert" className="text-sm text-red-600">
        PayPal no está configurado.
      </p>
    );
  }

  return (
    <PayPalProvider
        clientId={clientId}
        environment={environment}
        components={["paypal-payments"]}
        pageType="checkout"
        locale="es-ES"
    >
        <PayPalOneTimePaymentButton
        createOrder={async () => {
            setError(null);
            setProcessing(true);

            try {
            return await createPayment(orderId);
            } catch(e) {
              console.log(e);
              
              setProcessing(false);
              setError(
                  "No se pudo iniciar el pago. Verifica el estado del pedido e inténtalo nuevamente."
              );

            throw new Error("No se pudo crear el pago");
            }
        }}
        onApprove={async ({ orderId: paypalOrderId }) => {
            setProcessing(true);
            setError(null);

            try {
            await capturePayment(paypalOrderId);
            setPaid(true);
            } catch(e) {
              console.log(e);
              
            setError(
                "No pudimos confirmar el pago. No vuelvas a pagar sin verificar primero el estado de tu pedido."
            );
            } finally {
            setProcessing(false);
            }
        }}
        onCancel={() => {
            setProcessing(false);
            setError("El pago fue cancelado.");
        }}
        onError={() => {
            setProcessing(false);
            setError(
            "Ocurrió un problema con PayPal. Comprueba el estado de tu pedido antes de reintentar."
            );
        }}
        presentationMode="auto"
        />
    </PayPalProvider>
  )
}

export default PayPalButton
