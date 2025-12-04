"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 침대 옵션 선택 페이지
 * - part: 매트리스 / 틀
 * - size: 일인용 / 이인용
 * - count: 개수
 * 자동 계산 + 결제 버튼 포함
 */
export default function BedSelectPage() {
  const router = useRouter();

  const [part, setPart] = useState<"매트리스" | "틀">("매트리스");
  const [size, setSize] = useState<"일인용" | "이인용">("일인용");
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /** 🔥 옵션 변경될 때마다 자동 계산 */
  useEffect(() => {
    calculatePrice();
  }, [part, size, count]);

  /** 가격 계산 */
  const calculatePrice = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bed",
          part,
          size,
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

  /** 🔥 결제 페이지로 이동 */
  const goToPayment = () => {
    if (price === null) {
        alert("가격 정보가 없습니다.");
        return;
    }
    const orderName = `침대 (${part}, ${size}) ${count}개`;
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div className="container">
      <h2>침대 옵션 선택</h2>

      {/* 종류 선택 */}
      <div className="section">
        <p className="label">종류</p>
        <div className="btnRow">

          <button
            className={`btn ${part === "매트리스" ? "active" : ""}`}
            onClick={() => setPart("매트리스")}
          >
            매트리스
          </button>

          <button
            className={`btn ${part === "틀" ? "active" : ""}`}
            onClick={() => setPart("틀")}
          >
            틀
          </button>

        </div>
      </div>

      {/* 사이즈 선택 */}
      <div className="section">
        <p className="label">사이즈</p>
        <div className="btnRow">

          <button
            className={`btn ${size === "일인용" ? "active" : ""}`}
            onClick={() => setSize("일인용")}
          >
            일인용
          </button>

          <button
            className={`btn ${size === "이인용" ? "active" : ""}`}
            onClick={() => setSize("이인용")}
          >
            이인용
          </button>

        </div>
      </div>

      {/* 개수 */}
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
          <p>총 수수료</p>
          <h3>{price.toLocaleString()} 원</h3>
        </div>
      )}

      {/* 결제 버튼 */}
      <button
        className="payBtn"
        onClick={goToPayment}
        disabled={loading || price === null}
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

        h2 {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .section {
          margin-top: 25px;
        }

        .label {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .btnRow {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .btn {
          padding: 12px 20px;
          border: 2px solid black;
          background: white;
          color: black;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn.active {
          background: black;
          color: white;
        }

        .inputBox {
          width: 100px;
          padding: 10px;
          text-align: center;
          border: 2px solid black;
          border-radius: 8px;
          font-size: 16px;
        }

        .priceBox {
          margin-top: 25px;
          background: #f2f2f2;
          padding: 20px;
          border-radius: 12px;
        }

        h3 {
          margin-top: 10px;
          font-size: 24px;
          font-weight: bold;
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
