"use client";

import { useRef, useState } from "react";

export default function TestCameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [filePhoto, setFilePhoto] = useState<string | null>(null);

  // 카메라 켜기
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // 사진 찍기
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
  };

  // 파일 첨부하기
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFilePhoto(reader.result as string); // base64
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>카메라 + 파일첨부 테스트페이지</h1>

      {/* 카메라 영역 */}
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "300px", border: "1px solid #ccc" }}
      />

      <br />
      <button onClick={startCamera}>카메라 켜기</button>
      <button onClick={takePhoto}>사진 찍기</button>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {photo && (
        <div>
          <h3>카메라로 찍은 사진</h3>
          <img src={photo} style={{ width: "300px" }} />
        </div>
      )}

      <hr />

      {/* 파일 첨부 테스트 */}
      <h2>파일 첨부 테스트</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {filePhoto && (
        <div>
          <h3>첨부한 사진 미리보기</h3>
          <img src={filePhoto} style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
}
