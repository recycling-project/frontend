"use client";

import { useState } from "react";

export default function LargeMobileUploadPage() {
  const [loading, setLoading] = useState(false);

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recycle/mobile-upload-large`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          }
        );

        const data = await res.json();

        console.log("업로드 된 ID:", data.id);

        alert("사진 업로드 완료!");
      } catch (err) {
        console.error("업로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="page-bg">
      <div className="kiosk" style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "white" }}>휴대폰에서 사진 선택</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleMobileUpload}
          style={{
            marginTop: "20px",
            padding: "10px",
            fontSize: "15px",
            background: "white",
            borderRadius: "10px",
            width: "80%",
            maxWidth: "300px",
            textAlign: "center",
          }}
        />

        {loading && (
          <div style={{ marginTop: "20px", color: "white" }}>
            업로드 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}