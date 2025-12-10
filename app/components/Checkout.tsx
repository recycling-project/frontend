'use client';

import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react";

<<<<<<< HEAD
// 🔐 클라이언트 키 (.env.local) gck test키 
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
=======
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
>>>>>>> dagyeong

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
<<<<<<< HEAD
    <div className="w-screen min-h-screen p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6">주문서</h2>
      <div id="payment-method" className="mb-4" />
      <div id="agreement" className="mb-6" />
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">결제 금액</span>
          <span className="text-xl font-bold">{amount.toLocaleString()}원</span>
=======
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
>>>>>>> dagyeong
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
<<<<<<< HEAD
        {isWidgetReady ? "결제하기" : "결제 위젯 불러오는 중..."}
      </button>

      {/* 🔥 여기 아래에 스타일 추가 */}
      <style jsx global>{`
      #payment-method > div {
        max-width: 100% !important;
        width: 100% !important;
        transform: scale(1.5); 
        transform-origin: top center;
      }
    `}</style>
    </div>
=======
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
>>>>>>> dagyeong
  );
}
