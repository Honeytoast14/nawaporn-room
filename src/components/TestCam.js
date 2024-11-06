import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";

const TestCam = () => {
  const [zoomed, setZoomed] = useState(false);
  const cameraRef = useRef();

  // Function to handle zoom and camera position transition using TWEEN
  const toggleZoom = () => {
    const camera = cameraRef.current;

    // Define the starting and ending camera positions and FOV (field of view)
    const startPosition = camera.position.clone();
    const endPosition = zoomed
      ? new THREE.Vector3(0, 0, 5)
      : new THREE.Vector3(0, 0, 2);
    const startFov = camera.fov;
    const endFov = zoomed ? 75 : 30;

    // Create a new TWEEN for camera position and FOV change
    new TWEEN.Tween(startPosition)
      .to(endPosition, 1000) // Duration of the animation in ms
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.copy(startPosition);
      })
      .start();

    new TWEEN.Tween({ fov: startFov })
      .to({ fov: endFov }, 1000) // Duration of the animation in ms
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ fov }) => {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      })
      .start();

    // Toggle the zoomed state
    setZoomed(!zoomed);
  };

  // Use the frame hook to update TWEEN
  useFrame(() => {
    TWEEN.update();
  });

  return (
    <>
      <Canvas>
        {/* Camera with ref */}
        <perspectiveCamera
          ref={cameraRef}
          position={[0, 0, 5]}
          fov={75} // Initial FOV
          near={0.1}
          far={1000}
        />

        {/* Box */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </Canvas>

      {/* Button to trigger zoom */}
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px",
          backgroundColor: "lightblue",
          border: "none",
          cursor: "pointer",
        }}
        onClick={toggleZoom}
      >
        Zoom
      </button>
    </>
  );
};

export default TestCam;
