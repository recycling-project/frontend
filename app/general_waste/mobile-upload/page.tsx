"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        // 🔥 프록시로 호출 (HTTPS 문제 해결)
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await res.json();

        router.push(
          "/general_waste/result?type=photo&data=" +
            encodeURIComponent(JSON.stringify(data))
        );
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
            fontSize: "18px",
            background: "white",
            borderRadius: "10px",
          }}
        />

        {loading && (
          <div style={{ marginTop: "20px", color: "white" }}>
            분석 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}
