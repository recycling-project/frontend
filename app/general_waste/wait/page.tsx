// 핸드폰 업로드 감지페이지

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import KioskScaler from "@/app/components/KioskScaler";

export default function WaitPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recycle/check`
      );
      const data = await res.json(); // { id: "abc123" } | { id: null }

      if (data.id) {
        clearInterval(timer);
        router.push(`/general_waste/analyze?id=${data.id}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <KioskScaler>
      <div
        className="page"
        style={{
          background: "#ffffff",
          width: "1080px",
          height: "1920px",
          overflow: "hidden",

          position: "absolute",
          left: "50%",
          top: "0",
          transform: "translateX(-50%)",
        }}
      >
        {/* 중앙 텍스트 */}
        <h2
          style={{
            color: "white",
            fontSize: "60px",
            fontWeight: 700,
            lineHeight: "1.4",
          }}
        >
          휴대폰 업로드<br />대기 중...
        </h2>
      </div>
    </KioskScaler>
  );
}
