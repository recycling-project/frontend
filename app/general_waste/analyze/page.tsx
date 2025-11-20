"use client";

export const dynamic = "force-dynamic";   // 🔥 SSR 프리렌더링 완전 차단

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function WasteAnalyze() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const base64 =
    typeof window !== "undefined"
      ? localStorage.getItem("wasteImage")
      : null;

  const text = searchParams.get("text");

  useEffect(() => {
    async function analyze() {
      let body;

      // 사진 모드
      if (base64) {
        body = JSON.stringify({ image: base64 });

      // 텍스트 질문 모드
      } else if (text) {
        body = JSON.stringify({ text: text });

      } else {
        return;
      }

      // 🚨 여기 수정: localhost 직접 호출 금지
      // 환경변수에서 API 주소 가져오기
      const api = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${api}/recycle/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();

      router.push(
        "/general_waste/result?data=" +
          encodeURIComponent(JSON.stringify(data))
      );
    }

    analyze();
  }, [base64, text]);

  return (
    <div className="page-bg">
      <div className="kiosk">
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <div className="loading-wrapper">
          <img
            src="/Loding.gif"
            alt="로딩 움짤"
            className="loading-gif"
          />
        </div>
      </div>
    </div>
  );
}
