"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"; // 사진파일base64로 변환하기위해 필요



export default function FirstScreen() {
  const router = useRouter();
  const [textQuestion, setTextQuestion] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    ;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoBase64(reader.result as string);  // base64 저장
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

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

        {/* 아래 버튼 영역 */}
        <div className="bottom-button-area">

          {/* 파일 첨부 버튼 */}
          <label className="file-label">
            사진 첨부하기
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input"
            />
          </label>

          {/* 사진 분석하기 */}
          <button
            className="photo-btn"
            onClick={() =>
              router.push("/Waste/loading?img=" + encodeURIComponent(photoBase64))
            }
            disabled={!photoBase64}
          >
            사진으로 분석하기
          </button>

          {/* 텍스트 입력 */}
          <input
            type="text"
            placeholder="텍스트로 직접 질문하기"
            value={textQuestion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextQuestion(e.target.value)}
            className="text-input"
          />

          <button
            className="ask-btn"
            onClick={() =>
              router.push("/Waste/loading?text=" + encodeURIComponent(textQuestion))
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
