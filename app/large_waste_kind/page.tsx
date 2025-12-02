"use client";
import { useRouter } from "next/navigation";

export default function Large_waste_kind() {
  const router = useRouter();

  const goDetails = (name: string) => {
    router.push(`/Large_waste_details?item=${name}`);
  };

  return (
    <div className="page">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        className="back-btn"
        onClick={() => router.back()}
      />

      {/* 안내 텍스트 */}
      <p
        style={{
          fontSize: "clamp(18px, 3.2vw, 28px)",
          marginTop: "12vh",
          textAlign: "center",
          color: "white",
          lineHeight: 1.4,
        }}
      >
        대형 폐기물 종류를<br />선택해주세요.
      </p>

      {/* 버튼 리스트 */}
      <div
        style={{
          marginTop: "5vh",
          display: "flex",
          flexDirection: "column",
          gap: "4vh",
          alignItems: "center",
        }}
      >
        {["장롱", "책상", "서랍장"].map((label) => (
          <button
            key={label}
            onClick={() => goDetails(label)}
            style={{
              width: "min(70vw, 320px)",
              height: "min(12vh, 100px)",
              borderRadius: "12px",
              fontSize: "clamp(18px, 4vw, 28px)",
              background: "#C9C9C9",
              border: "3px solid white",
              color: "black",
              fontWeight: 600,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
