"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const fetchCache = "force-no-store";

export default function ChairPage() {
  const router = useRouter();

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "chair", count }),
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
    const orderName = `의자 ${count}개`;
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>의자 옵션 선택</h2>

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
          font-size: 16px;
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
        }
      `}</style>
    </div>
  );
}
