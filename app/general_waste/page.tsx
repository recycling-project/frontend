"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import KeyboardModal from "@/app/components/KeyboardModal";

export default function FirstScreen() {
  const router = useRouter();

  // 상태값
  const [textQuestion, setTextQuestion] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  // 🎥 실제 카메라 Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ 카메라 실행
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
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

  // 📷 촬영
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
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <div className="general_waste">

          {/* ✅ 실제 카메라 화면 (배경) */}
          <div className="camera-layer">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-preview"
            />
          </div>

          {/* ✅ 안내 UI (카메라 아이콘 + 문구) */}
          {!showKeyboard && (
            <div className="camera-icon">
            <div className="detect-content">
              <img src="/Green_camera.png" alt="camera icon" className="detect-icon" />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />
                잘 보이게 배치해 주세요.
              </p>
            </div>
            </div>
          )}

          {/* ✅ 하단 버튼 영역 */}
          <div className="bottom-button-area">

            {!showKeyboard && (
              <>
                <button className="photo-btn" onClick={capturePhoto}>
                  촬영하기
                </button>

                <button
                  className="photo-btn"
                  onClick={() => router.push("/general_waste/qr")}
                >
                  QR로 사진 업로드
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ 키보드 모달은 항상 최상단 overlay */}
      {showKeyboard && (
        <KeyboardModal
          value={textQuestion}
          onChange={setTextQuestion}
          onClose={() => setShowKeyboard(false)}
        />
      )}
    </div>
  );
}