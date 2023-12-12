import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface WebGLCanvasPlotProps {
  title: string;
  landmarks: Point3D[];
}

const LABELS = [
  "nose",
  "left eye (inner)",
  "left eye",
  "left eye (outer)",
  "right eye (inner)",
  "right eye",
  "right eye (outer)",
  "left ear",
  "right ear",
  "mouth (left)",
  "mouth (right)",
  "left shoulder",
  "right shoulder",
  "left elbow",
  "right elbow",
  "left wrist",
  "right wrist",
  "left pinky",
  "right pinky",
  "left index",
  "right index",
  "left thumb",
  "right thumb",
  "left hip",
  "right hip",
  "left knee",
  "right knee",
  "left ankle",
  "right ankle",
  "left heel",
  "right heel",
  "left foot index",
  "right foot index",
];

const WebGLCanvasPlot: React.FC<WebGLCanvasPlotProps> = ({
  title,
  landmarks,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // These references will persist for the life of the component
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, 1, 0.1, 1000));
  const rendererRef = useRef(
    new THREE.WebGLRenderer({ antialias: true, alpha: true })
  );
  const controlsRef = useRef<OrbitControls | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only set up these once
    if (!controlsRef.current) {
      rendererRef.current.setClearColor(0xffffff, 0); // set clear color to white with full transparency
      container.appendChild(rendererRef.current.domElement);

      controlsRef.current = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );

      // Add axes helper to the scene
      const axesHelper = new THREE.AxesHelper(3); // 3 units long for x, y, z
      sceneRef.current.add(axesHelper);

      cameraRef.current.position.set(0, 0, 5);
    }

    // Adjust canvas size and aspect ratio
    rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    cameraRef.current.aspect = container.clientWidth / container.clientHeight;
    cameraRef.current.updateProjectionMatrix();

    // Clear old landmarks/spheres
    spheresRef.current.forEach((sphere) => sceneRef.current.remove(sphere));
    spheresRef.current = [];

    // Plot landmarks
    if (landmarks) {
      landmarks.forEach((point) => {
        const geometry = new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(point.x * 2, point.y * 2, point.z * 2);
        sceneRef.current.add(sphere);
        spheresRef.current.push(sphere); // Save reference to remove later
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current!.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      // Dispose of spheres
      spheresRef.current.forEach((sphere) => {
        sphere.geometry.dispose();
      });
      spheresRef.current = [];
      // still has issues with
      // WARNING: Too many active WebGL contexts. Oldest context will be lost.
      // Dispose of WebGL renderer and context

      // Remove the canvas from the container
    };
  }, [landmarks]);

  return (
    <div>
      <h3>{title}</h3>
      <div ref={containerRef} style={{ width: "500px", height: "500px" }}></div>
    </div>
  );
};

export default WebGLCanvasPlot;
