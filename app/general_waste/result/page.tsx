"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KioskScaler from "@/app/components/KioskScaler";

export default function WasteResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const decoded = data ? decodeURIComponent(data) : null;
  const result = decoded ? JSON.parse(decoded) : null;

  // GPT 분석 텍스트 content 추출
  const content = result?.choices?.[0]?.message?.content;

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    let img = localStorage.getItem("wasteImage");

    if (img) {
      if (!img.startsWith("data:image")) {
        img = "data:image/jpeg;base64," + img;
      }
      setPhoto(img);
    }

    // 페이지 로딩 후 wasteImage 삭제
    localStorage.removeItem("wasteImage");
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

        {/* 상단 바 */}
        <div
          style={{
            width: "100%",
            height: "220px",
            background: "#36A64A",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >

        </div>
        {/* 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
          style={{
            position: "fixed",
            top: "60px",
            left: "40px",
            zIndex: 1000,
            // filter: "invert(100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "220px",
            left: 0,
            width: "100%",
            height: "calc(100% - 220px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "80px",
            paddingBottom: "120px",
            boxSizing: "border-box",
          }}
        >



          {/* ======================== */}
          {/*   📸 촬영 이미지 박스     */}
          {/* ======================== */}
          {/* 📌 이미지 박스 */}
          <div
            style={{
              width: "75%",
              maxWidth: "450px",
              aspectRatio: "1 / 1",
              marginTop: "4vh",
              background: "#F5FBF7",
              border: "4px solid #B8E6C0",
              borderRadius: "20px",
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
              <p style={{ color: "#555" }}>사진 없음</p>
            )}
          </div>

          {/* 📌 결과 텍스트 박스 */}
          <div
            style={{
              marginTop: "120px",
              width: "85%",
              maxWidth: "800px",
              height: "75vh",
              background: "#F5FBF7",
              border: "4px solid #B8E6C0",
              borderRadius: "20px",
              padding: "26px",
              overflowY: "auto",
              color: "#333",
              fontSize: "35px",
              lineHeight: 1.6,
            }}
          >
            {content ? (
              <>
                <h3 style={{ marginBottom: "18px", textAlign: "center", fontSize: "30px" }}>
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
              <p style={{ textAlign: "center" }}>결과 데이터를 불러올 수 없습니다.</p>
            )}

          </div>

          <button
            onClick={() => router.replace("/general_waste")}
            style={{
              marginTop: "150px",
              width: "420px",
              height: "160px",
              background: "#A0DDAB",
              color: "#fff",
              borderRadius: "35px",
              border: "none",
              fontSize: "46px",
              fontWeight: 700,
              boxShadow: "0px 6px 14px rgba(0,0,0,0.08)",
              cursor: "pointer"
            }}
          >
            다시 촬영하기
          </button>
        </div>
      </div>
    </KioskScaler>
  );
}
