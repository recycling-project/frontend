"use client";

import { useSearchParams } from "next/navigation";
import Checkout from "../components/Checkout";;

export default function PaymentPage() {
  const params = useSearchParams();

  const amount = Number(params.get("amount"));
  const orderName = params.get("orderName") || "주문";

  if (!amount || !orderName) {
    return <div>유효하지 않은 결제 요청입니다.</div>;
  }

  return <Checkout amount={amount} orderName={orderName} />;
}
