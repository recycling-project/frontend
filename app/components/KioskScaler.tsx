"use client";
import { useEffect } from "react";

const BASE_WIDTH = 900;
const BASE_HEIGHT = 1600;

export default function KioskScaler({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const resize = () => {
      const scale = Math.min(
        window.innerWidth / BASE_WIDTH,
        window.innerHeight / BASE_HEIGHT
      );

      const container = document.getElementById("kiosk-root");
      if (container) {
        container.style.transform = `scale(${scale})`;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
  <div className="kiosk-viewport">
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
