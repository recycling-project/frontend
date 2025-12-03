"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BicyclePage() {
  const router = useRouter();

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "bicycle", count }),
    });
    const data = await res.json();
    setPrice(data.price);
  };

  useEffect(() => {
    calculatePrice();
  }, [count]);

  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }
    const orderName = `자전거 ${count}개`;
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>자전거 옵션 선택</h2>

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
        className="btn"
        onClick={goToPayment}
      >
        결제하기
      </button>

      <style jsx>{`
        .container { padding: 20px; text-align: center; }
        .label { margin-top: 20px; }
        .input {
          width: 100px;
          padding: 10px;
          border: 2px solid black;
          border-radius: 8px;
          text-align: center;
          font-size: 16px;
        }
        .resultBox {
          margin-top: 20px;
          background: #f2f2f2;
          padding: 20px;
          border-radius: 12px;
        }
        .btn {
          margin-top: 20px;
          background: black;
          color: white;
          padding: 16px;
          border-radius: 12px;
          width: 80%;
          max-width: 300px;
        }
      `}</style>
    </div>
  );
}
