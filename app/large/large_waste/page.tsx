"use client";
import { useRouter } from "next/navigation";

export default function Large_waste() {
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

        {/* 촬영 프레임 */}
        <div className="frame-icon">
          <img
            src="/frame_icon.png"
            alt="촬영 프레임"
            className="frame-icon"
          />
        </div>

        {/* 아래 버튼 영역 */}
          <div className="bottom-button-area">
            <button className="Large_waste-btn"
            onClick={() => router.push("/large/large_waste_loding")}>
         버리실 쓰레기가 잘 찍히게 들어주세요<br/>
        </button>
</div>
      </div>
    </div>
  );
}
