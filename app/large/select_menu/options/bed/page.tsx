"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BedSelectPage() {
  const router = useRouter();

  const [part, setPart] = useState<"매트리스" | "틀">("매트리스");
  const [size, setSize] = useState<"일인용" | "이인용">("일인용");
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    calculatePrice();
  }, [part, size, count]);

  const calculatePrice = async () => {
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
  };

  const goToPayment = () => {
    if (!price) return;
    const orderName = `침대 (${part}, ${size}) ${count}개`;
    router.push(`/payment?amount=${price}&orderName=${orderName}`);
  };

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        margin: "0 auto",
        background: "white",
        paddingTop: "120px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "48px", marginBottom: "60px" }}>침대 옵션 선택</h2>

        {/* 종류 */}
        <p style={{ fontSize: "38px", marginBottom: "20px" }}>종류</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <button
            onClick={() => setPart("매트리스")}
            style={{
              padding: "25px 60px",
              borderRadius: "25px",
              fontSize: "36px",
              border: "3px solid black",
              background: part === "매트리스" ? "black" : "white",
              color: part === "매트리스" ? "white" : "black",
            }}
          >
            매트리스
          </button>
          <button
            onClick={() => setPart("틀")}
            style={{
              padding: "25px 60px",
              borderRadius: "25px",
              fontSize: "36px",
              border: "3px solid black",
              background: part === "틀" ? "black" : "white",
              color: part === "틀" ? "white" : "black",
            }}
          >
            틀
          </button>
        </div>

        {/* 사이즈 */}
        <p style={{ fontSize: "38px", marginTop: "60px", marginBottom: "20px" }}>
          사이즈
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <button
            onClick={() => setSize("일인용")}
            style={{
              padding: "25px 60px",
              borderRadius: "25px",
              fontSize: "36px",
              border: "3px solid black",
              background: size === "일인용" ? "black" : "white",
              color: size === "일인용" ? "white" : "black",
            }}
          >
            일인용
          </button>
          <button
            onClick={() => setSize("이인용")}
            style={{
              padding: "25px 60px",
              borderRadius: "25px",
              fontSize: "36px",
              border: "3px solid black",
              background: size === "이인용" ? "black" : "white",
              color: size === "이인용" ? "white" : "black",
            }}
          >
            이인용
          </button>
        </div>

        {/* 개수 */}
        <p style={{ fontSize: "38px", marginTop: "60px", marginBottom: "20px" }}>
          개수
        </p>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{
            fontSize: "40px",
            width: "200px",
            padding: "20px",
            borderRadius: "20px",
            border: "3px solid black",
            textAlign: "center",
          }}
        />

        {/* 가격 표시 */}
        {price !== null && (
          <div
            style={{
              marginTop: "70px",
              background: "#f2f2f2",
              width: "800px",
              padding: "40px",
              fontSize: "40px",
              borderRadius: "25px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            총 수수료  
            <h3 style={{ fontSize: "60px", marginTop: "20px" }}>
              {price.toLocaleString()} 원
            </h3>
          </div>
        )}

        {/* 결제 버튼 */}
        <button
          onClick={goToPayment}
          style={{
            marginTop: "90px",
            width: "600px",
            padding: "35px",
            borderRadius: "25px",
            fontSize: "48px",
            background: "black",
            color: "white",
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
