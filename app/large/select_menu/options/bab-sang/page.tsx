"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BabSangSelectPage() {
  const router = useRouter();

  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 자동 가격 계산 */
  useEffect(() => {
    calculatePrice();
  }, [count]);

  const calculatePrice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bab-sang",
          count,
        }),
      });

      const data = await res.json();
      setPrice(data.price);
    } catch (e) {
      console.error("가격 계산 오류:", e);
    }
    setLoading(false);
  };

  /** 🔥 결제 페이지 이동 */
  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }

    const orderName = `밥상 ${count}개`;

    // ⭐ 절대 실패하지 않는 라우팅 방식 (정석)
    router.push(
      `/payment?amount=${encodeURIComponent(String(price))}&orderName=${encodeURIComponent(orderName)}`
    );
  };

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        background: "linear-gradient(to bottom, #9EE0AE, #36A64A)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "180px",
        position: "relative",
        color: "#2F7239",
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
          fontSize: "80px",
          fontWeight: 900,
          marginBottom: "80px",
          color: "white",
        }}
      >
        밥상 옵션 선택
      </h1>

      {/* 카드 */}
      <div
        style={{
          background: "white",
          width: "85%",
          borderRadius: "40px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* 개수 선택 */}
<div style={{ marginBottom: "50px" }}>
  <p style={{ fontSize: "45px", marginBottom: "20px" }}>개수 선택</p>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "40px",
      border: "4px solid #8ED49A",
      borderRadius: "20px",
      width: "360px",
      height: "120px",
      margin: "0 auto",
      background: "white",
      position: "relative",
    }}
  >
    {/* 🔻 왼쪽 삼각형 (감소) */}
    <div
      onClick={() => setCount((prev) => Math.max(1, prev - 1))}
      style={{
        width: 0,
        height: 0,
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderRight: "50px solid #8ED49A",
        cursor: "pointer",
        marginLeft: "-10px",
      }}
    ></div>

    {/* 개수 표시 */}
    <span
      style={{
        fontSize: "55px",
        fontWeight: 900,
        color: "#2F7239",
        width: "80px",
        textAlign: "center",
      }}
    >
      {count}
    </span>

    {/* 🔺 오른쪽 삼각형 (증가) */}
    <div
      onClick={() => setCount((prev) => prev + 1)}
      style={{
        width: 0,
        height: 0,
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderLeft: "50px solid #8ED49A",
        cursor: "pointer",
        marginRight: "-10px",
      }}
    ></div>
  </div>
</div>


        {/* 가격 박스 */}
        {price !== null && (
          <div
            style={{
              background: "#F4FFF7",
              border: "3px solid #8ED49A",
              padding: "40px",
              borderRadius: "25px",
              marginBottom: "50px",
            }}
          >
            <p style={{ fontSize: "38px", marginBottom: "15px" }}>총 금액</p>
            <h2
              style={{
                fontSize: "60px",
                fontWeight: 900,
              }}
            >
              {price.toLocaleString()} 원
            </h2>
          </div>
        )}

        {/* 결제 버튼 */}
        <button
          onClick={goToPayment}
          disabled={loading}
          style={{
            width: "100%",
            height: "140px",
            background: "#A0DDAB",
            border: "none",
            borderRadius: "30px",
            fontSize: "48px",
            fontWeight: 900,
            color: "#2F7239",
            cursor: "pointer",
            boxShadow: "0px 6px 10px rgba(0,0,0,0.15)",
          }}
        >
          {loading ? "계산 중..." : "결제하기"}
        </button>
      </div>
    </div>
  );
}
