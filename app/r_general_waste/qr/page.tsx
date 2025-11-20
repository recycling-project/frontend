"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const uploadUrl = "http://<서버주소>:8080/recycle/upload-mobile";

  return (
    <div className="page-bg">
      <div className="kiosk">

        <h2>휴대폰으로 사진을 업로드하세요</h2>

        <QRCodeCanvas value={uploadUrl} size={260} />

        <p>QR을 휴대폰으로 스캔하세요</p>
      </div>
    </div>
  );
}
