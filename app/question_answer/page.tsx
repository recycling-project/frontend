"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WasteResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const decoded = data ? decodeURIComponent(data) : null;
  const result = decoded ? JSON.parse(decoded) : null;
  const content = result?.choices?.[0]?.message?.content;

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const img = localStorage.getItem("wasteImage");
    if (img) setPhoto(img);
    localStorage.removeItem("wasteImage");
  }, []);

  return (
    <div
      className="page"
      style={{
        background: "#ffffff", // ⭐ 흰색 배경
        width: "1080px",   // 캔버스 크기
        height: "1920px",  // 캔버스 크기
        overflow: "hidden",
      }}
    >

{/* 상단 바 */}
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#36A64A",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        
      </div>
        {/* 🔙 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          onClick={() => router.push("/menu")}
          style={{
            position: "absolute",
            top: "60px",
            left: "40px",
            width: "90px",
            height: "90px",
            cursor: "pointer",
            // filter: "invert(100%)", // 아이콘이 흰색 없던 문제 해결용
          }}
        />

<button
  onClick={() => router.replace("/question")}
  style={{
    position: "absolute",
    top: "1550px",   // ← marginTop 대신 top 사용
    left: "50%",
    transform: "translateX(-50%)",
    width: "420px",
    height: "160px",
    background: "#A0DDAB",
    color: "#fff",
    borderRadius: "35px",
    border: "none",
    fontSize: "46px",
    fontWeight: 700,
    boxShadow: "0px 6px 14px rgba(0,0,0,0.08)",
    cursor: "pointer",
    zIndex: 10,
  }}
>
  다시 질문하기
</button>

        {/* ✅ 결과 출력 영역 */}
<div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",              // ✅ 더 넓게
    maxWidth: "900px",         // ✅ PC에서 크게 보이게
    height: "85vh",            // ✅ 높이 확장
    background: "rgba(0,0,0,0.75)",
    // border: "2px dashed red", // 네모칸 있는지 확인용
    color: "white",
    padding: "24px",
    borderRadius: "16px",
    overflowY: "auto",
    textAlign: "left",
    lineHeight: "1.7",
    fontSize: "30px",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  }}
>
  {content ? (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        margin: 0,
      }}
    >
      {content}
    </pre>
  ) : (
    <p style={{ textAlign: "center", fontSize: "18px" }}>
      결과 데이터를 불러올 수 없습니다.
    </p>
  )}
</div>

</div>
  );
}
