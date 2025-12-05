"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const fetchCache = "force-no-store";

export default function JarPage() {
  const router = useRouter();

  const [height, setHeight] = useState<number>(50); // cm
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);

  /** 자동 계산 */
  const calculatePrice = async () => {
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
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>항아리 옵션 선택</h2>

      {/* 높이 */}
      <div className="section">
        <p className="label">높이 (cm)</p>
        <input
          type="number"
          min={10}
          max={200}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="input"
        />
      </div>

      {/* 개수 */}
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

      {/* 결과 */}
      {price !== null && (
        <div className="resultBox">
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      {/* 결제 버튼 */}
      <button
        className="btn"
        onClick={goToPayment}
      >
        결제하기
      </button>

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .label {
          margin-top: 15px;
          font-size: 18px;
        }

        .input {
          width: 120px;
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
          padding: 15px;
          background: black;
          color: white;
          font-size: 18px;
          border-radius: 12px;
          border: none;
        }
      `}</style>
    </div>
  );
}
