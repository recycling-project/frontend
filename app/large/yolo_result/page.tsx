"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Large_yolo_result() {
  const params = useSearchParams();
  const [yolo, setYolo] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    // 1) YOLO 결과
    const raw = params.get("data");
    if (raw) {
      setYolo(JSON.parse(raw));
    }

    // 2) 이미지: 쿼리 → localStorage 순서로 가져옴
    const imgQuery = params.get("img");
    const imgLocal = localStorage.getItem("large_waste_image");

    if (imgQuery) {
      setPhoto(imgQuery);
    } else if (imgLocal) {
      setPhoto(imgLocal);
    }
  }, []);

  return (
    <div className="container">
      <h2>대형 폐기물 종류 선택</h2>

      {photo && (
        <img src={photo} alt="업로드 사진" className="photo" />
      )}

      <pre className="yoloBox">
        {JSON.stringify(yolo, null, 2)}
      </pre>

      {/* 여기 아래가 CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .photo {
          width: 75%;
          max-width: 350px;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          margin-top: 20px;
          object-fit: cover;
        }

        .yoloBox {
          margin-top: 20px;
          padding: 20px;
          width: 85%;
          max-width: 500px;
          height: 30vh;
          background: rgba(0, 0, 0, 0.75);
          border-radius: 12px;
          color: white;
          overflow-y: auto;
          text-align: left;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}
