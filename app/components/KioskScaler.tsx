
"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";



import { useEffect } from "react";

const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1920;

export default function KioskScaler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const resize = () => {
      const scale = Math.min(
        window.innerWidth / BASE_WIDTH,
        window.innerHeight / BASE_HEIGHT
      );
      const root = document.getElementById("kiosk-root");
      if (root) {
        root.style.transform = `scale(${scale})`;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      id="kiosk-viewport"
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden",
      }}
    >
      <div
        id="kiosk-root"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}