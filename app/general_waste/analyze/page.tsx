"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// ===================================================
//  ⬇⬇ 기존 코드 전체를 Content 컴포넌트로 감싸기
// ===================================================
function WasteAnalyzeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");     // QR 업로드 id
  const text = searchParams.get("text"); // 텍스트 질문 입력값

  // 1) 카메라 촬영한 이미지 (localStorage)
  const storedBase64 =
    typeof window !== "undefined"
      ? localStorage.getItem("wasteImage")
      : null;

  // 2) 최종적으로 사용할 이미지
  const [photo, setPhoto] = useState(storedBase64);

  // ------------------------------------------------------------------
  // 📌 (A) QR 업로드 이미지 로드
  // ------------------------------------------------------------------
  useEffect(() => {
    async function loadQRImage() {
      if (!id) return;     // QR 방식이 아닐 때 실행 X
      if (photo) return;   // 이미 이미지가 세팅된 경우 다시 실행 X

      try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${api}/recycle/image?id=${id}`);
        const data = await res.json();

        if (data.image) {
          setPhoto(data.image);
          localStorage.setItem("wasteImage", data.image);
        }
      } catch (err) {
        console.error("QR 이미지 로드 실패:", err);
      }
    }

    loadQRImage();
  }, [id, photo]);

  // ------------------------------------------------------------------
  // 📌 (B) 분석 실행 — 이미지 또는 텍스트 준비되면 자동 분석
  // ------------------------------------------------------------------
  useEffect(() => {
    async function doAnalyze() {
      // ⛔ 사진이 아직 로드되지 않았으면 실행 금지
      if (!photo && !text) return;
      if (photo && photo.length < 50) return; // base64가 너무 짧으면 아직 준비 안 된 상태

      const body = photo ? { image: photo } : { text };

      try {
        const api = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${api}/recycle/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        router.push(
          `/general_waste/result?data=${encodeURIComponent(JSON.stringify(data))}`
        );
      } catch (err) {
        console.error("분석 실패:", err);

        const failData = { error: "분석 중 오류가 발생했습니다." };

        router.push(
          `/general_waste/result?data=${encodeURIComponent(JSON.stringify(failData))}`
        );
      }
    }

    doAnalyze();
  }, [photo, text]);

  // ------------------------------------------------------------------
  // 📌 UI — 로딩 페이지 (CSS 그대로 유지)
  // ------------------------------------------------------------------
  return (
    <div
      className="page"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
      }}
    >
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

      {/* 로딩 GIF — 정중앙 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/Loding.gif"
          alt="로딩"
          style={{
            width: "260px",
            height: "260px",
          }}
        />
      </div>
    </div>
  );
}

// ===================================================
//  ⬇⬇ page.tsx 페이지 컴포넌트 (여기서는 훅 금지)
// ===================================================
export default function WasteAnalyzePage() {
  return (
    <Suspense fallback={<div></div>}>
      <WasteAnalyzeContent />
    </Suspense>
  );
}
