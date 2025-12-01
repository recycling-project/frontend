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
          video: { facingMode: "environment" }, // 후면 카메라
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
  // 📌 사진 촬영 함수
  // ================================
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // 캔버스 사이즈 = 비디오 사이즈
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 캡쳐
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const base64 = canvas.toDataURL("image/jpeg");

    // 📌 촬영된 이미지 저장 → 이후 analyze 페이지에서 사용
    localStorage.setItem("large_waste_image", base64);

    // 📌 다음 페이지로 이동
    router.push("/large/analyze");
  };

  return (
    <div className="page-bg">
      <div className="kiosk">
        
        {/* 🔙 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

        {/* 📷 카메라 프리뷰 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="camera-preview"
        />

        {/* 사진 캡처용 캔버스 (숨김) */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* UI 오버레이 */}
        <div className="camera-overlay">

          <div className="recyleset">
            <div className="detect-content">
              <img
                src="/Green_camera.png"
                alt="camera icon"
                className="detect-icon"
              />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />잘 보이게 배치해 주세요.
              </p>
            </div>
          </div>

          {/* 📌 촬영 버튼 + 파일 업로드 버튼 */}
          <div className="bottom-button-area">

            {/* 🔥 촬영 버튼 추가 */}
            <button
              className="first-btn"
              disabled={!isCameraReady}
              onClick={takePhoto}
            >
              사진 촬영하기
            </button>

            {/* 기존 파일 업로드 버튼 */}
            <button
              className="first-btn"
              onClick={() => router.push("/large/qr")}
            >
              사진 첨부 파일 추가
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
