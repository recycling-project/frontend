"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SofaPage() {
  const router = useRouter();

<<<<<<< HEAD
  const [person, setPerson] = useState<number>(2); // 1~4인용
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 자동 가격 계산 */
  const calculatePrice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sofa",
          person,
          count,
        }),
      });

      const data = await res.json();
      setPrice(data.price);
    } catch (err) {
      console.error("가격 계산 오류:", err);
    }
    setLoading(false);
=======
  const [person, setPerson] = useState<number>(2);  // 인원수 (1~4)
  const [count, setCount] = useState<number>(1);   // 개수

  const [price, setPrice] = useState<number | null>(null);

  /** 🔥 자동 가격 계산 */
  const calculatePrice = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "sofa",
        person,
        count,
      }),
    });

    const data = await res.json();
    setPrice(data.price);
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')
  };

  useEffect(() => {
    calculatePrice();
  }, [person, count]);

<<<<<<< HEAD
  // 결제하기
  const handlePayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }
    const orderName = `소파 ${person}인용 ${count}개`;
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
        소파 옵션 선택
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
        {/* 인원수 선택 */}
        <div style={{ marginBottom: "60px" }}>
          <p
            style={{
              fontSize: "45px",
              color: "#2F7239",
              marginBottom: "30px",
            }}
          >
            인원수 선택
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => setPerson(p)}
                style={{
                  padding: "25px 0",
                  background: person === p ? "#A0DDAB" : "white",
                  border: "4px solid #8ED49A",
                  borderRadius: "20px",
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "#2F7239",
                  cursor: "pointer",
                  boxShadow:
                    person === p
                      ? "0px 6px 10px rgba(0,0,0,0.12)"
                      : "0px 3px 6px rgba(0,0,0,0.05)",
                }}
              >
                {p}인용
              </button>
            ))}
          </div>
        </div>

        {/* 수량 선택 */}
        <div style={{ marginBottom: "60px" }}>
          <p
            style={{
              fontSize: "45px",
              color: "#2F7239",
              marginBottom: "25px",
            }}
          >
            수량 선택
          </p>

          {/* 삼각형 UI */}
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
                background: "transparent",
                border: "none",
                cursor: "pointer",
                width: "80px",
                height: "80px",
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
              />
=======
  /** 🔥 Toss 결제 페이지 이동 */
  const goToPayment = () => {
    if (!price) return;

    const order = `소파 ${person}인용 ${count}개`;

    router.push(`/payment?amount=${price}&orderName=${order}`);
  };

  return (
    <div className="container">
      <h2>소파 옵션 선택</h2>

      {/* 인원 선택 */}
      <div className="section">
        <p className="label">인원수</p>

        <div className="btnRow">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`btn ${person === p ? "active" : ""}`}
              onClick={() => setPerson(p)}
            >
              {p}인용
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')
            </button>

<<<<<<< HEAD
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
                background: "transparent",
                border: "none",
                cursor: "pointer",
                width: "80px",
                height: "80px",
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
              />
            </button>
          </div>
        </div>

        {/* 가격 결과 */}
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
            <p
              style={{
                fontSize: "38px",
                color: "#2F7239",
                marginBottom: "15px",
              }}
            >
              총 금액
            </p>

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

        {/* 결제하기 */}
        <button
          onClick={handlePayment}
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
=======
      {/* 개수 선택 */}
      <div className="section">
        <p className="label">개수</p>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="input"
        />
      </div>

      {/* 계산 결과 */}
      {price !== null && (
        <div className="resultBox">
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      {/* 결제 버튼 */}
      <button className="btn2" onClick={goToPayment}>
        결제하기
      </button>

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .label {
          margin-top: 20px;
          font-size: 18px;
        }

        .btnRow {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 18px;
          border: 2px solid black;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn.active {
          background: black;
          color: white;
        }

        .input {
          width: 100px;
          padding: 10px;
          border-radius: 8px;
          border: 2px solid black;
          text-align: center;
          font-size: 16px;
        }

        .resultBox {
          margin-top: 20px;
          padding: 20px;
          background: #f2f2f2;
          border-radius: 12px;
        }

        .btn2 {
          margin-top: 20px;
          background: black;
          color: white;
          padding: 16px;
          width: 80%;
          max-width: 300px;
          border-radius: 12px;
          font-size: 18px;
        }
      `}</style>
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')
    </div>
  );
}
