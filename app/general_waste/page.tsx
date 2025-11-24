"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function FirstScreen() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 🔥 카메라 실행
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
        console.error("카메라 실행 실패:", err);
      }
    }

    startCamera();
  }, []);

  // 📷 촬영 후 이동
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/png");
    localStorage.setItem("wasteImage", base64);

    router.push("/general_waste/analyze");
  };

  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="back"
          className="back-btn"
          onClick={() => router.back()}
        />


        <div className="general_waste">

          {/*  카메라 화면 (상단 60%) */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
          <div className="nomalset">
          {/* 안내 UI */}
          <div className="detect-content">
            <img src="/Green_camera.png" className="detect-icon" />
            <p className="detect-text">
              분리수거할 품목을 카메라에<br />
              잘 보이게 배치해 주세요.
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="bottom-button-area">
            <button className="photo-btn" onClick={capturePhoto}>
              촬영하기
            </button>

            <button
              className="photo-btn"
              onClick={() => router.push("/general_waste/qr")}
            >
              QR로 사진 업로드
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
