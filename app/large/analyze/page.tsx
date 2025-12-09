"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/* ----------------------------------------------------------
   📌 실제 화면 + 로직 (이 부분은 변경 없음)
----------------------------------------------------------- */
function AnalyzeContent() {
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

      let finalBase64 = base64 ?? null;

      // 📌 모바일 업로드 → Spring 이미지 가져오기
      if (!finalBase64 && id) {
        console.log("📌 Spring에서 이미지 불러오는 중...");

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`
          );
          const data = await res.json();

          const serverBase64 = data?.image;

          if (!serverBase64) {
            alert("이미지가 없습니다.");
            return;
          }

          localStorage.setItem("large_waste_image", serverBase64);
          finalBase64 = serverBase64;

          console.log("📌 Spring base64 prefix:", serverBase64.substring(0, 40));
        } catch (err) {
          console.error("Spring 이미지 로드 실패:", err);
          alert("이미지를 불러오는 중 오류가 발생했습니다.");
          return;
        }
      }

      // 최종 base64 없으면 중단
      if (!finalBase64) {
        alert("이미지가 없습니다.");
        return;
      }

      // 📌 base64 → File 변환
      const form = base64ToFormData(finalBase64);

      // 📌 FastAPI 호출
      const url =
        process.env.NEXT_PUBLIC_FASTAPI_URL + "/predict/recycle_item";

      try {
        const res = await fetch(url, {
          method: "POST",
          body: form,
        });

        const yoloResult = await res.json();

        router.push(
          "/large/yolo_result?data=" +
            encodeURIComponent(JSON.stringify(yoloResult))
        );
      } catch (err) {
        console.error("FastAPI 요청 실패:", err);
        alert("분석 중 오류가 발생했습니다.");
      }
    }

    analyze();
  }, []);

  // --------------------------------------------------------
  // base64 → FormData 변환 함수
  // --------------------------------------------------------
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

  /* --------------------------------------------------------
     📌 ⚡ 여기서부터 "위 CSS UI" 로 그대로 교체 (로직 수정 없음)
  -------------------------------------------------------- */
  return (
    <div
      className="page"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(to bottom, #A0DDAB, #36A64A)",
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
      }}
    >
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        onClick={() => router.push("/menu")}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
        }}
      />

      {/* 로딩 GIF — 정중앙 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/Loding.gif"
          alt="로딩"
          style={{
            width: "260px",
            height: "260px",
          }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
   📌 Suspense로 감싸주는 외부 Wrapper (변경 X)
----------------------------------------------------------- */
export default function Page() {
  return (
    <Suspense fallback={null}>
      <AnalyzeContent />
    </Suspense>
  );
}
