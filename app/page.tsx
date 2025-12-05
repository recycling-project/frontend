"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="page"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "1080px",
        height: "1920px",
        background: "#FFFFFF",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      <div
    style={{
      height: "25%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >

  </div>
      {/* 로고 텍스트 */}
      <div style={{ marginBottom: "200px" }}>
        <span
          style={{
            fontSize: "120px",
            fontWeight: 900,
            color: "#36A64A",   // ‘순’ 포인트 색
          }}
        >
          순
        </span>
        <span
          style={{
            fontSize: "120px",
            fontWeight: 900,
            color: "#A0DDAB",   // ‘환 마루’ 기본 색
          }}
        >
          환<br />마루
        </span>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: "40px",
            color: "#666",
            marginTop: "40px",
          }}
        >
          분리수거 도움 키오스크
        </div>
      </div>

      {/* 안내 텍스트 */}
      <div
        style={{
          fontSize: "50px",
          color: "#444",
          marginBottom: "80px",
        }}
      >
        시작하기 버튼을 눌러주세요
      </div>

      {/* 버튼 */}
      <button
    onClick={() => router.push("/menu")}
    style={{
      position: "absolute",
      bottom: "240px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "450px",
      height: "150px",
      background: "#A0DDAB",
      borderRadius: "20px",
      border: "none",
      fontSize: "60px",
      fontWeight: 700,
      color: "#000",
      cursor: "pointer",
    }}
  >
        시작하기
      </button>
    </div>
  );
}
