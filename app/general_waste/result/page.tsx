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
    const img = localStorage.getItem("wasteImage");
    if (img) setPhoto(img);
    localStorage.removeItem("wasteImage");
  }, []);

  return (
    <div className="page-bg">
      <div className="kiosk" style={{ height: "100vh", position: "relative" }}>

        {/* 🔙 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.replace("/menu")}
        />

        {/* ✅ 사진 영역 */}
        <div
          style={{
            marginTop: "80px",   // 🔥 뒤로가기와 간격
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              aspectRatio: "1 / 1",  // ✅ 정사각형 유지
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
        </div>

        {/* ✅ 결과 텍스트 영역 */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            color: "white",
          }}
        >
          {content ? (
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>재활용 분석 결과</h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                {content}
              </pre>
            </div>
          ) : (
            <p>결과 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
