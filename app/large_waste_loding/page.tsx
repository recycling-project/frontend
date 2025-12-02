"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Large_waste_loding() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Large_waste_kind");
    }, 4300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        className="back-btn"
        onClick={() => router.back()}
      />

      {/* 로딩 GIF */}
      <div
        style={{
          position: "absolute",
          bottom: "20vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Loding.gif"
          alt="로딩"
          style={{
            width: "min(40vw, 200px)",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}
