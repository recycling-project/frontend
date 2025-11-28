"use client";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const uploadUrl =
  "https://frontend-self-delta-10.vercel.app/general_waste/mobile-upload";

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

        <button
          style={{
            marginTop: "40px",
            padding: "15px 30px",
            background: "white",
            borderRadius: "12px",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/general_waste/wait")}
        >
          다음
        </button>

      </div>
    </div>
  );
}
