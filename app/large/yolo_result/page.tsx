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

    // 2) 사진은 localStorage에서만 가져온다
    const imgLocal = localStorage.getItem("large_waste_image");
    if (imgLocal) {
      setPhoto(imgLocal);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>대형 폐기물 종류 선택</h2>

      {/* 업로드한 사진 표시 */}
      {photo && (
        <div
          style={{
            width: "75%",
            maxWidth: "350px",
            aspectRatio: "1 / 1",
            marginTop: "3vh",
            background: "black",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={photo}
            alt="업로드 사진"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* YOLO 결과 */}
      <pre style={{ marginTop: 20, fontSize: 16 }}>
        {JSON.stringify(yolo, null, 2)}
      </pre>
    </div>
  );
}
