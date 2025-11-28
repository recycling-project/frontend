"use client";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const uploadUrl = "https://backend-production-fc4f.up.railway.app/recycle/upload-mobile";

  const router = useRouter();
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
