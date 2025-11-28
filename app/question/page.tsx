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
     {/* 상단 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.push("/")}
        />

      

      {/* ✅ 입력칸 (이것만 움직임) */}
      <div
        className="ask-container"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "50dvh",
          transform: showKeyboard
            ? `translate(-50%, -${keyboardOffset + 50}px)`
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
    bottom: "25dvh",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  }}
  onClick={async () => {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),   // ✅ 서버로 질문 보내기
      });

      const result = await res.json();

      router.push(
        `/question_answer?data=${encodeURIComponent(
          JSON.stringify(result)
        )}`
      );
    } catch (err) {
      console.error("분석 요청 실패:", err);
      alert("분석 처리 중 오류가 발생했습니다.");
    }
  }}
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
