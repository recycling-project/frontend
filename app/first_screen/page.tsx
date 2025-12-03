"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FirstScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 🔶 카메라 실행
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
    <div
      className="page"
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
        className="camera-preview"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* 🌈 그라데이션 오버레이 (카메라 위 + UI 아래) */}
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

      {/* 🔼 텍스트 영역 */}
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
          style={{ width: "250px", height: "250px" }}
        />

        <p style={{ marginTop: "20px", fontSize: "50px", lineHeight: 1.5 }}>
          분리수거할 품목을 <br /> 카메라에 잘 보이게 <br />
          배치해 주세요.
        </p>
      </div>

      {/* 🔽 버튼 1개 (대형폐기물 이동) */}
      <div
        style={{
          position: "absolute",
          bottom: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <button
          className="first-btn"
          onClick={() => router.push("/Large_waste")}
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
          사진 첨부 파일 추가
        </button>
      </div>
    </div>
  );
}
