"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FirstScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (e) {
        console.warn("카메라 접근 실패", e);
      }
    }
    startCamera();
  }, []);

  return (
    <div className="page">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="back-btn"
        onClick={() => router.replace("/menu")}
      />

      {/* 카메라 */}
      <div className="camera-wrap">
        <video ref={videoRef} autoPlay playsInline className="camera-preview" />
      </div>

      {/* 오버레이 */}
      <div className="camera-overlay">

        <div className="detect-content">
          <img src="/Green_camera.png" className="detect-icon" />
          <p className="detect-text">
            분리수거할 품목을 카메라에<br />
            잘 보이게 배치해 주세요.
          </p>
        </div>

        <div className="button-group">
          <button
            className="first-btn"
            onClick={() => router.push("/Large_waste")}
          >
            사진 첨부 파일 추가
          </button>
        </div>

      </div>

    </div>
  );
}
