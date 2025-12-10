"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChairPage() {
  const router = useRouter();

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 가격 계산 */
  const calculatePrice = async () => {
<<<<<<< HEAD
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "chair", count }),
    });

    const data = await res.json();
    setPrice(data.price);
=======
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "chair", count }),
      });
      const data = await res.json();
      setPrice(data.price);
    } catch (e) {
      console.error("가격 계산 오류:", e);
    }
    setLoading(false);
>>>>>>> dagyeong
  };

  useEffect(() => {
    calculatePrice();
  }, [count]);

  /** 🔥 결제 페이지 이동 */
  const goToPayment = () => {
    if (!price) return;

    const orderName = `의자 ${count}개`;

<<<<<<< HEAD
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
=======
    router.push(
      `/payment?amount=${encodeURIComponent(String(price))}&orderName=${encodeURIComponent(orderName)}`
    );
>>>>>>> dagyeong
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

<<<<<<< HEAD
      {price !== null && (
        <div className="resultBox">
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      <button className="btn" onClick={goToPayment}>
        결제하기
      </button>

      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }
        .label {
          margin-top: 20px;
        }
        .input {
          width: 100px;
          padding: 10px;
          border: 2px solid black;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
        }
        .resultBox {
          margin-top: 20px;
          padding: 20px;
          background: #f2f2f2;
          border-radius: 12px;
        }
        .btn {
          margin-top: 20px;
          width: 80%;
          max-width: 300px;
          padding: 16px;
          background: black;
          color: white;
          border-radius: 12px;
          font-size: 18px;
        }
      `}</style>
=======
      {/* 제목 */}
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 900,
          color: "white",
          marginBottom: "80px",
        }}
      >
        의자 옵션 선택
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
        {/* 개수 선택 */}
        <div style={{ marginBottom: "50px" }}>
          <p style={{ fontSize: "45px", marginBottom: "20px", color: "#2F7239" }}>
            개수 선택
          </p>

          {/* 수량 조절 박스 */}
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
            {/* 감소 버튼 */}
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              style={{
                width: "80px",
                height: "80px",
                border: "none",
                background: "transparent",
                fontSize: "0",
                cursor: "pointer",
                position: "relative",
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

            {/* 개수 */}
            <span style={{ fontSize: "60px", fontWeight: 900, width: "80px", display: "inline-block" }}>
              {count}
            </span>

            {/* 증가 버튼 */}
            <button
              onClick={() => setCount(count + 1)}
              style={{
                width: "80px",
                height: "80px",
                border: "none",
                background: "transparent",
                fontSize: "0",
                cursor: "pointer",
                position: "relative",
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
            <p style={{ fontSize: "38px", marginBottom: "15px", color: "#2F7239" }}>총 금액</p>
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
>>>>>>> dagyeong
    </div>
  );
}
