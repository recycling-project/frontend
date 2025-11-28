"use client";

import { useState } from "react";

//  MobileUploadPage = 휴대폰에서 사진을 업로드하는 페이지
//  이 페이지의 '유일한 역할' = 사진을 서버로 업로드하는 것
//  여기서 GPT 분석을 하면 안 됨 (분석은 키오스크 analyze 페이지에서 할 것)

export default function MobileUploadPage() {
  const [loading, setLoading] = useState(false); // 업로드 상태 표시용

  // -----------------------------------------------------------
  // - 사진 파일 선택 시 실행됨
  // - base64로 변환한 후 서버로 업로드만 수행
  // - 분석, 페이지 이동, 결과 표시 절대 금지
  // -----------------------------------------------------------
  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // 파일 없으면 종료

    setLoading(true); // 로딩 표시

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string; // 파일을 base64 문자열로 변환한 값

      try {
        // -----------------------------------------------------------
        //  중요!!
        // 원래는 /recycle/analyze 로 바로 분석을 요청했기 때문에
        // 결과가 "모바일"에 표시되는 문제가 생겼음.
        //
        // 그래서 아래처럼 '업로드 전용 API' 로 보내는 구조로 변경.
        // -----------------------------------------------------------
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recycle/mobile-upload`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }), // 사진만 서버로 전송
          }
        );

        // 서버는 { id: "xxxx" } 형태로 응답함
        const data = await res.json();

        console.log("업로드 ID:", data.id);

        // -----------------------------------------------------------
        //  중요!!
        // 모바일은 업로드 끝나면 그냥 끝내야 한다.
        // - router.push() 사용 금지
        // - 결과 페이지로 이동 금지
        //
        // 이유: 결과는 키오스크에서 봐야 하기 때문.
        // -----------------------------------------------------------
        alert("사진이 업로드되었습니다!\n키오스크 화면을 확인해주세요.");

      } catch (err) {
        console.error("업로드 실패:", err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    // 파일을 base64로 변환 시작
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-bg">
      <div className="kiosk" style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "white" }}>휴대폰에서 사진 선택</h2>

        {/* -----------------------------------------------------------
            사용자가 사진 파일을 선택하면 handleMobileUpload 실행됨
        ------------------------------------------------------------- */}
        <input
          type="file"
          accept="image/*"
          onChange={handleMobileUpload}
          style={{
            marginTop: "20px",
            padding: "10px",
            fontSize: "18px",
            background: "white",
            borderRadius: "10px",
          }}
        />

        {/* 업로드 중 표시 */}
        {loading && (
          <div style={{ marginTop: "20px", color: "white" }}>
            업로드 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}
