"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export default function GeneralWastePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ 카메라 실행
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("카메라 미지원 - 테스트 모드");
      }
    }
    startCamera();
  }, []);

  // ✅ 촬영 기능
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, width, height);

    const base64 = canvas.toDataURL("image/png");
    localStorage.setItem("wasteImage", base64);

    router.push("/general_waste/analyze");
  };

  return (
    <div
      className="page"
      style={{
        position: "absolute",
        width: "1080px",
        height: "1920px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* 🔙 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        className="back-btn"
        onClick={() => router.replace("/menu")}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          zIndex: 999,
          cursor: "pointer",
        }}
      />

      {/* 📸 카메라 전체 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-preview"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* 🌈 투명 그라데이션 오버레이 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* 📝 위 텍스트 */}
      <div
        className="detect-content"
        style={{
          position: "absolute",
          top: "350px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
          zIndex: 10,
        }}
      >
        <img
          src="/Green_camera.png"
          style={{ width: "250px", height: "250px" }}
        />
        <p style={{ marginTop: "20px", fontSize: "50px", lineHeight: 1.5 }}>
          분리수거할 품목을 <br /> 카메라에
          잘 보이게 <br />배치해 주세요.
        </p>
      </div>

      {/* 📌 버튼 2개 */}
      <div
        style={{
          position: "absolute",
          bottom: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "110px",
          zIndex: 10,
        }}
      >
        <button
          onClick={capturePhoto}
          style={{
            width: "500px",
            height: "200px",
            background: "#A0DDAB",
            borderRadius: "35px",
            border: "none",
            boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          촬영하기
        </button>

        <button
          onClick={() => router.push("/general_waste/qr")}
          style={{
            width: "500px",
            height: "200px",
            background: "#A0DDAB",
            borderRadius: "35px",
            border: "none",
            boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          QR로 사진 업로드
        </button>
      </div>
    </div>
  );

}
