"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WasteResult() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //  분석 타입 읽기 (photo or text)
  const type = searchParams.get("type");

  // 사진 표시용
  const [photo, setPhoto] = useState("");

  //  GPT 결과 저장용
  const [content, setContent] = useState("");   // ★★ content는 이제 useState로 관리한다.

  useEffect(() => {
    console.log("🔥 analyzeResult in localStorage >>>", localStorage.getItem("analyzeResult"));
    console.log("🔥 type >>>", type);
    console.log("🔥 content >>>", content);
    // ============================
    // 1. 사진 불러오기
    // ============================
    const img = localStorage.getItem("wasteImage");
    if (img) setPhoto(img);

    // ============================
    //  2. GPT 결과 불러오기
    // ============================

    if (type === "photo") {
      // 추가된 부분: 사진 모드는 URL에 data가 없음 → localStorage에서 읽기
      const raw = localStorage.getItem("analyzeResult");
      if (raw) {
        const parsed = JSON.parse(raw);
        setContent(parsed?.choices?.[0]?.message?.content || "");
      }
    } else {
      //  기존 코드 유지 (텍스트 모드는 URL에서 data 파라미터 읽기)
      const data = searchParams.get("data");
      const decoded = data ? decodeURIComponent(data) : null;
      const parsed = decoded ? JSON.parse(decoded) : null;
      setContent(parsed?.choices?.[0]?.message?.content || "");
    }

    //  정리: 사용 후 즉시 삭제
    localStorage.removeItem("wasteImage");
    localStorage.removeItem("analyzeResult");
  }, [type]);  // ★ type이 바뀔 때만 실행되도록 변경


  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

    {/* 🔼 사진 영역 */}
        <div
          style={{
            height: "70vh",
            width: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt="분석한 사진"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <p style={{ color: "white" }}>사진 없음</p>
          )}
        </div>

        {/* 🔽 결과 영역 */}
        <div className="bottom-bar">
          <div
            style={{
              minHeight: "40vh",
              padding: "20px",
              color: "white",
            }}
          >
            {content ? (
              <>
                <h2>재활용 분석 결과</h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "18px",
                  }}
                >
                  {content}
                </pre>
              </>
            ) : (
              <p>결과 데이터를 불러올 수 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}