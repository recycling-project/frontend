"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    const imgQuery = params.get("img");
    const imgLocal = localStorage.getItem("large_waste_image");

    if (imgQuery) setPhoto(imgQuery);
    else if (imgLocal) setPhoto(imgLocal);
  }, []);

  // YOLO class_name 안전 처리 ("null" 문자열도 null 취급)
  const rawCls = yolo?.best_detection?.class_name;
  const cls = (!rawCls || rawCls === "null") ? null : rawCls;

  const korean = cls ? engToKor[cls] || cls : null;

  return (
    <div className="container">
      <h2>대형 폐기물</h2>

      {photo && <img src={photo} alt="업로드 사진" className="photo" />}

      <div className="buttonWrap">

        {/* 인식된 경우만 버튼 표시 */}
        {cls ? (
          <button
            className="resultBtn"
            onClick={() => router.push(`/large/select_menu/options/${cls}`)}>
            {korean}
          </button>
        ) : null}

        {/* 항상 선택 가능 */}
        <button
          className="selectBtn"
          onClick={() => router.push("/large/select_menu")}
        >
          전체 목록에서 선택
        </button>
      </div>

      {/* CSS */}
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
  );
}
