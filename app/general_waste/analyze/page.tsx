"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import KioskScaler from "@/app/components/KioskScaler";

function WasteAnalyzeContent() {
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

      // -----------------------------
      // 1) QR 업로드인 경우 → 무조건 id 를 받아서 이미지 요청
      // -----------------------------
      const id = searchParams.get("id"); // wait 페이지가 전달해줌

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
    <KioskScaler>
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
    </KioskScaler>
  );
}

export default function WasteAnalyzePage() {
  return (
    <Suspense>
      <WasteAnalyzeContent />
    </Suspense>
  );
}
