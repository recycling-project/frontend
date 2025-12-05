"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WasteResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const decoded = data ? decodeURIComponent(data) : null;
  const result = decoded ? JSON.parse(decoded) : null;
  const content = result?.choices?.[0]?.message?.content;

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    let img = localStorage.getItem("wasteImage");

    if (img) {
      // prefix 없으면 붙여주기
      if (!img.startsWith("data:image")) {
        img = "data:image/jpeg;base64," + img;
      }

      setPhoto(img);
    }

    // 사진을 먼저 불러오고 바로 삭제
    localStorage.removeItem("wasteImage");
  }, []);

  return (
    <div className="page-bg">

  {/* ✅ 뒤로가기 버튼 - 화면 고정 */}
  <img
    src="/back_icon.png"
    alt="뒤로가기"
    className="back-btn"
    onClick={() => router.replace("/menu")}
    style={{
  position: "fixed",
  top: "env(safe-area-inset-top)",
  left: "5.5vw",
  zIndex: 1000
}}
  />

  <div
    className="kiosk"
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "80px"
    }}
  >
   
        {/* ✅ 촬영 이미지 영역 */}
        <div
          style={{
            width: "75%",
            maxWidth: "350px",
            aspectRatio: "1/ 1",
            marginTop: "3vh",
            background: "black",
            borderRadius: "12px",
            // border: "2px dashed red", // 네모칸 있는지 확인용
            overflow: "hidden",
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

        {/* ✅ 결과 텍스트 박스 */}
        <div
          style={{
            marginTop: "30px",
            width: "85%",
            maxWidth: "500px",
            height: "30vh",
            background: "rgba(0,0,0,0.75)",
            borderRadius: "14px",
            padding: "18px",
            color: "white",
            // border: "2px dashed red", // 네모칸 있는지 확인용
            overflowY: "auto",
            textAlign: "left",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >

          {content ? (
            <>
              <h3 style={{ marginBottom: "10px", textAlign: "center" }}>
                재활용 분석 결과
              </h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                }}
              >
                {content}
              </pre>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>
              결과 데이터를 불러올 수 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
