// Copyright 2023 The MediaPipe Authors.

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Can't import directly here because Nextjs does SSR.
// import CameraBox from "@/components/camera";
// https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side

const Demo: React.FC = () => {
  const CameraBox = dynamic(() => import("@/components/camera"), {
    ssr: false,
  });

  return (
    <>
      <h1 className="text-4xl">
        Pose detection using the MediaPipe PoseLandmarker task
      </h1>
      <CameraBox />
      {/* <section ref={demosSectionRef} className="invisible">
        <video ref={videoRef} controls autoPlay playsInline muted loop />
        <canvas ref={canvasElementRef} />
        {!webcamRunning ? (
          <button onClick={startWebcam}>Start Webcam</button>
        ) : (
          <button onClick={stopWebcam}>Stop Webcam</button>
        )}
      </section> */}
    </>
  );
};

export default Demo;
