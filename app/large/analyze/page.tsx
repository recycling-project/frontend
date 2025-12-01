// 로딩 화면에서 넘어옴
// localStorage에 저장된 사진(base64)을 가져옴
// FastAPI(레이웨이 YOLO 서버)에 사진 전송 → 분석 결과 받음
// 결과를 /large/yolo_result 페이지로 이동하면서 전달함


"use client";

//  Next.js가 서버에서 미리 렌더링하지 못하게 막음 (로딩/카메라/스토리지 때문에 필요)
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LargeWasteAnalyze() {

    //  라우팅 이동용
    const router = useRouter();

    // URL 파라미터 읽기 (QR 업로드용으로 나중에 쓰일 수도 있음)
    const searchParams = useSearchParams();

    //  localStorage에 저장된 대형 폐기물 사진(Base64)
    const base64 =
        typeof window !== "undefined"
            ? localStorage.getItem("large_waste_image") // ← 촬영/업로드 시 저장해둔 key
            : null;

    //  페이지 로딩 시 YOLO 분석 자동 실행
    useEffect(() => {
        async function analyze() {
            // 사진이 없으면 분석 불가
            if (!base64) return;

            //  base64 -> FormData (FastAPI가 파일로 받기 때문에 변환 필요)
            const formData = base64ToFormData(base64);

            //  YOLO FastAPI 서버 URL (레이웨이 배포 후 환경변수 사용)
            const url = process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";

            // -------------------------------
            //  YOLO 서버로 사진 전송
            // -------------------------------
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            // YOLO 분석 결과(JSON)
            const data = await res.json();

            // -------------------------------
            //  분석 완료 → 결과 페이지로 이동
            // -------------------------------
            router.push(
                "/large/yolo_result?data=" +
                encodeURIComponent(JSON.stringify(data))
            );
        }

        analyze();
    }, []); // 첫 렌더링 때만 실행됨

    // --------------------------------------
    //  base64 → File 형태로 변환해서 FormData로 만들기
    // --------------------------------------
    function base64ToFormData(base64: string) {
        // base64에서 "data:image/png;base64," 부분 제거
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg"; // MIME 타입 (image/jpeg 등)
        const bstr = atob(arr[1]); // base64 디코딩 (문자열)

        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        // 문자열 → 바이트 배열 변환
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        // 실제 파일처럼 만들어주기
        const file = new File([u8arr], "image.jpg", { type: mime });

        // FormData에 file 추가
        const form = new FormData();
        form.append("file", file);

        return form;
    }

    // -------------------------------
    //  로딩 화면 UI
    // -------------------------------
    return (
        <div className="page-bg">
            <div className="kiosk">

                {/* 뒤로가기 버튼 */}
                <img
                    src="/back_icon.png"
                    alt="뒤로가기"
                    className="back-btn"
                    onClick={() => router.back()}
                />

                {/* 로딩 GIF */}
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
