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
  // const [keyboardOpen, setKeyboardOpen] = useState(false);  // ✅ 이제 안 써도 됨

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

          {/* 카메라 화면 */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />

          {/* ✅ 키보드 모달이 떠 있을 때는 위 안내영역 숨기기 */}
          {!showKeyboard && (
            <div className="detect-content">
              <img src="/Green_camera.png" alt="camera icon" className="detect-icon" />
              <p className="detect-text">
                분리수거할 품목을 카메라에<br />
                잘 보이게 배치해 주세요.
              </p>
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="bottom-button-area">
            {/* ✅ 키보드 모달이 떠 있을 때는 위 2개 버튼 숨기기 */}
            {!showKeyboard && (
              <>
                {/* 촬영하기 */}
                <button className="photo-btn" onClick={capturePhoto}>
                  촬영하기
                </button>

                {/* QR 업로드 */}
                <button
                  className="photo-btn"
                  onClick={() => router.push("/general_waste/qr")}
                >
                  QR로 사진 업로드
                </button>
              </>
            )}

            {/* 텍스트 입력 */}
            <input
              type="text"
              placeholder="텍스트로 직접 질문하기"
              value={textQuestion}
              readOnly                 // ✅ 기본 키보드 안 뜨게
              onClick={() => setShowKeyboard(true)} // ✅ 클릭 시 커스텀 키보드 열기
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
                router.push(
                  "/general_waste/analyze?text=" +
                    encodeURIComponent(textQuestion)
                )
              }
              disabled={!textQuestion}
            >
              질문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
