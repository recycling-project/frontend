"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { useRouter } from "next/navigation";
import KioskScaler from "@/app/components/KioskScaler";

export default function Home() {
  const router = useRouter();

  return (
    <KioskScaler>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "1080px",
          height: "1920px",
          background: "#FFFFFF",
          overflow: "hidden",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* 로고 텍스트 */}
        <div style={{ marginBottom: "200px" }}>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#36A64A",
            }}
          >
            순
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#A0DDAB",
            }}
          >
            환<br />마루
          </span>

          <div
            style={{
              fontSize: "40px",
              color: "#666",
              marginTop: "40px",
            }}
          >
            분리수거 도움 키오스크
          </div>
        </div>

        <div
          style={{
            fontSize: "50px",
            color: "#444",
            marginBottom: "80px",
          }}
        >
          시작하기 버튼을 눌러주세요
        </div>

        <button
          onClick={() => router.push("/menu")}
          style={{
            width: "450px",
            height: "150px",
            background: "#A0DDAB",
            borderRadius: "20px",
            border: "none",
            fontSize: "60px",
            fontWeight: 700,
            color: "#000",
            cursor: "pointer",
          }}
        >
          시작하기
        </button>
      </div>
    </KioskScaler>
  );
}
