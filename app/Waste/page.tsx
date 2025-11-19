"use client";
import { useRouter } from "next/navigation";

export default function FirstScreen() {
  const router = useRouter();
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
          사진 첨부 파일 추가<br/>
</div>
      </div>
    </div>
  );
}
