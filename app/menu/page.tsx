"use client";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  return (
    <div className="page">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="back-btn"
        onClick={() => router.push("/")}
      />

      {/* 메뉴 버튼 영역 */}
      <div className="menu-buttons">
        <button className="menu-btn" onClick={() => router.push("/general_waste")}>
          일반 재활용<br />안내
        </button>

        <button className="menu-btn" onClick={() => router.push("/first_screen")}>
          대형 폐기물<br />수거 신청
        </button>

        <button className="menu-btn" onClick={() => router.push("/question")}>
          질문<br />하기
        </button>
      </div>

    </div>
  );
}
