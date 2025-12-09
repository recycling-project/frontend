"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FirstScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // ================================
  // ✅ 카메라 실행
  // ================================
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsCameraReady(true);
      } catch (e) {
        console.warn("카메라 접근 실패", e);
      }
    }
    startCamera();
  }, []);

  // ================================
  // 📸 촬영 → base64 저장 후 analyze 이동
  // ================================
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const base64 = canvas.toDataURL("image/jpeg");

    localStorage.setItem("large_waste_image", base64);

    router.push("/large/analyze"); // ← 대형폐기물 분석
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
        overflow: "hidden",
        background: "#000",
      }}
    >

      {/* 🔙 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
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

      {/* 📸 카메라 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 🌈 그라데이션 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* 안내 텍스트 */}
      <div
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
          style={{
            width: "250px",
            height: "250px",
            filter: "brightness(0%) invert(100%)",
          }}
        />
        <p style={{ marginTop: "20px", fontSize: "50px", lineHeight: 1.5 }}>
          분리수거할 품목을 <br />
          카메라에 잘 보이게 <br />
          배치해 주세요.
        </p>
      </div>

      {/* 🔽 버튼 2개 (GeneralWaste와 100% 동일 UI) */}
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
        {/* 🎯 버튼1 : 촬영하기 → /large/analyze */}
        <button
          onClick={takePhoto}
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
           

        {/* 🎯 버튼2 : QR 업로드 → /large/qr */}
        <button
          onClick={() => router.push("/large/qr")}
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
