"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Large_waste_result() {
    const router = useRouter();
  const params = useSearchParams();

  const item = params.get("item") || "대형 폐기물";
  const price = params.get("price") || "0";

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
        <div className="result-box">

          <p className="result-text">
            쓰레기 종류 : 대형 폐기물
          </p>

          <p className="result-text">
            분리수거 : <strong>{item}</strong>
          </p>

          <p className="result-text">
            가격 : <strong>{price}원</strong>
          </p>

          {/* 버튼 2개 */}
          <div className="result-btn-area">
            <button className="result-btn">다음 결제하기</button>
            <button className="result-btn">카드로 결제하기</button>
          </div>
        </div>

      </div>
    </div>
  );
}
