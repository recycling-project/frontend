"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SofaPage() {
    const router = useRouter();

    const [person, setPerson] = useState<number>(2); // 1~4인용
    const [count, setCount] = useState<number>(1);

    const [price, setPrice] = useState<number | null>(null);

    /** 자동 가격 계산 */
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
    };

    useEffect(() => {
        calculatePrice();
    }, [person, count]);
    /**
     * -----------------------------------------------------
     * 🔥 결제하기 (Toss Payments)
     * price(최종 금액)를 백엔드로 보내 결제 준비 요청
     * 백엔드가 Toss 결제창 URL(paymentUrl)을 보내주면 이동
     * -----------------------------------------------------
     */
    const handlePayment = async () => {
        if (!price) return; // 금액이 없으면 실행 X

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    price,    // 결제할 최종 금액
                    orderName: "소파", // 토스 결제창에 표시될 주문명
                    person,
                    count,
                }),
            });

            const data = await res.json();

            // 🔥 백엔드가 준 paymentUrl로 이동 → 토스 결제창 열림
            window.location.href = data.paymentUrl;

        } catch (err) {
            console.error("결제 요청 실패:", err);
        }
    };


    return (
        <div className="container">
            <h2>소파 옵션 선택</h2>

            {/* 인원수 */}
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
                        </button>
                    ))}
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

            {/* 결제 버튼 -> 토스결과창으로 이동*/}
            <button className="btn2" onClick={handlePayment}>
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
        </div>
    );
}
