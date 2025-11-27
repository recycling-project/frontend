"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import KeyboardModal from "@/app/components/KeyboardModal";

export default function TestKeyboard() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // ✅ 키보드 높이 자동 감지
  useEffect(() => {
    const handleResize = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;

      const diff = window.innerHeight - viewport.height;

      if (diff > 150) {
        setKeyboardOffset(diff);
      } else {
        setKeyboardOffset(0);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

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

      {/* 분석 결과 박스 */}
      <div className="chat-box">
        <div className="chat-placeholder">
          여기에 분석 결과가 표시됩니다
        </div>
      </div>

      {/* ✅ 입력칸 (이것만 움직임) */}
      <div
        className="ask-container"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "8dvh",
          transform: showKeyboard
            ? `translate(-50%, -${keyboardOffset + 180}px)`
            : "translate(-50%, 0)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
          zIndex: 120,
        }}
      >
        <input
          readOnly
          className="questiontext-input"
          value={text}
          placeholder="텍스트로 질문하기"
          onClick={() => setShowKeyboard(true)}
        />
      </div>

      {/* ✅ 질문 버튼 - 절대 고정 */}
      <button
        className="ask-btn"
        disabled={!text}
        style={{
          position: "fixed",
          bottom: "4dvh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
        onClick={() =>
          router.push(
            "/general_waste/analyze?text=" + encodeURIComponent(text)
          )
        }
      >
        질문하기
      </button>

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
``
