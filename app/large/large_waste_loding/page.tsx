"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Large_waste_loding() {
  const router = useRouter();

  // 5초 뒤 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/large/large_waste_kind");
    }, 4300);

    return () => clearTimeout(timer); // 페이지 벗어나면 타이머 정리
  }, []);
  

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

        {/* 로딩 움짤 */}
        <div className="loading-wrapper">
          <img
            src="/Loding.gif"
            alt="로딩 움짤"
            className="loading-gif"
          />
        </div>

      </div>
    </div>
  );
}
