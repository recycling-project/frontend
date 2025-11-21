"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import KeyboardModal from "@/app/components/KeyboardModal";

export default function FirstScreen() {
  const router = useRouter();

  // 상태값
  const [textQuestion, setTextQuestion] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <div className="page-bg">
      <div className="kiosk">

        {/* 뒤로가기 */}
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <div className="general_waste">

          {/* ✅ 카메라 제거 대신 레이아웃 유지용 공간 */}
          <div className="camera-spacer"></div>

          {/* ✅ 채팅 영역 */}
          <div className="chat-area">
            {textQuestion ? (
              <div className="chat-bubble user">{textQuestion}</div>
            ) : (
              <div className="chat-placeholder">
                여기에 질문 내용이 표시됩니다.
              </div>
            )}
          </div>

          {/* ✅ 하단 입력 영역 */}
          <div className="bottom-button-area">

            <input
              type="text"
              placeholder="에러로 인해 키보드가 안 뜹니다"
              value={textQuestion}
              readOnly
              onClick={() => setShowKeyboard(true)}
              className="text-input"
            />

            <button
              className="ask-btn"
              onClick={() =>
                router.push(
                  "/general_waste/analyze?text=" +
                    encodeURIComponent(textQuestion)
                )
              }
              disabled={!textQuestion}
            >
              질문하기
            </button>

          </div>
        </div>
      </div>

      {/* ✅ 키보드는 항상 최상단 overlay로 */}
      {showKeyboard && (
        <KeyboardModal
          value={textQuestion}
          onChange={setTextQuestion}
          onClose={() => setShowKeyboard(false)}
        />
      )}
      
    </div>
  );
}
