"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useSearchParams } from "next/navigation";

export default function wasteResult() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  // URL 인코딩 해제 → JSON 문자열 → JS 객체
  const decoded = data ? decodeURIComponent(data) : null;
  const result = decoded ? JSON.parse(decoded) : null;

  // GPT 한국어 결과 부분만 추출
  const content = result?.choices?.[0]?.message?.content;

  return (
    <div className="page-bg">
      <div className="kiosk">
        <div
          style={{
            color: "white",
            marginTop: "200px",
            textAlign: "center",
            padding: "20px",
            fontSize: "20px",
          }}
        >
          {content ? (
            <>
              <h2>재활용 분석 결과</h2>

              {/* GPT 결과만 출력 */}
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                {content}
              </pre>
            </>
          ) : (
            <p>결과 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
