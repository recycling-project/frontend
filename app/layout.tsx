import "./globals.css";

export const metadata = {
  title: "순환마루 키오스크",
  description: "AI 분리수거 키오스크",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}