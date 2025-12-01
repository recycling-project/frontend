"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LargeWasteAnalyze() {
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id"); // 모바일 업로드 시 전달되는 값
  let base64 =
    typeof window !== "undefined"
      ? localStorage.getItem("large_waste_image") // 카메라 촬영 시 저장됨
      : null;

  useEffect(() => {
    async function analyze() {
      // ★ 모바일 업로드 방식이면 Spring에서 image 불러오기
      if (!base64 && id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`
          );

          const data = await res.json();
          base64 = data.image; // 스프링 저장소에서 가져온 base64
          console.log("모바일 업로드 base64 불러옴:", base64);
        } catch (e) {
          console.error("이미지 불러오기 실패:", e);
          return;
        }
      }

      // base64 자체가 없다면 분석 불가능
      if (!base64) {
        alert("이미지가 없습니다.");
        return;
      }

      // base64 → formData로 변환
      const formData = base64ToFormData(base64);

      // YOLO FastAPI 주소
      const url =
        process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const yoloResult = await res.json();

      // 결과 페이지로 이동
      router.push(
        "/large/yolo_result?data=" +
          encodeURIComponent(JSON.stringify(yoloResult))
      );
    }

    analyze();
  }, []);

  function base64ToFormData(base64: string) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], "image.jpg", { type: mime });
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
