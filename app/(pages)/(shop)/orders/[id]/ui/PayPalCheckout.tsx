"use client";

import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { OrderPaid } from "./OrderPaid";

type Props = {
  orderId: string;
};

export default function PayPalCheckout({ orderId }: Props) {
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-neutral-900">
        Paga con PayPal
      </h2>

      <p className="mb-5 text-sm text-neutral-500">
        Completa el pago de forma segura.
      </p>

      {paid ? (
        <OrderPaid />
      ) : (
          <PayPalButton 
            orderId={orderId}
            setError={setError}
            setPaid={setPaid}
            setProcessing={setProcessing}
          />
      )}

      {processing && (
        <p role="status" className="mt-4 text-sm text-neutral-500">
          Procesando pago...
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </section>
  );
}