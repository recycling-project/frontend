"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ===============================
// 📌 내부 컨텐츠 컴포넌트 (훅 사용 OK)
// ===============================
function WasteResultContent() {
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

  // ===============================
  // 📌 기존 JSX 그대로
  // ===============================
  return (
    <div
      className="page"
      style={{
        background: "#ffffff",
        width: "1080px",
        height: "1920px",
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
      ></div>

      {/* 뒤로가기 */}
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
        }}
      />

      {/* 다시 질문하기 버튼 */}
      <button
        onClick={() => router.replace("/question")}
        style={{
          position: "absolute",
          top: "1550px",
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

      {/* 결과 출력 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "900px",
          height: "85vh",
          background: "rgba(0,0,0,0.75)",
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

// ===============================
// 📌 이게 page.tsx의 기본 export
// ===============================
export default function WasteResultPage() {
  return (
    <Suspense fallback={<div></div>}>
      <WasteResultContent />
    </Suspense>
  );
}
