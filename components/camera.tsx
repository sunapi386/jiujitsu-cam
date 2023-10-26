import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
// https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js#video

export default function CameraBox() {
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastVideoTime = useRef(-1);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(50);
  const [videoEnded, setVideoEnded] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(true);
  const [cameraLoaded, setCameraLoaded] = useState(false);
  //   const vidRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const poseLandmarker = useRef<PoseLandmarker | null>(null);
  let runningMode = "IMAGE";
  let enableWebcamButton: HTMLButtonElement;
  const videoHeight = "360px";
  const videoWidth = "480px";
  const hasGetUserMedia = !!navigator.mediaDevices?.getUserMedia;
  const [predictionsEnabled, setPredictionsEnabled] = useState(false);
  const [poseLandmarkerLoaded, setPoseLandmarkerLoaded] = useState(false);

  // Before we can use PoseLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.
  const isActive = useRef(true);

  const detectPoseInRealTime = useCallback(async () => {
    console.log("Detecting...");
    const canvasCtx = canvasRef.current!.getContext("2d")!;

    const processFrame = () => {
      // Now let's start detecting the stream.
      let startTimeMs = performance.now();
      const drawingUtils = new DrawingUtils(canvasCtx);
      lastVideoTime.current = webcamRef.current!.video?.currentTime!;
      poseLandmarker.current!.detectForVideo(
        webcamRef.current!.video!,
        startTimeMs,
        (result) => {
          canvasCtx.save();
          canvasCtx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          for (const landmark of result.landmarks) {
            drawingUtils.drawLandmarks(landmark, {
              radius: (data) =>
                DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
            });
            drawingUtils.drawConnectors(
              landmark,
              PoseLandmarker.POSE_CONNECTIONS
            );
          }
          canvasCtx.restore();
        }
      );
      // Check the active flag and recursively request the next animation frame
      if (isActive.current) {
        requestAnimationFrame(processFrame);
      }
    };

    // Start the loop
    processFrame();
  }, [canvasRef, webcamRef, lastVideoTime, poseLandmarker]);

  useEffect(() => {
    const createPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const poseLandmarker1 = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `/models/pose_landmarker_lite.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 2,
      });
      poseLandmarker.current = poseLandmarker1;

      console.log("Loaded PoseLandmarker...", poseLandmarker.current);
      setPoseLandmarkerLoaded(true);
    };

    createPoseLandmarker();
  }, []);

  useEffect(() => {
    if (
      !cameraLoaded ||
      !poseLandmarker.current ||
      !canvasRef.current ||
      !webcamRef.current ||
      lastVideoTime.current == webcamRef.current?.video!.currentTime
    ) {
      console.log("Not ready to detect...");
      console.log(
        "cameraLoaded:",
        cameraLoaded,
        "poseLandmarker:",
        poseLandmarker.current,
        "canvasRef:",
        canvasRef.current,
        "webcamRef:",
        webcamRef.current,
        "lastVideoTime:",
        lastVideoTime.current
      );
      return;
    }
    isActive.current = true;

    detectPoseInRealTime();

    // Cleanup: Set active flag to false when component unmounts
    return () => {
      isActive.current = false;
    };
  }, [
    cameraLoaded,
    poseLandmarkerLoaded,
    canvasRef,
    webcamRef,
    detectPoseInRealTime,
  ]);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const videoConstraints = isDesktop
    ? { width: 1280, height: 720, facingMode: "user" }
    : { width: 480, height: 640, facingMode: "user" };

  const handleUserMedia = () => {
    setRecordingPermission(true);
    console.log("User media loaded.");
    setTimeout(() => {
      setLoading(false);
      setCameraLoaded(true);
      console.log("camera loaded");
    }, 1000);
  };
  return (
    <AnimatePresence>
      <div className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
        <div className="h-full w-full items-center flex flex-col mt-[10vh]">
          {recordingPermission ? (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2"></h2>
              <span className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal mb-4">
                Camera
              </span>
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.075, 0.82, 0.965, 1],
                }}
                className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
              >
                {!cameraLoaded && (
                  // Camera is loading...
                  <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                    <svg
                      className="animate-spin h-4 w-4 text-white mx-auto my-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={3}
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                <div className="relative z-10 h-full w-full rounded-lg">
                  {/* CLOCK timer section */}
                  {/* <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                      {new Date(seconds * 1000).toISOString().slice(14, 19)} sec
                    </span>
                  </div> */}
                  {isVisible && ( // If the video is visible (on screen) we show it
                    <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20">
                      <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl">
                        {/* Pose: RIGHT HAND SECTION */}
                      </div>
                    </div>
                  )}
                  <Webcam
                    audio
                    muted
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={(error) => {
                      setRecordingPermission(false);
                    }}
                    className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
                  />
                  <canvas
                    className="output_canvas"
                    ref={canvasRef}
                    width="1280"
                    height="720"
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "100%",
                      height: "100%",
                      zIndex: 10,
                    }}
                  ></canvas>
                </div>
                {loading && (
                  <div className="absolute flex h-full w-full items-center justify-center">
                    <div className="relative h-[112px] w-[112px] rounded-lg object-cover text-[2rem]">
                      <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[0.5rem] bg-[#4171d8] !text-white">
                        Loading...
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.15,
                  ease: [0.23, 1, 0.82, 1],
                }}
                className="flex flex-row space-x-1 mt-4 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-[#407BBF]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                  Video is not stored on our servers, it is solely used for
                  transcription.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.075, 0.82, 0.165, 1],
                }}
                className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
              >
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                  Camera permission is denied. We don{`'`}t store your attempts
                  anywhere, but we understand not wanting to give us access to
                  your camera. Try again by opening this page in an incognito
                  window {`(`}or enable permissions in your browser settings
                  {`)`}.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
