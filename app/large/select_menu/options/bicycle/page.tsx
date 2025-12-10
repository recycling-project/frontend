"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BicyclePage() {
  const router = useRouter();

  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculatePrice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "bicycle", count }),
      });

      const data = await res.json();
      setPrice(data.price);
    } catch (e) {
      console.error("가격 계산 오류:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    calculatePrice();
  }, [count]);

<<<<<<< HEAD

=======
  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }
    const orderName = `자전거 ${count}개`;
    router.push(
      `/payment?amount=${encodeURIComponent(String(price))}&orderName=${encodeURIComponent(orderName)}`
    );
  };
>>>>>>> dagyeong

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

<<<<<<< HEAD
      {price !== null && (
        <div className="resultBox">
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      <button
        className="btn"
        onClick={() =>
          router.push(
            `/payment?amount=${price}&orderName=자전거 ${count}대`
          )
        }
=======
      {/* 제목 */}
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 900,
          marginBottom: "80px",
          color: "white",
        }}
>>>>>>> dagyeong
      >
        자전거 옵션 선택
      </h1>

      {/* 카드 영역 */}
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

          {/* 수량 조절 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "50px",
              border: "4px solid #8ED49A",
              borderRadius: "20px",
              width: "380px",
              height: "120px",
              margin: "0 auto",
            }}
          >
            {/* 감소 버튼 */}
            <button
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              style={{
                width: 0,
                height: 0,
                borderTop: "25px solid transparent",
                borderBottom: "25px solid transparent",
                borderRight: "35px solid #8ED49A",
                background: "none",
                cursor: "pointer",
              }}
            />

            {/* 숫자 */}
            <span style={{ fontSize: "50px", fontWeight: 900 }}>{count}</span>

            {/* 증가 버튼 */}
            <button
              onClick={() => setCount((prev) => prev + 1)}
              style={{
                width: 0,
                height: 0,
                borderTop: "25px solid transparent",
                borderBottom: "25px solid transparent",
                borderLeft: "35px solid #8ED49A",
                background: "none",
                cursor: "pointer",
              }}
            />
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
