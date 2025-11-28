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
  // (이게 핵심 수정!)
  const [photoFromQR, setPhotoFromQR] = useState(null);

  const text = searchParams.get("text");

  useEffect(() => {
    async function analyze() {
      const api = process.env.NEXT_PUBLIC_API_URL;

      // -----------------------------
      // 1) QR 업로드인 경우 → 무조건 id 를 받아서 이미지 요청
      // -----------------------------
      const id = searchParams.get("id");  // wait 페이지가 전달해줌

      if (id && !storedBase64) {
        const resImg = await fetch(`${api}/recycle/image?id=${id}`);
        const dataImg = await resImg.json();

        // 서버에서 가져온 base64를 state에 저장
        setPhotoFromQR(dataImg.image);

        // result 페이지에서 사용하기 위해 localStorage에도 저장
        localStorage.setItem("wasteImage", dataImg.image);

        // 분석은 이미지가 준비된 다음에만 진행해야 함
        return;
      }

      // -----------------------------
      // 2) 실제 사용할 base64 결정
      // -----------------------------
      const finalImage = storedBase64 || photoFromQR;
<<<<<<< HEAD

      // -----------------------------
      // 3) base64도 없고 text도 없으면 분석할 게 없음
      // -----------------------------
      if (!finalImage && !text) return;

      let body;

      // -----------------------------
      // 4) 사진 분석
      // -----------------------------
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
=======

      // -----------------------------
      // 3) base64도 없고 text도 없으면 분석할 게 없음
      // -----------------------------
      if (!finalImage && !text) return;

      let body;

      // -----------------------------
      // 4) 사진 분석
      // -----------------------------
      if (finalImage) {
        body = JSON.stringify({ image: finalImage });
      }
      // -----------------------------
      // 5) 텍스트 분석
      // -----------------------------
      else if (text) {
        body = JSON.stringify({ text });
      }

      const res = await fetch("/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
});
>>>>>>> dagyeong

      const data = await res.json();

      // -----------------------------
      // 6) 결과 페이지로 이동
      // -----------------------------
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
    // 🔥 storedBase64 변경 또는 photoFromQR 변경 시 다시 실행
  }, [storedBase64, photoFromQR, text]);

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
