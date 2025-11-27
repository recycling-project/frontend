"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export default function GeneralWastePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ 카메라 실시간 실행
  useEffect(() => {
<<<<<<< HEAD
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
=======
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // 후면 카메라
        });
>>>>>>> origin/main

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("카메라 미지원 - 테스트 모드");
    }
  }
  startCamera();
}, []);


<<<<<<< HEAD
  // ✅ 촬영 기능
=======
  // 📷 촬영하기
>>>>>>> origin/main
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

<<<<<<< HEAD
=======
    // 🔥 카메라 초기화 안 되면 캡처 불가
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("카메라 초기화 전에 촬영 시도됨!");
      return;
    }

>>>>>>> origin/main
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context 생성 실패");
      return;
    }

    // 🔥 비디오 프레임 캡처
    ctx.drawImage(video, 0, 0, width, height);

    // 🔥 JPEG 강제 변환
    let base64 = canvas.toDataURL("image/jpeg", 0.7);

    // 혹시 PNG일 경우 강제 변환
    if (base64.includes("image/png")) {
      const newCanvas = document.createElement("canvas");
      newCanvas.width = width;
      newCanvas.height = height;

      const newCtx = newCanvas.getContext("2d");
      if (newCtx) {
        newCtx.drawImage(canvas, 0, 0);
        base64 = newCanvas.toDataURL("image/jpeg", 0.7);
      }
    }

    console.log("🔥 최종 캡처 포맷:", base64.slice(0, 40));

    localStorage.setItem("wasteImage", base64);

    // 🔥 분석 페이지로 이동
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

<<<<<<< HEAD
        {/* ✅ 카메라 + 오버레이 컨테이너 */}
        <div className="camera-wrap">

          {/* 실제 카메라 */}
=======
        <div className="general_waste">

          {/* 카메라 화면 */}
>>>>>>> origin/main
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
<<<<<<< HEAD

          {/* UI 오버레이 */}
          <div className="camera-overlay">

=======

          <div className="nomalset">

            {/* 안내 UI */}
>>>>>>> origin/main
            <div className="detect-content">
              <img src="/Green_camera.png" className="detect-icon" />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />
                잘 보이게 배치해 주세요.
              </p>
            </div>

<<<<<<< HEAD
            <div className="camera-bottom-button-area">
=======
            {/* 버튼 영역 */}
            <div className="bottom-button-area">
>>>>>>> origin/main
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
