"use client";

export const dynamic = "force-dynamic";

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

  console.log("API URL >>>", process.env.NEXT_PUBLIC_API_URL);
  console.log("base64:", base64?.substring(0, 50));


  useEffect(() => {
    async function analyze() {
      let finalBase64 = base64;

      const api = process.env.NEXT_PUBLIC_API_URL;

      // 📌 QR 업로드 흐름: base64가 없고 type=photo라면 백엔드에서 가져오기
      if (!finalBase64 && searchParams.get("type") === "photo") {
        const resImg = await fetch(`${api}/recycle/mobile-image`);
        const dataImg = await resImg.json();

        finalBase64 = dataImg.image;

        // 프론트에서도 저장 (결과 페이지에서 보여야 하니까)
        localStorage.setItem("wasteImage", finalBase64);
      }

      if (!finalBase64 && !text) return;

      let body;

      // 사진 분석
      if (finalBase64) {
        body = JSON.stringify({ image: finalBase64 });
      }
      // 텍스트 분석
      else if (text) {
        body = JSON.stringify({ text });
      }

      const res = await fetch(`${api}/recycle/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();

      // 사진 or 텍스트 결과 페이지 이동
      if (finalBase64) {
        router.push(
          "/general_waste/result?type=photo&data=" +
          encodeURIComponent(JSON.stringify(data))
        );
      } else {
        router.push(
          "/general_waste/result?type=text&data=" +
          encodeURIComponent(JSON.stringify(data))
        );
      }
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
