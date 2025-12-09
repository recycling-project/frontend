"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

export default function LargeQRPage() {
  // 📌 모바일 업로드 페이지 URL
  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/large/mobile-upload";

  const router = useRouter();

  useEffect(() => {
    // 📌 초기화 요청
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/reset`, {
      method: "POST",
    });

    // 📌 업로드 감지
    const timer = setInterval(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/large/check`
      );
      const data = await res.json();

      if (data.id) {
        clearInterval(timer);
        router.push("/large/wait");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="page"
      style={{
        background: "#ffffff",
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 상단 초록 바 */}
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

      {/* 뒤로가기 버튼 */}
      <img
        src="/back_icon.png"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />

      {/* QR 코드 */}
      <div
        className="qr-wrapper"
        style={{
          position: "absolute",
          top: "400px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <QRCodeCanvas value={uploadUrl} size={260} />
      </div>

      {/* 안내 문구 */}
      <p
        className="qr-guide"
        style={{
          position: "absolute",
          top: "1100px",
          width: "100%",
          textAlign: "center",
          fontSize: "40px",
          color: "#444",
        }}
      >
        QR을 휴대폰으로 스캔하세요
      </p>
    </div>
  );
}

