"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import KeyboardModal from "@/app/components/KeyboardModal";

export default function TestKeyboard() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100dvh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 50,
          height: 50,
          zIndex: 20,
        }}
      />

      {/* 상단 분석 결과 박스 */}
      <div className="chat-box">
        <div className="chat-placeholder">
          여기에 분석 결과가 표시됩니다
        </div>
      </div>

      {/* ✅ 입력 + 버튼 묶음 영역 */}
      <div className={`question-area ${showKeyboard ? "up" : ""}`}>
        <input
          readOnly
          className="questiontext-input"
          value={text}
          placeholder="텍스트로 질문하기"
          onClick={() => setShowKeyboard(true)}
        />

        <button
          className="ask-btn"
          disabled={!text}
          onClick={() =>
            router.push(
              "/general_waste/analyze?text=" + encodeURIComponent(text)
            )
          }
        >
          질문하기
        </button>
      </div>

      {/* 키보드 */}
      {showKeyboard && (
        <KeyboardModal
          value={text}
          onChange={setText}
          onClose={() => setShowKeyboard(false)}
        />
      )}
    </div>
  );
}
