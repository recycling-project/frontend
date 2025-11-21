"use client";

import React, { useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function KeyboardModal({ value, onChange, onClose }: Props) {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [numMode, setNumMode] = useState(false);

  // 한글
  const ko = [
    ["ㅂ","ㅈ","ㄷ","ㄱ","ㅅ","ㅛ","ㅕ","ㅑ","ㅐ","ㅔ"],
    ["ㅁ","ㄴ","ㅇ","ㄹ","ㅎ","ㅗ","ㅓ","ㅏ","ㅣ"],
    ["Shift","ㅋ","ㅌ","ㅊ","ㅍ","ㅠ","ㅜ","ㅡ","Back"]
  ];

  // 영어
  const en = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Shift","Z","X","C","V","B","N","M","Back"]
  ];

  // 숫자/기호
  const num = [
    ["1","2","3","4","5","6","7","8","9","0"],
    ["-","/",":",";","(",")","₩","&","@","\""],
    ["#+=",".",",","?","!","'","Back"]
  ];

  const keys = numMode ? num : (lang === "ko" ? ko : en);

  const pressKey = (k: string) => {
    if (k === "Back") {
      onChange(value.slice(0,-1));
      return;
    }
    if (k === "Shift") return; 
    if (k === "#+=") {
      setNumMode(true);
      return;
    }
    onChange(value + k);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-end">

      {/* 닫기 */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="bg-white text-black px-6 py-3 text-2xl rounded-lg shadow"
        >
          닫기
        </button>
      </div>

      {/* 현재 입력 값 표시 */}
      <div className="text-center text-white text-3xl mb-4">
        {value}
      </div>

      {/* 키보드 영역 */}
      <div className="bg-gray-100 rounded-t-3xl px-6 py-6 shadow-2xl">

        {/* 키보드 버튼 */}
        {keys.map((row, idx) => (
          <div key={idx} className="flex justify-center gap-3 mb-4">
            {row.map((k) => (
              <button
                key={k}
                onClick={() => pressKey(k)}
                className={`
                  ${k === "Back" ? "w-32" : "w-16"} 
                  h-16 bg-white rounded-xl text-2xl shadow
                  active:bg-gray-200 flex items-center justify-center
                `}
              >
                {k}
              </button>
            ))}
          </div>
        ))}

        {/* 기능 버튼 라인 */}
        <div className="flex justify-center gap-3 mt-3">

          {/* 숫자전환 */}
          <button
            onClick={() => setNumMode(!numMode)}
            className="w-28 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            {numMode ? "ABC" : "123"}
          </button>

          {/* 한/영 */}
          <button
            onClick={() => { setLang(lang === "ko" ? "en" : "ko"); setNumMode(false); }}
            className="w-28 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            한/영
          </button>

          {/* 스페이스바 */}
          <button
            onClick={() => pressKey(" ")}
            className="flex-1 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            스페이스
          </button>

          {/* 엔터 */}
          <button
            className="w-32 h-16 bg-green-500 text-white rounded-xl text-2xl shadow active:bg-green-600"
            onClick={onClose}
          >
            완료
          </button>

        </div>

      </div>

    </div>
  );
}
