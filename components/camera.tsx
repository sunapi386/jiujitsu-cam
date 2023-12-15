import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import {
  PoseLandmarker,
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { Switch } from "@headlessui/react";
// https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js#video

import { translateGestureToEmoji } from "@/utils/gestures";
import WebGLCanvasPlot, { Point3D } from "./plotter";

interface CameraBoxProps {
  link: string;
}

export default function CameraBox({ link }: CameraBoxProps) {
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastVideoTime = useRef(-1);
  const [mirror, setMirror] = useState(false);
  const [stopCamera, setStopCamera] = useState(false);
  const [gestureEnabled, setGestureEnabled] = useState(false);
  const [landmarks, setLandmarks] = useState<Point3D[]>([]);

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
  const gestureRecognizer = useRef<GestureRecognizer | null>(null);
  const [poseLandmarkerLoaded, setPoseLandmarkerLoaded] = useState(false);
  const [gestureRecognizerLoaded, setGestureRecognizerLoaded] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);

  const [processingTime, setProcessingTime] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  // Before we can use PoseLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.
  const isActive = useRef(true);

  useEffect(() => {
    async function getDevices() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("MediaDevices or enumerateDevices is not supported");
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraDevices(videoDevices);
        if (videoDevices.length) setSelectedCamera(videoDevices[0].deviceId);
      } catch (error) {
        console.error("Error getting devices:", error);
      }
    }

    getDevices();
  }, []);

  const realTimeInference = useCallback(async () => {
    console.log("Detecting...");
    const canvasCtx = canvasRef.current!.getContext("2d")!;

    const processFrame = () => {
      // Now let's start detecting the stream.
      let startTimeMs = performance.now();
      const drawingUtils = new DrawingUtils(canvasCtx);
      if (webcamRef.current?.video?.currentTime === undefined) return;

      lastVideoTime.current = webcamRef.current!.video?.currentTime!;

      poseLandmarker.current!.detectForVideo(
        webcamRef.current!.video!,
        startTimeMs,
        (result) => {
          canvasCtx.save(); // Saving the current state of the canvas

          // Setting up the transformation for mirroring
          if (mirror) {
            canvasCtx.scale(-1, 1); // This mirrors the content
            canvasCtx.translate(-canvasRef.current!.width, 0); // This offsets the mirrored result back into view
          }
          // Clearing the entire canvas
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

          setLandmarks(result.landmarks[0]);

          canvasCtx.restore(); // Restoring the original state of the canvas, which undoes the mirroring transformation
        }
      );

      if (gestureEnabled) {
        const gestureRecognitionResult =
          gestureRecognizer.current!.recognizeForVideo(
            webcamRef.current!.video!,
            startTimeMs
          );

        // View results in the console to see their format
        if (gestureRecognitionResult.gestures.length > 0) {
          const categoryName =
            gestureRecognitionResult.gestures[0][0].categoryName;
          const categoryScore = parseFloat(
            (gestureRecognitionResult.gestures[0][0].score * 100).toString()
          ).toFixed(2);
          const handedness =
            gestureRecognitionResult.handedness[0][0].displayName;

          const summary = `Gesture: ${translateGestureToEmoji(
            categoryName
          )}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
          setDetectedGesture(summary);
        } else {
          setDetectedGesture(null);
        }
      }

      setProcessingTime(performance.now() - startTimeMs);

      // Check the active flag and recursively request the next animation frame
      if (isActive.current) {
        requestAnimationFrame(processFrame);
      }
    };

    // Start the loop
    processFrame();
  }, [mirror, gestureEnabled]);

  useEffect(() => {
    const setupInference = async () => {
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
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        outputSegmentationMasks: false, // We don't need segmentation masks yet
      });
      poseLandmarker.current = poseLandmarker1;

      setPoseLandmarkerLoaded(true);

      const gestureRecognizer1 = await GestureRecognizer.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: `/models/gesture_recognizer.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
        }
      );
      gestureRecognizer.current = gestureRecognizer1;

      setGestureRecognizerLoaded(true);
    };

    setupInference();
  }, []);

  useEffect(() => {
    if (
      !cameraLoaded ||
      lastVideoTime.current == webcamRef.current?.video!.currentTime ||
      !poseLandmarkerLoaded ||
      !gestureRecognizerLoaded
    ) {
      return;
    }
    isActive.current = true;

    realTimeInference();

    // Cleanup: Set active flag to false when component unmounts
    return () => {
      isActive.current = false;
    };
  }, [
    cameraLoaded,
    gestureRecognizerLoaded,
    poseLandmarkerLoaded,
    realTimeInference,
  ]);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const videoConstraints = isDesktop
    ? { width: 1280, height: 720, facingMode: facingMode }
    : { width: 480, height: 640, facingMode: facingMode };

  const handleUserMedia = () => {
    setRecordingPermission(true);
    console.log("User media loaded.");
    setTimeout(() => {
      setLoading(false);
      setCameraLoaded(true);
      console.log("Camera loaded.");
    }, 500);
  };

  useEffect(() => {
    if (stopCamera) {
      webcamRef.current!.video!.pause();
    } else {
      webcamRef.current!.video!.play();
    }
  }, [stopCamera]);

  return (
    <AnimatePresence>
      <div className="w-full min-h-full flex flex-col px-2 pt-1 pb-4 md:px-4 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
        <div className="h-full w-full items-center flex flex-col mt-[5vh]">
          {recordingPermission ? (
            <div className="w-full flex flex-col max-w-screen-xl mx-auto justify-center">
              <div className="flex flex-row space-x-1 mt-4 items-center">
                <Switch
                  checked={gestureEnabled}
                  onChange={setGestureEnabled}
                  className={`${
                    gestureEnabled ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      gestureEnabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                  Gesture detect
                </p>
                <Switch
                  checked={mirror}
                  onChange={setMirror}
                  className={`${
                    mirror ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      mirror ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                  Mirror video
                </p>
                <Switch
                  checked={stopCamera}
                  onChange={setStopCamera}
                  className={`${
                    stopCamera ? "bg-red-600" : "bg-red-100"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      stopCamera ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                  Pause video for {link}
                </p>
                {cameraDevices.length > 1 && (
                  <div>
                    <select
                      value={selectedCamera || undefined}
                      onChange={(e) => setSelectedCamera(e.target.value)}
                    >
                      {cameraDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${device.deviceId}`}
                        </option>
                      ))}
                    </select>

                    <Switch
                      onChange={() => {
                        setFacingMode(
                          facingMode === "user" ? "environment" : "user"
                        );
                      }}
                      checked={facingMode === "environment"}
                      className={`${
                        facingMode === "environment"
                          ? "bg-green-600"
                          : "bg-green-100"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          facingMode === "environment"
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                      Rear camera
                    </p>
                  </div>
                )}
              </div>
              <div className="relative aspect-[16/9] w-full max-w-screen-xl overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md">
                {!cameraLoaded && (
                  // Camera is loading...
                  <div className="text-white absolute top-1/2 left-1/2  flex items-center">
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
                <div className="relative h-full w-full rounded-lg">
                  {/* CLOCK timer section */}
                  <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                      {new Date(seconds * 1000).toISOString().slice(14, 19)} sec
                    </span>
                  </div>
                  {isVisible && ( // If the video is visible (on screen) we show it
                    <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20">
                      <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl">
                        {/* Pose: TOP RIGHT, HAND GESTURE SECTION */}
                        inference: {processingTime.toFixed(0)} ms
                      </div>
                    </div>
                  )}
                  <div className="block absolute bottom-[10px] sm:bottom-[20px] lg:bottom-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20">
                    <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl">
                      {/* Pose: BOTTOM RIGHT SECTION */}
                      {detectedGesture}
                    </div>
                  </div>
                  <Webcam
                    mirrored={mirror}
                    audio
                    muted
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={() => {
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
                  {/* Canvas end */}
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
              </div>
              <div className="flex flex-row space-x-1 mt-4 items-center">
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
                  detection.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col max-w-screen-xl mx-auto justify-center">
              <div className="relative md:aspect-[16/9] w-full max-w-screen-xl overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center">
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                  Camera permission is denied. We don{`'`}t store your attempts
                  anywhere. Try again by opening this page in an incognito
                  window {`(`}or enable permissions in your browser settings
                  {`)`}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
