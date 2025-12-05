"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import KioskScaler from "@/app/components/KioskScaler";

export const fetchCache = "force-no-store";

export default function LargeWaitPage() {
  const router = useRouter();

  useEffect(() => {
    // 1초마다 Spring에 업로드 체크 요청
    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/check`);
      const data = await res.json(); // { id: "abc123" } | { id: null }

      // 업로드 ID 생기면 분석 페이지로 이동
      if (data.id) {
        clearInterval(timer);
        router.push(`/large/analyze?id=${data.id}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <KioskScaler>
      <div
        className="page"
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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
