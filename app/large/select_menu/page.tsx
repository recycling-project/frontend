"use client";

import { useRouter } from "next/navigation";

// 영어 → 한국어 매핑
const ENG_TO_KOR: Record<string, string> = {
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

export default function SelectMenuPage() {
  const router = useRouter();

  const handleSelect = (type: string) => {
    router.push(`/large/select_menu/options/${type}`)
  };

  return (
    <div className="container">
      <h2>대형 폐기물 종류 선택</h2>

      <div className="menuWrapper">
        {Object.entries(ENG_TO_KOR).map(([eng, kor]) => (
          <button
            key={eng}
            className="menuBtn"
            onClick={() => handleSelect(eng)}
          >
            {kor}
          </button>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }

        .menuWrapper {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }

        .menuBtn {
          width: 80%;
          max-width: 320px;
          padding: 16px;
          font-size: 20px;
          background: black;
          color: white;
          border: none;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
