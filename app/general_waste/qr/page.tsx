"use client";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

export default function QRPage() {
  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/general_waste/mobile-upload";

  const router = useRouter();

  //  업로드되면 자동으로 wait 페이지로 이동

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/check`);
      const data = await res.json();

      if (data.id) {
        clearInterval(timer);
        router.push("/general_waste/wait");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <h2 className="qr-title">휴대폰으로 사진을 업로드하세요</h2>

        <div className="qr-wrapper">
          <QRCodeCanvas value={uploadUrl} size={260} />
        </div>

        <p className="qr-guide">QR을 휴대폰으로 스캔하세요</p>



      </div>
    </div>
  );
}
