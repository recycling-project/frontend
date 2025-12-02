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
    <div className="page">
      <div className="kiosk" style={{ height: "100vh", position: "relative" }}>

        {/* 🔙 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

        {/* ✅ 결과 출력 영역 */}
<div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",              // ✅ 더 넓게
    maxWidth: "700px",         // ✅ PC에서 크게 보이게
    height: "65vh",            // ✅ 높이 확장
    background: "rgba(0,0,0,0.75)",
    // border: "2px dashed red", // 네모칸 있는지 확인용
    color: "white",
    padding: "24px",
    borderRadius: "16px",
    overflowY: "auto",
    textAlign: "left",
    lineHeight: "1.7",
    fontSize: "17px",
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
</div>
  );
}
