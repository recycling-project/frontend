"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Checkout from "../components/Checkout";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const amount = Number(params.get("amount"));
  const orderName = params.get("orderName") ?? "대형폐기물 수수료";

  if (!amount) {
    return (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(to bottom, #9EE0AE, #36A64A)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "60px",
          fontWeight: 800,
          color: "white",
        }}
      >
        결제 금액 정보가 없습니다.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        background: "linear-gradient(to bottom, #9EE0AE, #36A64A)",
        overflow: "hidden",
        position: "relative",
        paddingTop: "60px",
      }}
    >
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
        }}
      />

      {/* 제목 */}
      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "80px",
          fontWeight: 900,
          marginTop: "120px",
        }}
      >
        결제하기
      </h1>

      {/* 결제 위젯 박스 */}
      <div
<<<<<<< HEAD
  style={{
    background: "white",
    width: "80%",
    height: "calc(1920px - 360px)",   
    margin: "60px auto 40px",
    borderRadius: "40px",
    padding: "60px 70px",  // 여유 공간 확보
    overflowY: "auto",     // 필요한 때만 스크롤
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
  <Checkout amount={amount} orderName={orderName} />
=======
        style={{
          background: "white",
          width: "90%",
          height: "1300px",
          margin: "80px auto 0",
          borderRadius: "40px",
          padding: "50px",
          overflowY: "scroll",
        }}
      >
        <Suspense fallback={<div>로딩중...</div>}>
          <PaymentInner />
        </Suspense>
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')
      </div>
    </div>
  );
}
