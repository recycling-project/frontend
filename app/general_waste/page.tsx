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

  // 카메라
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 카메라 켜기
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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

  // 사진 파일 업로드 → base64 변환
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 촬영하기 기능
  const capturePhoto = () => {
    const video = videoRef.current!;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    localStorage.setItem("wasteImage", base64);
    router.push("/Waste/loading");
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

        {/*  카메라 화면 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="camera-preview"
        />

        <div className="detect-content">
          <img src="/Green_camera.png" alt="camera icon" className="detect-icon" />
          <p className="detect-text">
            분리수거할 품목을 카메라에<br />
            잘 보이게 배치해 주세요.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="bottom-button-area">
          
          {/* 촬영하기 */}
          <button className="photo-btn" onClick={capturePhoto}>
            촬영하기
          </button>

          {/* QR 업로드 */}
          <button
            className="photo-btn"
            onClick={() => router.push("/Waste/qr")}
          >
            QR로 사진 업로드
          </button>

          {/* 파일 업로드 추후 삭제예정*/} 
          <label className="file-label">
            사진 파일 선택
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input"
            />
          </label>

          {/* 사진 분석 추후 삭제예정*/}
          <button
            className="photo-btn"
            onClick={() => {
              localStorage.setItem("wasteImage", photoBase64);
              router.push("/waste/analyze");
            }}
            disabled={!photoBase64}
          >
            사진으로 분석하기
          </button>

          {/* 텍스트 입력 */}
          <input
            type="text"
            placeholder="텍스트로 직접 질문하기"
            value={textQuestion}
            readOnly
            onClick={() => setShowKeyboard(true)}
            className="text-input"
          />

          {showKeyboard && (
            <KeyboardModal
              value={textQuestion}
              onChange={setTextQuestion}
              onClose={() => setShowKeyboard(false)}
            />
          )}

          {/* 질문하기 */}
          <button
            className="ask-btn"
            onClick={() =>
              router.push("/Waste/analyze?text=" + encodeURIComponent(textQuestion))
            }
            disabled={!textQuestion}
          >
            질문하기
          </button>
        </div>
      </div>
    </div>
  );
}
