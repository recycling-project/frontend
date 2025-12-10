"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DressingTablePage() {
  const router = useRouter();

  const [type2, setType2] = useState<"일반용" | "미용실용">("일반용");
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);

  /** 자동 계산 */
  const calculatePrice = async () => {
<<<<<<< HEAD
    setLoading(true);
=======
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "hwa-jang-dae",
        type2, 
        count,
      }),
    });
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')

    const data = await res.json();
    setPrice(data.price);
  };

  useEffect(() => {
    calculatePrice();
  }, [type2, count]);

  const goToPayment = () => {
<<<<<<< HEAD
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }

    const orderName = `화장대 (${type2}) ${count}개`;

    router.push(
      `/payment?amount=${encodeURIComponent(String(price))}&orderName=${encodeURIComponent(orderName)}`
    );
=======
    if (!price) return;

    const orderName = `화장대 (${type2}) ${count}개`;

    router.push(`/payment?amount=${price}&orderName=${orderName}`);
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')
  };

  return (
    <div className="container">
      <h2>화장대 옵션 선택</h2>

<<<<<<< HEAD
      {/* 제목 */}
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 900,
          color: "white",
          marginBottom: "80px",
        }}
      >
        화장대 옵션 선택
      </h1>
=======
      {/* 종류 */}
      <div className="section">
        <p className="label">종류</p>

        <div className="btnRow">
          <button
            className={`btn ${type2 === "일반용" ? "active" : ""}`}
            onClick={() => setType2("일반용")}
          >
            일반용
          </button>

          <button
            className={`btn ${type2 === "미용실용" ? "active" : ""}`}
            onClick={() => setType2("미용실용")}
          >
            미용실용
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

      {/* 결제 */}
      <button className="btn2" onClick={goToPayment}>
        결제하기
      </button>
>>>>>>> parent of 8683cf3 (Merge branch 'dagyeong')

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .label {
          font-size: 18px;
          margin-bottom: 10px;
          margin-top: 20px;
        }

        .btnRow {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .btn {
          padding: 12px 20px;
          border: 2px solid black;
          border-radius: 10px;
          background: white;
          color: black;
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
          text-align: center;
          font-size: 16px;
        }

        .resultBox {
          margin-top: 20px;
          background: #f2f2f2;
          padding: 20px;
          border-radius: 12px;
        }

        .btn2 {
          margin-top: 20px;
          padding: 16px;
          width: 80%;
          max-width: 300px;
          background: black;
          color: white;
          border-radius: 12px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
