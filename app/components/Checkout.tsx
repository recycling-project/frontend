'use client';

/**
 * 최신 Toss 결제 위젯 SDK(v2) 사용법 정리
 * ---------------------------------------------------------
 * ✔ import:  loadPaymentWidget 만 존재 (loadTossPayments 없음)
 * ✔ widgets(), renderPaymentMethods(), renderAgreement() 사용 가능
 * ✔ customerKey = 고객 식별자(회원/비회원 둘 다 가능)
 * ✔ orderId = 결제 요청할 때마다 고유 생성
 * ---------------------------------------------------------
 */

import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react";

// 🔐 클라이언트 키 (.env.local) gck test키 
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

// 🧾 주문 ID 생성기
const generateOrderId = () =>
  `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Props 타입
interface CheckoutProps {
  amount: number;
  orderName: string;
}

export default function Checkout({ amount, orderName }: CheckoutProps) {
  // Toss 객체 저장용 Ref
  const paymentWidgetRef = useRef<any>(null); // 결제위젯 객체 전체
  const paymentMethodsWidgetRef = useRef<any>(null); // 결제수단 UI
  const agreementWidgetRef = useRef<any>(null); // 약관 UI

  const [isWidgetReady, setIsWidgetReady] = useState(false); // 💡 위젯 준비 상태

  /**
   * 💡 위젯 초기화
   * 페이지가 로드되거나 amount가 바뀌면 Toss 결제 UI를 다시 그린다.
   */
  useEffect(() => {
    // 💡 amount가 바뀔 때마다 위젯을 새로 렌더링하고, 버튼을 비활성화
    setIsWidgetReady(false);
    console.log("TOSS KEY >>>", process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);

    const initializeWidget = async () => {
      try {
        // 고객 식별용 키 (비회원도 가능)
        const customerKey = generateOrderId();

        // 💡 최신 SDK: loadPaymentWidget(clientKey, customerKey)
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
        paymentWidgetRef.current = paymentWidget;

        /**
         * 🧩 결제 수단 UI 렌더링
         * 표시할 div(id="payment-method") 위치에 렌더링됨
         */
        const methodsWidget = await paymentWidget.renderPaymentMethods(
          "#payment-method",
          { value: amount } // ✅ amount prop을 직접 사용
        );

        paymentMethodsWidgetRef.current = methodsWidget;

        /**
         * 🧩 약관 UI 렌더링
         * 표시할 div(id="agreement") 위치에 렌더링됨
         */
        const agreeWidget = await paymentWidget.renderAgreement("#agreement");
        agreementWidgetRef.current = agreeWidget;

        // 💡 모든 위젯이 렌더링되면 결제 버튼 활성화
        setIsWidgetReady(true);
      } catch (error) {
        console.error("Toss widget 초기화 오류:", error);
      }
    };

    initializeWidget();
  }, [amount]); // ✅ useEffect 종속성을 amount로 변경

  /**
   * 🧾 결제 요청
   * 사용자가 '결제하기' 버튼 클릭 시 실행
   */
  const handlePaymentRequest = async () => {
    if (!paymentWidgetRef.current) {
      console.error("결제 위젯이 초기화되지 않았습니다.");
      return;
    }

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: generateOrderId(),
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6">주문서</h2>
      <div id="payment-method" className="mb-4" />
      <div id="agreement" className="mb-6" />
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">결제 금액</span>
          <span className="text-xl font-bold">{amount.toLocaleString()}원</span>
        </div>
      </div>
      <button
        className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        onClick={handlePaymentRequest}
        disabled={!isWidgetReady}
      >
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
  );
}

