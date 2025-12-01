"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Large_waste_details() {
  const router = useRouter();
  const params = useSearchParams();
  const selectedItem = params.get("item") || "대형 폐기물";

  const [widthSelect, setWidthSelect] = useState<"under" | "over" | null>(null);
  const [doorCount, setDoorCount] = useState(0);
  const [price, setPrice] = useState(0);

  const increase = () => doorCount < 10 && setDoorCount(doorCount + 1);
  const decrease = () => doorCount > 0 && setDoorCount(doorCount - 1);

  useEffect(() => {
    setPrice(Math.floor(Math.random() * (30000 - 10000)) + 10000);
  }, []);

  return (
    <div className="page-bg">
      <div className="kiosk">

        <img
          src="/back_icon.png"
          alt="뒤로가기"
          className="back-btn"
          onClick={() => router.back()}
        />

        <h1 className="detail-title">{selectedItem} 옵션 선택</h1>

        {/* 문짝 너비 */}
        <div className="option-box">
          <p className="option-title">문짝 너비</p>

          <div className="width-btn-box">
            <button
              className={`width-btn ${widthSelect === "under" ? "selected" : ""}`}
              onClick={() => setWidthSelect("under")}
            >
              90cm 이하
            </button>

            <button
              className={`width-btn ${widthSelect === "over" ? "selected" : ""}`}
              onClick={() => setWidthSelect("over")}
            >
              90cm 초과
            </button>
          </div>
        </div>

        {/* 문짝 개수 */}
        <div className="option-box count-box-wrapper">
          <p className="option-title">문짝 개수</p>

          <div className="count-box">
            <button className="count-arrow" onClick={decrease}>◀</button>
            <span className="count-number">{doorCount}</span>
            <button className="count-arrow" onClick={increase}>▶</button>
          </div>
        </div>

        {/* 결제 금액 */}
        <div className="option-box price-box">
          <p className="option-title">결제 금액</p>

          <div className="price-inner">
            <span className="price-amount">{price} 원</span>
            <div className="bottom-price-button">
            <button 
    className="pay-btn"
    onClick={() => router.push(`/Large_waste_result?item=${selectedItem}&price=${price}`)}>
            결제하기</button>
          </div>
        </div>
</div>
      </div>
    </div>
  );
}