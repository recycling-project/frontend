"use client";

import React, { useState } from "react";
import Hangul from "hangul-js";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function KeyboardModal({ value, onChange, onClose }: Props) {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [numMode, setNumMode] = useState(false);
  const [shift, setShift] = useState(false);

  // 자음/쌍자음 전환
  const koRow1 = shift
    ? ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅒ", "ㅖ"]
    : ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"];

  const koRow2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
  const koRow3 = ["Shift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "Back"];

  const ko = [koRow1, koRow2, koRow3];

  const en = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Shift","Z","X","C","V","B","N","M","Back"]
  ];

  const num = [
    ["1","2","3","4","5","6","7","8","9","0"],
    ["-","/",":",";","(",")","₩","&","@","\""],
    ["#+=",".",",","?","!","'","Back"]
  ];

  const keys = numMode ? num : (lang === "ko" ? ko : en);

  const applyHangul = (input: string) => {
    return Hangul.assemble(Hangul.disassemble(input));
  };

  const pressKey = (k: string) => {
    if (k === "Back") {
      const dis = Hangul.disassemble(value);
      dis.pop();
      onChange(Hangul.assemble(dis));
      return;
    }

    if (k === "Shift") {
      setShift(!shift);
      return;
    }

    if (k === "#+=") {
      setNumMode(true);
      return;
    }

    if (k === " ") {
      onChange(value + " ");
      return;
    }

    const newText = applyHangul(value + k);
    onChange(newText);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-end">

      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="bg-white text-black px-6 py-3 text-2xl rounded-lg shadow"
        >
          닫기
        </button>
      </div>

      <div className="text-center text-white text-3xl mb-4">
        {value}
      </div>

      <div className="bg-gray-100 rounded-t-3xl px-6 py-6 shadow-2xl">

        {keys.map((row, idx) => (
          <div key={idx} className="flex justify-center gap-3 mb-4">
            {row.map((k) => (
              <button
                key={k}
                onClick={() => pressKey(k)}
                className={`${k === "Back" ? "w-32" : "w-16"} 
                  h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200 
                  flex items-center justify-center`}
              >
                {k}
              </button>
            ))}
          </div>
        ))}

        <div className="flex justify-center gap-3 mt-3">

          <button
            onClick={() => setNumMode(!numMode)}
            className="w-28 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            {numMode ? "ABC" : "123"}
          </button>

          <button
            onClick={() => { 
              setLang(lang === "ko" ? "en" : "ko"); 
              setNumMode(false);
              setShift(false);
            }}
            className="w-28 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            한/영
          </button>

          <button
            onClick={() => pressKey(" ")}
            className="flex-1 h-16 bg-white rounded-xl text-2xl shadow active:bg-gray-200"
          >
            스페이스
          </button>

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
