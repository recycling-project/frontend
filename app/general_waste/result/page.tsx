"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ====================================
// 📌 내부 콘텐츠 컴포넌트 (훅 사용 OK)
// ====================================
function WasteResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  // 🔐 searchParams 안정 처리
  let decoded = null;
  let result = null;
  let content = null;

  try {
    if (data) {
      decoded = decodeURIComponent(data);
      result = JSON.parse(decoded);
      content = result?.choices?.[0]?.message?.content || null;
    }
  } catch (e) {
    console.error("❌ searchParams 파싱 오류:", e);
    content = null;
  }

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    let img = localStorage.getItem("wasteImage");

    if (img) {
      if (!img.startsWith("data:image")) {
        img = "data:image/jpeg;base64," + img;
      }
      setPhoto(img);
    }

    localStorage.removeItem("wasteImage");
  }, []);

  // ===============================
  // 📌 기존 JSX 그대로 유지
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

      {/* ⬅ 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        onClick={() => router.replace("/menu")}
        style={{
          position: "fixed",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "220px",
          left: 0,
          width: "100%",
          height: "calc(100% - 220px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "80px",
          paddingBottom: "120px",
          boxSizing: "border-box",
        }}
      >
        {/* 사진 박스 */}
        <div
          style={{
            width: "75%",
            maxWidth: "450px",
            aspectRatio: "1 / 1",
            background: "#F5FBF7",
            border: "4px solid #B8E6C0",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt="분석한 사진"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <p style={{ color: "#555" }}>사진 없음</p>
          )}
        </div>

        {/* 결과창 */}
        <div
          style={{
            marginTop: "120px",
            width: "85%",
            maxWidth: "800px",
            height: "75vh",
            background: "#F5FBF7",
            border: "4px solid #B8E6C0",
            borderRadius: "20px",
            padding: "26px",
            overflowY: "auto",
            color: "#333",
            fontSize: "35px",
            lineHeight: 1.6,
          }}
        >
          {content ? (
            <>
              <h3
                style={{
                  marginBottom: "18px",
                  textAlign: "center",
                  fontSize: "30px",
                }}
              >
                재활용 분석 결과
              </h3>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                }}
              >
                {content}
              </pre>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>
              결과 데이터를 불러올 수 없습니다.
            </p>
          )}
        </div>

        {/* 다시 촬영하기 */}
        <button
          onClick={() => router.replace("/general_waste")}
          style={{
            marginTop: "150px",
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
          }}
        >
          다시 촬영하기
        </button>
      </div>
    </div>
  );
}

// ===============================
// 📌 페이지 컴포넌트 (훅 사용 금지)
// ===============================
export default function WasteResultPage() {
  return (
    <Suspense fallback={<div></div>}>
      <WasteResultContent />
    </Suspense>
  );
}
