"use client";

//  Next.js가 서버에서 미리 렌더링하지 못하게 함
//  (localStorage / 카메라 / 브라우저 API 때문에 CSR 강제 필요)
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LargeWasteAnalyze() {

    // 📌 페이지 이동용
    const router = useRouter();

    // 📌 URL 쿼리 읽기(id 등) — 지금은 필요 없지만 구조 유지
    const searchParams = useSearchParams();

    // ----------------------------------------------------------
    // 📌 키오스크가 저장해둔 대형 폐기물 base64 이미지 불러오기
    //     (QR 업로드 → /large/check → /large/wait → 여기)
    // ----------------------------------------------------------
    const base64 =
        typeof window !== "undefined"
            ? localStorage.getItem("large_waste_image") // ← 키오스크에서 저장된 key
            : null;

    // ----------------------------------------------------------
    // 📌 페이지 로딩되면 자동으로 YOLO FastAPI 서버에 분석 요청 시작
    // ----------------------------------------------------------
    useEffect(() => {
        async function analyze() {

            // 사진 없으면 분석 불가능 → 바로 종료
            if (!base64) return;

            // base64 → File → FormData 로 변환 (FastAPI가 파일 형식으로 받음)
            const formData = base64ToFormData(base64);

            // 📌 HuggingFace FastAPI YOLO 서버 주소
            const url = process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";
            console.log("YOLO URL >>>", url);  //실제 호출되는  URL확인
            // --------------------------------------
            // 📌 YOLO 서버로 이미지 업로드 & 분석 실행
            // --------------------------------------
            const res = await fetch(url, {
                method: "POST",
                body: formData,       // form-data(file) 형식
            });

            // 📌 YOLO의 분석 결과(JSON)
            const data = await res.json();

            // --------------------------------------
            // 📌 분석 결과를 yolo_result 페이지로 넘기기
            //     JSON → 문자열 → URL 인코딩 후 전달
            // --------------------------------------
            router.push(
                "/large/yolo_result?data=" +
                encodeURIComponent(JSON.stringify(data))
            );
        }

        analyze();
    }, []); // 최초 1번만 실행

    // ----------------------------------------------------------
    // 📌 base64 → FormData(file) 변환 함수
    // ----------------------------------------------------------
    function base64ToFormData(base64: string) {
        // "data:image/png;base64,..." 제거
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
        const bstr = atob(arr[1]); // base64 → 바이너리 문자열

        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        // 문자열 → byte 배열 변환
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        // File 객체 생성
        const file = new File([u8arr], "image.jpg", { type: mime });

        // FormData 생성해서 파일 추가
        const form = new FormData();
        form.append("file", file);

        return form;
    }

    // ----------------------------------------------------------
    // 📌 분석 중일 때 보여주는 로딩 화면
    // ----------------------------------------------------------
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

                {/* 로딩 GIF (이미지 분석 대기 중) */}
                <div className="loading-wrapper">
                    <img
                        src="/Loding.gif"
                        alt="로딩 중"
                        className="loading-gif"
                    />
                </div>

            </div>
        </div>
    );
}
