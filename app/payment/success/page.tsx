'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const requestData = {
      orderId: params.get("orderId"),
      amount: params.get("amount"),
      paymentKey: params.get("paymentKey"),
    };

    async function confirm() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/toss/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const json = await res.json();

      if (!res.ok) {
        router.push(`/payment/fail?message=${json.message}&code=${json.code}`);
      }
    }

    confirm();
  }, []);

  return (
    <div>
      <h2>결제 성공</h2>
      <p>orderId: {params.get("orderId")}</p>
      <p>amount: {params.get("amount")}</p>
    </div>
  );
}
