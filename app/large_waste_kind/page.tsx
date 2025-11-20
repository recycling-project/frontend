"use client";
import { useRouter } from "next/navigation";

export default function Large_waste_kind() {
  const router = useRouter();

const goDetails = (name: string) => {
    router.push(`/Large_waste_details?item=${name}`);
  };

return (
    <div className="page-bg">
      <div className="kiosk">
        
        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <p className="kind-text">
          대형 폐기물 종류를<br />
          선택해주세요.
        </p>

        <div className="kind-wrapper">
          <button className="kind-btn" onClick={() => goDetails("장롱")}>장롱</button>
          <button className="kind-btn" onClick={() => goDetails("책상")}>책상</button>
          <button className="kind-btn" onClick={() => goDetails("서랍장")}>서랍장</button>
        </div>

      </div>
    </div>
  );
}