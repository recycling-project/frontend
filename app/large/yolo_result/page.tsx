"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KioskScaler from "@/app/components/KioskScaler";

export const dynamic = "force-dynamic";

export default function Large_yolo_result() {
  const params = useSearchParams();
  const [yolo, setYolo] = useState<any>(null);
  const [photo, setPhoto] = useState("");
  const router = useRouter();

  // 영어 → 한국어
  const engToKor: Record<string, string> = {
    "bab-sang": "밥상",
    "seo-rap-jang": "서랍장",
    "sofa": "소파",
    "chair": "의자",
    "jang-long": "장롱",
    "desk": "책상",
    "hwa-jang-dae": "화장대",
    "bed": "침대",
    "bicycle": "자전거",
    "hang-a-ri": "항아리",
  };

  useEffect(() => {
    const raw = params.get("data");
    if (raw) setYolo(JSON.parse(raw));

    const imgLocal = localStorage.getItem("large_result_image");
    if (imgLocal) setPhoto(imgLocal);
  }, []);

  const rawCls = yolo?.best_detection?.class_name;
  const cls = (!rawCls || rawCls === "null") ? null : rawCls;

  const korean = cls ? engToKor[cls] || cls : null;

  return (
    <KioskScaler>
      <div
        className="page container"
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "#ffffff",
          overflow: "hidden",
          textAlign: "center",
          paddingTop: "200px",
        }}
      >
        <h2 style={{ fontSize: "70px", marginBottom: "40px" }}>대형 폐기물</h2>

        {photo && (
          <img
            src={photo}
            alt="업로드 사진"
            style={{
              width: "700px",
              height: "700px",
              objectFit: "cover",
              borderRadius: "20px",
              marginBottom: "60px",
            }}
          />
        )}

        <div className="buttonWrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* YOLO가 인식했을 경우 */}
          {cls ? (
            <button
              className="resultBtn"
              onClick={() => router.push(`/large/select_menu/options/${cls}`)}
            >
              {korean}
            </button>
          ) : null}

          {/* 항상 표시되는 버튼 */}
          <button
            className="selectBtn"
            onClick={() => router.push("/large/select_menu")}
          >
            전체 목록에서 선택
          </button>
        </div>

        <style jsx>{`
          .resultBtn {
            width: 420px;
            height: 160px;
            background: #A0DDAB;
            color: #fff;
            border-radius: 35px;
            border: none;
            font-size: 46px;
            font-weight: 700;
            box-shadow: 0px 6px 14px rgba(0,0,0,0.08);
            cursor: pointer;
            margin-bottom: 40px;
          }

          .selectBtn {
            width: 420px;
            height: 160px;
            background: #A0DDAB;
            color: #fff;
            border-radius: 35px;
            border: none;
            font-size: 46px;
            font-weight: 700;
            box-shadow: 0px 6px 14px rgba(0,0,0,0.08);
            cursor: pointer;
          }
        `}</style>
      </div>
    </KioskScaler>
  );
}
