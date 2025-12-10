"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BedSelectPage() {
  const router = useRouter();

  const [part, setPart] = useState<"매트리스" | "틀">("매트리스");
  const [size, setSize] = useState<"일인용" | "이인용">("일인용");
  const [count, setCount] = useState<number>(1);

  const [price, setPrice] = useState<number | null>(null);

<<<<<<< HEAD
=======
  /* 옵션 변경 시 자동 계산 */
>>>>>>> dagyeong
  useEffect(() => {
    calculatePrice();
  }, [part, size, count]);

  const calculatePrice = async () => {
<<<<<<< HEAD
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
=======
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

  /* 결제 이동 */
  const goToPayment = () => {
    if (price === null) {
      alert("가격 정보가 없습니다.");
      return;
    }

>>>>>>> dagyeong
    const orderName = `침대 (${part}, ${size}) ${count}개`;

    router.push(
      `/payment?amount=${encodeURIComponent(String(price))}&orderName=${encodeURIComponent(orderName)}`
    );
  };

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
<<<<<<< HEAD
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
=======
        background: "linear-gradient(to bottom, #9EE0AE, #36A64A)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "150px",
        position: "relative",
        color: "#2F7239",
      }}
    >
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
        }}
      />

      {/* 제목 */}
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 900,
          marginBottom: "60px",
          color: "white",
        }}
      >
        침대 옵션 선택
      </h1>

      {/* 카드 영역 */}
      <div
        style={{
          background: "white",
          width: "85%",
          borderRadius: "40px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* 종류 */}
        <div style={{ marginBottom: "50px" }}>
          <p style={{ fontSize: "45px", marginBottom: "20px" }}>종류 선택</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            {["매트리스", "틀"].map((v) => (
              <button
                key={v}
                onClick={() => setPart(v as any)}
                style={{
                  width: "260px",
                  height: "100px",
                  fontSize: "40px",
                  fontWeight: 800,
                  borderRadius: "25px",
                  border: part === v ? "5px solid #36A64A" : "5px solid #8ED49A",
                  background: part === v ? "#E3F8E8" : "white",
                  color: "#2F7239",
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 사이즈 */}
        <div style={{ marginBottom: "50px" }}>
          <p style={{ fontSize: "45px", marginBottom: "20px" }}>사이즈 선택</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            {["일인용", "이인용"].map((v) => (
              <button
                key={v}
                onClick={() => setSize(v as any)}
                style={{
                  width: "260px",
                  height: "100px",
                  fontSize: "40px",
                  fontWeight: 800,
                  borderRadius: "25px",
                  border: size === v ? "5px solid #36A64A" : "5px solid #8ED49A",
                  background: size === v ? "#E3F8E8" : "white",
                  color: "#2F7239",
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 개수 선택 */}
<div style={{ marginBottom: "50px" }}>
  <p style={{ fontSize: "45px", marginBottom: "20px" }}>개수 선택</p>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "40px",
      border: "4px solid #8ED49A",
      borderRadius: "20px",
      width: "360px",
      height: "120px",
      margin: "0 auto",
      background: "white",
      position: "relative",
    }}
  >
    {/* 🔻 왼쪽 삼각형 (감소) */}
    <div
      onClick={() => setCount((prev) => Math.max(1, prev - 1))}
      style={{
        width: 0,
        height: 0,
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderRight: "50px solid #8ED49A",
        cursor: "pointer",
        marginLeft: "-10px",
      }}
    ></div>

    {/* 개수 표시 */}
    <span
      style={{
        fontSize: "55px",
        fontWeight: 900,
        color: "#2F7239",
        width: "80px",
        textAlign: "center",
      }}
    >
      {count}
    </span>

    {/* 🔺 오른쪽 삼각형 (증가) */}
    <div
      onClick={() => setCount((prev) => prev + 1)}
      style={{
        width: 0,
        height: 0,
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderLeft: "50px solid #8ED49A",
        cursor: "pointer",
        marginRight: "-10px",
      }}
    ></div>
  </div>
</div>


        {/* 금액 */}
        {price !== null && (
          <div
            style={{
              background: "#F4FFF7",
              border: "3px solid #8ED49A",
              padding: "40px",
              borderRadius: "25px",
              marginBottom: "50px",
            }}
          >
            <p style={{ fontSize: "38px", marginBottom: "15px" }}>총 금액</p>
            <h2
              style={{
                fontSize: "60px",
                fontWeight: 900,
              }}
            >
              {price.toLocaleString()} 원
            </h2>
>>>>>>> dagyeong
          </div>
        )}

        {/* 결제 버튼 */}
        <button
          onClick={goToPayment}
<<<<<<< HEAD
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
=======
          disabled={loading}
          style={{
            width: "100%",
            height: "140px",
            background: "#A0DDAB",
            border: "none",
            borderRadius: "30px",
            fontSize: "48px",
            fontWeight: 900,
            color: "#2F7239",
            cursor: "pointer",
            boxShadow: "0px 6px 10px rgba(0,0,0,0.15)",
          }}
        >
          {loading ? "계산 중..." : "결제하기"}
>>>>>>> dagyeong
        </button>
      </div>
    </div>
  );
}
