"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function WasteAnalyze() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 📌 기존 localStorage 값 (카메라 촬영)
  const storedBase64 =
    typeof window !== "undefined"
      ? localStorage.getItem("wasteImage")
      : null;

  // 📌 QR 업로드로 받은 base64를 저장할 state
  const [photoFromQR, setPhotoFromQR] = useState(null);

  const text = searchParams.get("text");

  useEffect(() => {
    async function analyze() {
      const api = process.env.NEXT_PUBLIC_API_URL;

      const id = searchParams.get("id");

      if (id && !storedBase64) {
        const resImg = await fetch(`${api}/recycle/image?id=${id}`);
        const dataImg = await resImg.json();

        setPhotoFromQR(dataImg.image);

        localStorage.setItem("wasteImage", dataImg.image);

        return;
      }

      const finalImage = storedBase64 || photoFromQR;

      if (!finalImage && !text) return;

      let body;

      if (finalImage) {
        body = JSON.stringify({ image: finalImage });
      }
      // -----------------------------
      // 5) 텍스트 분석
      // -----------------------------
      else if (text) {
        body = JSON.stringify({ text });
      }

      const res = await fetch(`${api}/recycle/analyze`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
});

      const data = await res.json();

      if (finalImage) {
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
  }, [storedBase64, photoFromQR, text]);

  return (
    <div
      className="page"
      style={{
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
    width: "1080px",   // 캔버스 크기
    height: "1920px",  // 캔버스 크기
    overflow: "hidden",
    
  }}
>
      {/* 🔙 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          onClick={() => router.push("/")}
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

      {/* 🔥 가운데 정렬된 로딩 GIF */}
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
