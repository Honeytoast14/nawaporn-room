import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Tween, Easing } from "@tweenjs/tween.js";
import React, { useRef, useEffect, useState } from "react";

function CameraAnimation({ shouldAnimate }) {
  const positionCam = useRef([1, 5, 3]);
  const zoomValue = useRef(50); // Starting zoom
  const cameraRef = useRef();

  // Tween for camera position
  const positionTween = useRef(
    new Tween(positionCam.current)
      .to([4, 8, 1], 2000)
      .easing(Easing.Quadratic.Out)
  );

  // Tween for camera zoom
  const zoomTween = useRef(
    new Tween(zoomValue)
      .to({ current: 200 }, 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        if (cameraRef.current) {
          cameraRef.current.zoom = zoomValue.current;
          cameraRef.current.updateProjectionMatrix(); // Needed for zoom changes
        }
      })
  );

  useEffect(() => {
    if (shouldAnimate) {
      //   positionTween.current.start();
      zoomTween.current.start();
    }
  }, [shouldAnimate]);

  useFrame(() => {
    // positionTween.current.update();
    zoomTween.current.update();
    // if (cameraRef.current) {
    //   cameraRef.current.position.set(...positionCam.current);
    // }
  });

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      zoom={zoomValue.current}
      position={positionCam.current}
    />
  );
}

export default function TestCam() {
  const [animate, setAnimate] = useState(false);

  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <mesh position={[0, 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="green" />
        </mesh>
        <OrbitControls />
        <CameraAnimation shouldAnimate={animate} />
      </Canvas>
      <button onClick={() => setAnimate(true)}>Move Camera and Zoom</button>
    </>
  );
}
