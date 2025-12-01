// 핸드폰 업로드 감지하는 페이지

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LargeWaitPage() {
  const router = useRouter();

  useEffect(() => {
    // ============================================
    // 1) 1초마다 Spring 서버에 "업로드 되었는지" 확인
    //    - 모바일이 사진 업로드하면 lastUploadedId 저장됨
    // ============================================
    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/check`);
      const data = await res.json(); // { id: "업로드ID" } 또는 { id: null }

      // ============================================
      // 2) 업로드된 ID가 생기면 → 다음 페이지(analyze)로 이동
      // ============================================
      if (data.id) {
        clearInterval(timer);
        router.push(`/large/analyze?id=${data.id}`);
      }
    }, 1000);

    // ============================================
    // 3) 페이지 벗어나면 타이머 정리
    // ============================================
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-bg">
      <div className="kiosk" style={{ textAlign: "center", paddingTop: "200px" }}>
        {/* 안내 문구 */}
        <h2 style={{ color: "white" }}>휴대폰 업로드 대기 중...</h2>
      </div>
    </div>
  );
}

