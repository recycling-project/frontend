"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

      // 모바일 업로드 방식
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
      console.log("3) base64 변환 시작");
      const formData = base64ToFormData(base64);
      console.log("4) formData:", formData);

      // FastAPI 호출
      const url = process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";
      console.log("📌 FastAPI URL:", url);

      console.log("5) FastAPI POST 요청 시작");

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      console.log("📌 FastAPI 응답 status:", res.status);

      const yoloResult = await res.json();
      console.log("📌 YOLO 결과:", yoloResult);

      router.push(
        "/large/yolo_result?data=" +
        encodeURIComponent(JSON.stringify(yoloResult)) +
        "&img=" + encodeURIComponent(base64)
      );
    }

    analyze();
  }, []);

  function base64ToFormData(base64: string) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";

    console.log("📌 MIME 타입:", mime);

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const ext = mime.split("/")[1] || "bin";

    console.log("📌 확장자:", ext);

    const file = new File([u8arr], `image.${ext}`, { type: mime });
    const form = new FormData();
    form.append("file", file);

    return form;
  }

  return (
    <div className="page-bg">
      <div className="kiosk">
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />
        <div className="loading-wrapper">
          <img src="/Loding.gif" className="loading-gif" />
        </div>
      </div>
    </div>
  );
}
