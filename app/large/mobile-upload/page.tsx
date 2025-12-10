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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recycle/mobile-upload`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          }
        );

        const data = await res.json();
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
    <div
      style={{
        position: "absolute",
        width: "1080px",
        height: "1920px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#36A64A",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

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
        }}
      />

      {/* 제목 */}
      <h2
        style={{
          position: "absolute",
          top: "350px",
          width: "100%",
          textAlign: "center",
          fontSize: "55px",
          color: "#333",
          fontWeight: 700,
        }}
      >
        휴대폰에서 사진 선택
      </h2>

      {/* 업로드 카드 박스 */}
      <div
        style={{
          position: "absolute",
          top: "520px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          maxWidth: "800px",
          padding: "50px 30px",
          background: "#F5FBF7",
          borderRadius: "20px",
          border: "4px solid #B8E6C0",
          textAlign: "center",
        }}
      >
        {/* 파일 선택 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleMobileUpload}
          style={{
            padding: "20px",
            fontSize: "28px",
            background: "#fff",
            borderRadius: "14px",
            width: "90%",
            border: "2px solid #B8E6C0",
          }}
        />

        {loading && (
          <div
            style={{
              marginTop: "40px",
              fontSize: "40px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            업로드 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}
