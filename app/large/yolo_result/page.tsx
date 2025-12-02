"use client";

import { useEffect, useState } from "react";

export default function Large_waste_kind() {
  const [yolo, setYolo] = useState(null);

  useEffect(() => {
    async function fetchYolo() {

      // 1) 업로드된 이미지 ID 가져오기
      const idRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/check`);
      const idData = await idRes.json();
      const id = idData.id;

      // 2) 이미지 base64 가져오기
      const imgRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`);
      const imgData = await imgRes.json();
      const base64 = imgData.image;

      // 3) Spring analyze 호출 → FastAPI YOLO 결과 받기
      const yoloRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const yoloData = await yoloRes.json();
      setYolo(yoloData);
    }

    fetchYolo();
  }, []);

  return (
    <div>
      <h2>대형 폐기물 종류 선택</h2>
      <pre>{JSON.stringify(yolo, null, 2)}</pre> {/* YOLO결과 테스트 출력 */}
    </div>
  );
}
