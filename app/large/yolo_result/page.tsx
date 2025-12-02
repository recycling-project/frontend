"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Large_yolo_result() {
  const params = useSearchParams();
  const [yolo, setYolo] = useState<any>(null);
  const [photo, setPhoto] = useState("");
  const router = useRouter();

  // 🔥 영어 → 한국어 변환 딕셔너리 (return 바깥)
  const engToKor: Record<string, string> = {
    "bab-sang": "밥상",
    "seo-rap-jang": "서랍장",
    "sofa": "소파",
    "chair": "의자",
    "jang-long": "장롱",
    "desk": "책상",
    "hwa-jang-dae": "화장대",
    "bed": "매트리스",
    "bicycle": "두발자전거",
    "hang-a-ri": "항아리",
  };

  useEffect(() => {
    const raw = params.get("data");
    if (raw) setYolo(JSON.parse(raw));

    const imgQuery = params.get("img");
    const imgLocal = localStorage.getItem("large_waste_image");

    if (imgQuery) setPhoto(imgQuery);
    else if (imgLocal) setPhoto(imgLocal);
  }, []);

  // 🔥 YOLO 클래스 추출 (안전 처리)
  const cls = yolo?.best_detection?.class_name || "";
  const korean = engToKor[cls] || cls;

  return (
    <div className="container">
      <h2>대형 폐기물</h2>

      {photo && <img src={photo} alt="업로드 사진" className="photo" />}

      <div className="buttonWrap">

        <button
          className="resultBtn"
          onClick={() => router.push(`/large/select_menu/options/${cls}`)}
        >
          {korean}
        </button>

        <button
          className="selectBtn"
          onClick={() => router.push("/large/select_menu")}
        >
          전체 목록에서 선택
        </button>

      </div>

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .photo {
          width: 75%;
          max-width: 350px;
          aspect-ratio: 1/1;
          border-radius: 12px;
          margin-top: 20px;
          object-fit: cover;
        }

        .buttonWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        margin-top: 25px;
        }

        .resultBtn {
        width: 80%;
        max-width: 300px;
        padding: 16px;
        background: black;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        border-radius: 12px;
      }

        .selectBtn {
        width: 80%;
        max-width: 300px;
        padding: 14px;
        background: black;
        border: none;
        color: white;
        font-size: 18px;
        border-radius: 12px;
      }
      `}</style>
    </div>
  );
}
