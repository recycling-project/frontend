"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function wasteResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const decoded = data ? decodeURIComponent(data) : null;
  const result = decoded ? JSON.parse(decoded) : null;

  const content = result?.choices?.[0]?.message?.content;

  const [photo, setPhoto] = useState("");
  //사진 불러오기
  useEffect(() => {
    const img = localStorage.getItem("wasteImage");
    if (img) setPhoto(img);
    //사진을 먼저 불러오고 바로 삭제
    localStorage.removeItem("wasteImage");
  }, []);


  return (
    <div className="page-bg">
  <div className="kiosk">

{/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.push("/menu")}
        />

    {/* 🔼 상단 70% : 사진 영역 */}
    <div
        style={{
          height: "70vh",
          width: "100%",              
          background: "red",           // 테스트용 (나중에 black으로)
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
      {photo ? (
        <img
          src={photo}
          alt="분석한 사진"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      ) : (
        <p style={{ color: "white" }}>사진 없음</p>
      )}
    </div>

    {/* 🔽 하단 40% : 결과 영역 */}
    <div className="bottom-bar">
    <div
      style={{
        minHeight: "40vh",
        padding: "20px",
        color: "white"
        
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
