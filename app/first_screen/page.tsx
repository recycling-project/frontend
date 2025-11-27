"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FirstScreen() {
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
      } catch (e) {
        console.warn("카메라 접근 실패", e);
      }
    }

    startCamera();
  }, []);

  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

        {/* ✅ 실제 카메라 화면 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="camera-preview"
        />

        {/* ✅ UI 오버레이 */}
        <div className="camera-overlay">

          

          <div className="recyleset">
            <div className="detect-content">
              <img
                src="/Green_camera.png"
                alt="camera icon"
                className="detect-icon"
              />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />
                잘 보이게 배치해 주세요.
              </p>
            </div>
</div>
            <div className="bottom-button-area">
              <button
                className="first-btn"
                onClick={() => router.push("Large_waste")}
              >
                사진 첨부 파일 추가
              </button>
            
          </div>

        </div>
      </div>
    </div>
  );
}
