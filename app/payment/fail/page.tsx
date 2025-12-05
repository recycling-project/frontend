'use client';

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function FailPage() {
  const params = useSearchParams();

  return (
    <div>
      <h2>결제 실패</h2>
      <p>에러 코드: {params.get("code")}</p>
      <p>실패 이유: {params.get("message")}</p>
    </div>
  );
}
