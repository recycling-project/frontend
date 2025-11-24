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
        <div
          style={{
            color: "white",
            marginTop: "50px",
            textAlign: "center",
            padding: "20px",
            fontSize: "20px",
          }}
        >

{/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        className="question_back"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 50,
          height: 50,
          zIndex: 20
        }}
      />

          {/* 🔥 여기: 분석한 사진 보여주는 영역 */}
          {photo && (
            <img
              src={photo}
              alt="분석한 사진"
              style={{
                width: "250px",
                borderRadius: "10px",
                marginBottom: "20px",
                border: "2px solid #ffffff55",
              }}
            />
          )}

          {/* 분석 결과 */}
          {content ? (
            <>
              <h2>재활용 분석 결과</h2>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  color: "white",
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
  );
}
