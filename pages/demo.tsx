// Copyright 2023 The MediaPipe Authors.

import React, { useEffect, useRef, useState } from 'react';

// Assuming you can import the required modules this way
// Modify if you have different paths or package management
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,

} from "@mediapipe/tasks-vision";

const Demo: React.FC = () => {
  const demosSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  
  const [poseLandmarker, setPoseLandmarker] = useState<any>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

    const initializePoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const pl = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 2
      });
      setPoseLandmarker(pl);
      demosSectionRef.current?.classList.remove("invisible");
    };

    initializePoseLandmarker();

  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
        setWebcamRunning(true);
        setStream(stream);
      } catch (error) {
        console.error("Error accessing the webcam:", error);
      }
    }
  };

  const stopWebcam = () => {
    const tracks = stream?.getTracks() || [];
    tracks.forEach(track => track.stop());
    setWebcamRunning(false);
  };

  return (
    <>
      <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" />

      <h1>Pose detection using the MediaPipe PoseLandmarker task</h1>

      <section ref={demosSectionRef} className="invisible">
        <video ref={videoRef} controls autoPlay playsInline muted loop />
        <canvas ref={canvasElementRef} />
        {!webcamRunning ? (
          <button onClick={startWebcam}>Start Webcam</button>
        ) : (
          <button onClick={stopWebcam}>Stop Webcam</button>
        )}
      </section>

      <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" async></script>
    </>
  );
}

export default Demo;
