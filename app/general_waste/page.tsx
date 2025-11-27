"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export default function GeneralWastePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ 카메라 실시간 실행
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
    <div className="page-bg">
      <div className="kiosk">

        {/* 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

        {/* ✅ 카메라 + 오버레이 컨테이너 */}
        <div className="camera-wrap">

          {/* 실제 카메라 */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />

          {/* UI 오버레이 */}
          <div className="camera-overlay">

            <div className="detect-content">
              <img src="/Green_camera.png" className="detect-icon" />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />
                잘 보이게 배치해 주세요.
              </p>
            </div>

            <div className="camera-bottom-button-area">
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
