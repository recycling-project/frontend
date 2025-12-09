"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JarPage() {
  const router = useRouter();

  const [height, setHeight] = useState<number>(50);
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 자동 계산 */
  const calculatePrice = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hang-a-ri",
          height,
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

  useEffect(() => {
    calculatePrice();
  }, [height, count]);

  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }

    const orderName = `항아리 (높이 ${height}cm) ${count}개`;

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
          color: "white",
          marginBottom: "80px",
        }}
      >
        항아리 옵션 선택
      </h1>

      {/* 카드 */}
      <div
        style={{
          width: "85%",
          background: "white",
          padding: "60px",
          borderRadius: "40px",
          textAlign: "center",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* 높이 선택 */}
        <div style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "45px", color: "#2F7239", marginBottom: "20px" }}>
            높이 (cm)
          </p>

          {/* 수평 조절 버튼 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              border: "4px solid #8ED49A",
              borderRadius: "20px",
              padding: "20px 40px",
              width: "420px",
              margin: "0 auto",
            }}
          >
            {/* 감소 삼각형 */}
            <button
              onClick={() => height > 10 && setHeight(height - 1)}
              style={{
                width: "80px",
                height: "80px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "25px solid transparent",
                  borderBottom: "25px solid transparent",
                  borderRight: "40px solid #8ED49A",
                }}
              ></div>
            </button>

            <span
              style={{
                fontSize: "60px",
                fontWeight: 900,
                width: "120px",
                textAlign: "center",
              }}
            >
              {height}
            </span>

            {/* 증가 삼각형 */}
            <button
              onClick={() => height < 200 && setHeight(height + 1)}
              style={{
                width: "80px",
                height: "80px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "25px solid transparent",
                  borderBottom: "25px solid transparent",
                  borderLeft: "40px solid #8ED49A",
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* 개수 선택 */}
        <div style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "45px", color: "#2F7239", marginBottom: "20px" }}>
            개수 선택
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              border: "4px solid #8ED49A",
              borderRadius: "20px",
              padding: "20px 40px",
              width: "350px",
              margin: "0 auto",
            }}
          >
            {/* 감소 */}
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              style={{
                width: "80px",
                height: "80px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "25px solid transparent",
                  borderBottom: "25px solid transparent",
                  borderRight: "40px solid #8ED49A",
                }}
              ></div>
            </button>

            <span
              style={{
                fontSize: "60px",
                fontWeight: 900,
                width: "80px",
                textAlign: "center",
              }}
            >
              {count}
            </span>

            {/* 증가 */}
            <button
              onClick={() => setCount(count + 1)}
              style={{
                width: "80px",
                height: "80px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "25px solid transparent",
                  borderBottom: "25px solid transparent",
                  borderLeft: "40px solid #8ED49A",
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* 총 금액 */}
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
            <p style={{ fontSize: "38px", marginBottom: "15px", color: "#2F7239" }}>
              총 금액
            </p>
            <h2 style={{ fontSize: "60px", fontWeight: 900 }}>
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
