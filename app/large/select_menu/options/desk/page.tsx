"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeskPage() {
  const router = useRouter();

  const [size, setSize] = useState<"소형" | "대형">("소형");
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "desk", size, count }),
    });

    const data = await res.json();
    setPrice(data.price);
  };

  useEffect(() => {
    calculatePrice();
  }, [size, count]);

  return (
    <div className="container">
      <h2>책상 옵션 선택</h2>

      {/* 사이즈 */}
      <p className="label">사이즈</p>
      <div className="btnRow">
        <button
          className={`btn ${size === "소형" ? "active" : ""}`}
          onClick={() => setSize("소형")}
        >
          소형
        </button>
        <button
          className={`btn ${size === "대형" ? "active" : ""}`}
          onClick={() => setSize("대형")}
        >
          대형
        </button>
      </div>

      {/* 개수 */}
      <p className="label">개수</p>
      <input
        type="number"
        min={1}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="input"
      />

      {price !== null && (
        <div className="resultBox">
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      <button
        className="btn2"
        onClick={() =>
          router.push(
            `/large/payment?type=desk&size=${size}&count=${count}&price=${price}`
          )
        }
      >
        결제하기
      </button>

      <style jsx>{`
        .container { padding: 20px; text-align: center; }
        .label { margin-top: 20px; }
        .btnRow {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .btn {
          padding: 12px 20px;
          border: 2px solid black;
          background: white;
          border-radius: 10px;
          font-size: 16px;
        }
        .btn.active {
          background: black;
          color: white;
        }
        .input {
          width: 100px;
          padding: 10px;
          border: 2px solid black;
          border-radius: 8px;
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
        }
      `}</style>
    </div>
  );
}
