"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import KioskScaler from "@/app/components/KioskScaler";

export default function LargeWasteAnalyze() {
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id");
  let base64 =
    typeof window !== "undefined"
      ? localStorage.getItem("large_waste_image")
      : null;

  useEffect(() => {
    async function analyze() {
      console.log("1) 초기 base64:", base64);
      console.log("2) id:", id);

      // 모바일 업로드
      if (!base64 && id) {
        console.log("📌 Spring에서 이미지 불러오는 중...");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`
        );

        const data = await res.json();
        base64 = data.image;

        localStorage.setItem("large_waste_image", String(base64));

        console.log("📌 Spring base64 prefix:", base64?.substring(0, 40));
      }

      if (!base64) {
        alert("이미지가 없습니다.");
        return;
      }

      // base64 → 파일 변환
      const formData = base64ToFormData(base64);

      // FastAPI 호출
      const url =
        process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const yoloResult = await res.json();
      console.log("📌 YOLO 결과:", yoloResult);

      // 페이지 이동
      setTimeout(() => {
        router.push(
          `/large/yolo_result?data=${encodeURIComponent(
            JSON.stringify(yoloResult)
          )}`
        );
      }, 50);
    }

    analyze();
  }, []);

  function base64ToFormData(base64: string) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    const ext = mime.split("/")[1] || "bin";
    const file = new File([u8arr], `image.${ext}`, { type: mime });

    const form = new FormData();
    form.append("file", file);

    return form;
  }

  return (
    <KioskScaler>
      <div
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
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
            top: "60px",
            left: "40px",
            width: "90px",
            height: "90px",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* 로딩 GIF */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/Loding.gif"
            alt="loading"
            style={{ width: "260px", height: "260px" }}
          />
        </div>
      </div>
    </KioskScaler>
  );
}
