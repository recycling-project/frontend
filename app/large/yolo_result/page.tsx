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
    <div style={{ padding: 20 }}>
      <h2>대형 폐기물 종류 선택</h2>

      {photo && (
        <img
          src={photo}
          alt="업로드 사진"
          style={{
            width: "90%",
            borderRadius: 10,
            marginTop: 20,
          }}
        />
      )}

      <pre style={{ marginTop: 20, fontSize: 16 }}>
        {JSON.stringify(yolo, null, 2)}
      </pre>
    </div>
  );
}
