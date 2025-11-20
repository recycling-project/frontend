"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function WasteLoading() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const base64 =
        typeof window !== "undefined" ? localStorage.getItem("wasteImage") : null;  //사진모드
    const text = searchParams.get("text");  // 텍스트모드 

    //페이지 진입 즉시 분석 시작
    useEffect(() => {
        async function analyze() {
            let body;

            if (base64) {
                body = JSON.stringify({ image: base64 });   // 사진 모드
            } else if (text) {
                body = JSON.stringify({ text: text }); // 텍스트 질문 모드
            } else {
                return;
            }

            const res = await fetch("http://localhost:8080/recycle/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            const data = await res.json();

            router.push("/Waste/result?data=" + encodeURIComponent(JSON.stringify(data)));
        }

        analyze();
    }, [base64, text]);


    return (
        <div className="page-bg">
            <div className="kiosk">

                {/* 상단 뒤로가기 버튼 */}
                <img
                    src="/back_icon.png"
                    alt="뒤로가기"
                    className="back-btn"
                    onClick={() => router.back()}
                />

                {/* 로딩 움짤 */}
                <div className="loading-wrapper">
                    <img
                        src="/Loding.gif"
                        alt="로딩 움짤"
                        className="loading-gif"
                    />
                </div>

            </div>
        </div>
    );
}
