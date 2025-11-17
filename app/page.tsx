"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToMenu = () => {
    router.push("/menu");
  };

  return (
    <div className="start-screen" onClick={goToMenu}>
      <div className="start-text">
        완벽한 분리수거가 깨끗한<br />세상을 만듭니다.
      </div>
      <div className="start-sub">
        화면을 터치하여<br />분리수거 시작
      </div>
    </div>
  );
}
