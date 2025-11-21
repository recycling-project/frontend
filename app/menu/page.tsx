"use client";
import { useRouter } from "next/navigation";

export default function MenuPage() {
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
        
        <div className="button-zone">
          <button
  className="kiosk-button"
  onClick={() => router.push("/Waste")}
>
  일반 재활용<br/>안내
</button>

          <button
  className="kiosk-button"
  onClick={() => router.push("/first_screen")}
>
  대형 폐기물<br/>수거 신청
</button>

        </div>

      </div>
    </div>
  );
}
      


