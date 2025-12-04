//핸드폰 업로드 감지페이지 

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaitPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/check`);
      const data = await res.json();   // { id: "abc123" } 또는 { id: null }

      if (data.id) {
        clearInterval(timer);
        router.push(`/general_waste/analyze?id=${data.id}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page">
      <div className="kiosk" style={{ textAlign: "center", paddingTop: "200px" }}>
        <h2 style={{ color: "white" }}>휴대폰 업로드 대기 중...</h2>
      </div>
    </div>
  );
}
