"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const fetchCache = "force-no-store";

export default function BabSangSelectPage() {
  const router = useRouter();

  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 🔥 자동 가격 계산 기능 */
  useEffect(() => {
    calculatePrice();
  }, [count]); // count가 바뀌면 자동 호출

  /** 가격 계산 로직 */
  const calculatePrice = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bab-sang",
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

  /** 🔥 결제 페이지 이동 */
  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }
    const orderName = `밥상 ${count}개`;
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>밥상 옵션 선택</h2>

      {/* 개수 선택 */}
      <div className="section">
        <p className="label">개수</p>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="inputBox"
        />
      </div>

      {/* 가격 표시 */}
      {price !== null && (
        <div className="priceBox">
          <p>총 금액</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      {/* 결제 버튼 */}
      <button
        className="payBtn"
        onClick={goToPayment}
        disabled={price === null || loading}
      >
        {loading ? "계산 중..." : "결제하기"}
      </button>

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 30px;
          text-align: center;
          color: black;
        }

        .section {
          margin-top: 25px;
        }

        .label {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .inputBox {
          width: 100px;
          padding: 10px;
          font-size: 16px;
          text-align: center;
          border: 2px solid black;
          border-radius: 8px;
        }

        .priceBox {
          margin-top: 25px;
          background: #f2f2f2;
          padding: 20px;
          border-radius: 12px;
        }

        h3 {
          font-size: 24px;
          font-weight: bold;
          margin-top: 10px;
        }

        .payBtn {
          margin-top: 25px;
          width: 80%;
          max-width: 300px;
          padding: 16px;
          background: black;
          color: white;
          border: none;
          font-size: 20px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
