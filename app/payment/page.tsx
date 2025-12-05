'use client';

import { useSearchParams } from "next/navigation";
import Checkout from "../components/Checkout";

export const dynamic = "force-dynamic";

export default function PaymentPage() {
  const params = useSearchParams();
  const amount = Number(params.get("amount"));
  const orderName = params.get("orderName") ?? "대형폐기물 수수료";

  if (!amount) {
    return <div>결제 금액 정보 없음</div>;
  }

  return (
    <div className="container mx-auto my-12">
      <Checkout amount={amount} orderName={orderName} />
    </div>
  );
}