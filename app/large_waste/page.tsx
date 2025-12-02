"use client";
import { useRouter } from "next/navigation";

export default function Large_waste() {
  const router = useRouter();

  return (
    <div className="page">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="back-btn"
        onClick={() => router.back()}
      />

      {/* 촬영 프레임 */}
      <img
        src="/frame_icon.png"
        alt="frame"
        className="frame-icon"
      />

      {/* 버튼 */}
      <div className="bottom-button-area">
        <button
          className="Large_waste-btn"
          onClick={() => router.push("/Large_waste_loding")}
        >
          버리실 쓰레기가 잘 찍히게 들어주세요
        </button>
      </div>

    </div>
  );
}
