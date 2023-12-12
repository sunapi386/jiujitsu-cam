import React from "react";
import { SideDrawer } from "@/components/sideDrawer";
import { ContentInterview } from "@/components/contentInterview";
import { worldLandmarks, landmarksData } from "@/data/landmarks";
import dynamic from "next/dynamic";

// import WebGLCanvasPlot from "@/components/plotter";
const WebGLCanvasPlot = dynamic(() => import("../components/plotter"), {
  ssr: false,
});

const Demo: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideDrawer />
      <div className="flex-1 p-6">
        {/* <ContentInterview /> */}
        <WebGLCanvasPlot
          title="World Landmarks Plot"
          landmarks={worldLandmarks}
        />
        <WebGLCanvasPlot title="Landmarks Plot" landmarks={landmarksData} />
        {/* <section ref={demosSectionRef} className="invisible">
        <video ref={videoRef} controls autoPlay playsInline muted loop />
        <canvas ref={canvasElementRef} />
        {!webcamRunning ? (
          <button onClick={startWebcam}>Start Webcam</button>
        ) : (
          <button onClick={stopWebcam}>Stop Webcam</button>
        )}
      </section> */}
      </div>
    </div>
  );
};

export default Demo;
