"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",

        width: "1080px",
        height: "1920px",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >

      {/* 상단 바 */}
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#36A64A",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* 🔙 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: "60px",
            left: "40px",
            width: "90px",
            height: "90px",
            cursor: "pointer",
            // filter: "invert(100%)", // 아이콘이 흰색 없던 문제 해결용
          }}
        />
      </div>

      {/* 메뉴 버튼 영역 */}
      <div
        style={{
          position: "absolute",
          top: "650px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "110px",
        }}
      >
        {/* 버튼 템플릿 */}
        {[
          { text: "일반 재활용 안내", link: "/general_waste" },
          { text: "대형 폐기물\n수거 신청", link: "/first_screen" },
          { text: "질문하기", link: "/question" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => router.push(btn.link)}
            style={{
              width: "500px",
              height: "200px",
              background: "#A0DDAB",
              borderRadius: "35px",
              border: "none",
              boxShadow: "0px 6px 14px rgba(0,0,0,0.08)",
              color: "#ffffffff",
              fontSize: "48px",
              fontWeight: 700,
              whiteSpace: "pre-line",
              cursor: "pointer",
            }}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}
