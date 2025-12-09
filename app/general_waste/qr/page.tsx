"use client";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

export default function QRPage() {
  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/general_waste/mobile_upload";

  const router = useRouter();

  //  업로드되면 자동으로 wait 페이지로 이동

  useEffect(() => {
    // QR 페이지 처음 들어오면 이전 기록 초기화
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/reset`, {
      method: "POST",
    });

    // 이후 업로드 감지 시작
    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/check`);
      const data = await res.json();

      if (data.id) {
        clearInterval(timer);
        router.push("/general_waste/wait");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="page"
      style={{
        background: "#ffffff", // ⭐ 흰색 배경
        width: "1080px",   // 캔버스 크기
        height: "1920px",  // 캔버스 크기
        overflow: "hidden",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#36A64A",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>

        {/* 🔙 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: "60px",
            left: "40px",
            width: "90px",
            height: "90px",
            cursor: "pointer",
            zIndex: 1000,
            // filter: "invert(100%)", // 아이콘이 흰색 없던 문제 해결용
          }}
        />
<div
  className="qr-wrapper"
  style={{
    position: "absolute",
    top: "0px",  // ← QR코드 위치도 같이 더 아래로
    left: "50%",
    transform: "translateX(-50%)",
  }}
>
  <QRCodeCanvas value={uploadUrl} size={260} />
</div>

<p
  className="qr-guide"
  style={{
    position: "absolute",
    top: "1100px",  // ← 안내문도 QR코드 아래로 이동
    width: "100%",
    textAlign: "center",
    fontSize: "40px",
    color: "#444",
  }}
>
  QR을 휴대폰으로 스캔하세요
</p>


      </div>
  
  );
}