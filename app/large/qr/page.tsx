"use client";

import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";
import KioskScaler from "@/app/components/KioskScaler";

export default function LargeQRPage() {
  // 📌 1) QR 코드로 찍었을 때 이동할 모바일 업로드 페이지 주소
  // (휴대폰에서 이 주소로 접속해서 사진 업로드함)
  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/large/mobile-upload";

  const router = useRouter();

  useEffect(() => {
    // 📌 2) 키오스크 화면이 열리면 가장 먼저 Spring에 "초기화 요청" 보냄
    // → Spring이 /trash/large/reset 호출됨 
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/reset`, {
      method: "POST",
    });

    // 📌 3) 1초마다 Spring 서버에 "업로드 되었는지" 확인
    // → /recycle/check 를 Spring이 감지해 TRUE 하면 다음 화면 이동
    const timer = setInterval(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/large/check`
      );
      const data = await res.json();

      // 📌 4) upload-mobile에서 사진 업로드가 완료되면
      // Spring에서 id 값을 저장하고, 여기로 id가 돌아옴
      if (data.id) {
        clearInterval(timer);
        // 📌 5) 업로드되면 대기화면(/large/wait) 페이지로 이동
        router.push("/large/wait");
      }
    }, 1000); // ← 1초마다 반복

    // 📌 6) 컴포넌트 닫힐 때 타이머 중단
    return () => clearInterval(timer);
  }, []);

  return (
    <KioskScaler>
      <div
        className="page"
        style={{
          background: "#ffffff",
          width: "1080px",
          height: "1920px",
          overflow: "hidden",
          position: "absolute",
          left: "50%",
          top: "0",
          transform: "translateX(-50%)",
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
    </KioskScaler>
  );
}
