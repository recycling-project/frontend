"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BabSangSelectPage() {
  const router = useRouter();

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 📌 자동 가격 계산
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "bab-sang",
            count,
          }),
        });

        const data = await res.json();
        setPrice(data.price ?? null);
      } catch (err) {
        console.error("가격 계산 오류:", err);
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [count]);

  // 📌 결제 페이지 이동
  const goToPayment = () => {
    if (!price) return; // ❗ null이면 눌러도 아무 반응 없음

    const orderName = `밥상 ${count}개`;

    router.push(
      `/payment?amount=${price}&orderName=${encodeURIComponent(orderName)}`
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

      {/* 내용 박스 */}
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

          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{
              width: "180px",
              height: "80px",
              fontSize: "40px",
              textAlign: "center",
              border: "4px solid #8ED49A",
              borderRadius: "20px",
            }}
          />
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
          disabled={loading || price === null}
          style={{
            width: "100%",
            height: "140px",
            background: "#A0DDAB",
            border: "none",
            borderRadius: "30px",
            fontSize: "48px",
            fontWeight: 900,
            color: "#2F7239",
            cursor: loading || price === null ? "not-allowed" : "pointer",
            opacity: loading || price === null ? 0.5 : 1,
            boxShadow: "0px 6px 10px rgba(0,0,0,0.15)",
          }}
        >
          {loading ? "계산 중..." : "결제하기"}
        </button>
      </div>
    </div>
  );
}
