'use client';

import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const generateOrderId = () =>
  `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;

interface CheckoutProps {
  amount: number;
  orderName: string;
}

export default function Checkout({ amount, orderName }: CheckoutProps) {
  const paymentWidgetRef = useRef<any>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const agreementWidgetRef = useRef<any>(null);

  const [isWidgetReady, setIsWidgetReady] = useState(false);

  useEffect(() => {
    setIsWidgetReady(false);

    const init = async () => {
      try {
        const customerKey = generateOrderId();

        const widget = await loadPaymentWidget(clientKey, customerKey);
        paymentWidgetRef.current = widget;

        const methodsWidget = await widget.renderPaymentMethods(
          "#payment-method-inner",
          { value: amount }
        );
        paymentMethodsWidgetRef.current = methodsWidget;

        const agreementWidget = await widget.renderAgreement("#agreement-inner");
        agreementWidgetRef.current = agreementWidget;

        setIsWidgetReady(true);
      } catch (e) {
        console.error("Toss 위젯 오류:", e);
      }
    };

    init();
  }, [amount]);

  const handlePaymentRequest = async () => {
    if (!paymentWidgetRef.current) return;

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: generateOrderId(),
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 오류:", error);
    }
  };

  return (
    <div className="wrapper w-full mx-auto p-8 bg-white rounded-lg shadow-lg">

      <h2 className="text-3xl font-bold mb-10">주문서</h2>

      {/* ------------------------------- */}
      {/* 🔥 결제 수단 UI (확대 적용)       */}
      {/* ------------------------------- */}
      <div
        style={{
          width: "100%",
          overflow: "visible",
          marginBottom: "200px",
        }}
      >
        <div
          style={{
            transform: "scale(1.6)",          // ★ 버튼 전체 확대
            transformOrigin: "top left",
            width: "600px",                    // Toss 기본 폭
            height: "auto",
            marginLeft: "-45px",
          }}
        >
          <div id="payment-method-inner" />
        </div>
      </div>

      {/* ------------------------------- */}
      {/* 🔥 약관 UI (확대 적용)            */}
      {/* ------------------------------- */}
      <div
        style={{
          width: "100%",
          overflow: "visible",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "top left",
            width: "500px",
          }}
        >
          <div id="agreement-inner" />
        </div>
      </div>

      {/* 결제 금액 박스 */}
<div
  style={{
    padding: "40px",
    background: "#f2f2f2",
    borderRadius: "20px",
    marginBottom: "80px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span
      style={{
        fontSize: "40px",
        fontWeight: 600,
      }}
    >
      결제 금액
    </span>

    <span
      style={{
        fontSize: "40px",
        fontWeight: 600,
      }}
    >
      {amount.toLocaleString()}원
    </span>
  </div>
</div>
</div>
  );
}
