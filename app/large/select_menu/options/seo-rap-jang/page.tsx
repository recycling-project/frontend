"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DrawerPage() {
  const router = useRouter();

  const [drawers, setDrawers] = useState<number>(4); // 서랍 개수
  const [count, setCount] = useState<number>(1);     // 개수

  const [price, setPrice] = useState<number | null>(null);

  /** 자동 가격 계산 */
  const calculatePrice = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "seo-rap-jang",
        drawers,
        count,
      }),
    });

    const data = await res.json();
    setPrice(data.price);
  };

  useEffect(() => {
    calculatePrice();
  }, [drawers, count]);

  /** 🔥 결제하기 버튼 */
  const goToPayment = () => {
    if (!price) return;

    // 결제 페이지에서 표시될 상품명
    const orderName = `서랍장 ${drawers}칸 ${count}개`;

    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>서랍장 옵션 선택</h2>

      {/* 서랍 개수 */}
      <div className="section">
        <p className="label">서랍 개수</p>
        <input
          type="number"
          min={1}
          max={10}
          value={drawers}
          onChange={(e) => setDrawers(Number(e.target.value))}
          className="input"
        />
      </div>

      {/* 수량 */}
      <div className="section">
        <p className="label">수량</p>
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
      <button className="btn" onClick={goToPayment}>
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

        .input {
          width: 120px;
          padding: 10px;
          border: 2px solid black;
          border-radius: 8px;
          text-align: center;
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
          background: black;
          color: white;
          padding: 16px;
          width: 80%;
          max-width: 300px;
          border-radius: 12px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
