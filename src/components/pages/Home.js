import React, { useRef, useEffect, useState } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import TWEEN, { Easing, Tween } from "@tweenjs/tween.js";
import * as THREE from "three";

function Model({ path }) {
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);
  return <primitive object={gltf.scene} position={[0, 0, 0]} ref={modelRef} />;
}

function SunLight() {
  const lightRef = useRef();
  return (
    <directionalLight
      ref={lightRef}
      position={[1.5, 6, 3]}
      castShadow
      intensity={3}
      shadow-mapSize={[1024, 1024]}
      shadow-camera-far={20}
      shadow-normalBias={0.02}
    />
  );
}

function AnotherLight() {
  const lightRef = useRef();
  return (
    <hemisphereLight
      ref={lightRef}
      position={[0, 5, 0]}
      color={"#fff4c7"}
      groundColor={new THREE.Color("#ff77af")}
      intensity={0.6}
    />
  );
}

function FollowMouse({ isTransitioning }) {
  const [mouse, setMouse] = useState({ x: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const x = (event.clientX - windowHalfX) / windowHalfX;
      setMouse({ x });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    const camera = state.camera;

    // Only update camera position if not transitioning
    if (!isTransitioning) {
      camera.position.x += (5.5 + mouse.x * 0.2 - camera.position.x) * 0.5;
    }

    camera.lookAt(0, 0, 0);
  });
}

function SetCamera({ nameOfPage }) {
  const cameraRef = useRef();
  const zoomValue = useRef(200);
  const positionValue = useRef([5.5, 5, 5]);

  const zoomTween = useRef(
    new Tween(zoomValue).easing(Easing.Quadratic.Out).onUpdate(() => {
      if (cameraRef.current) {
        cameraRef.current.zoom = zoomValue.current;
        cameraRef.current.updateProjectionMatrix();
      }
    })
  );

  const positionTween = useRef(
    new Tween(positionValue).easing(Easing.Quadratic.Out).onUpdate(() => {
      if (cameraRef.current) {
        cameraRef.current.position.set(
          positionValue.current[0],
          positionValue.current[1],
          positionValue.current[2]
        );
      }
    })
  );

  useEffect(() => {
    let targetZoom = 200; // Default zoom value for Home
    let targetPosition = [5.5, 5, 5]; // Default position for Home

    // Determine the target zoom and position based on the current page
    if (nameOfPage === "Work") {
      targetZoom = 900;
      targetPosition = [13, 5, 6]; // Desired position for Work
    } else if (nameOfPage === "About") {
      targetZoom = 300;
      targetPosition = [0, 3, 5]; // Desired position for About
    } else if (nameOfPage === "Contact") {
      targetZoom = 650;
      targetPosition = [3, 1, 4]; // Desired position for Contact
    } else if (nameOfPage === "Home") {
      targetZoom = 200; // Zoom out to default value
      targetPosition = [5.5, 5, 5]; // Return to Home position
    }

    // Stop the zoom tween if it's already running
    if (zoomTween.current.isPlaying()) {
      zoomTween.current.stop();
    }

    // Stop the position tween if it's already running
    if (positionTween.current.isPlaying()) {
      positionTween.current.stop();
    }

    // Update the zoom tween and start it
    zoomTween.current.to({ current: targetZoom }, 2000).start();

    // Update the position tween and start it
    positionTween.current.to({ current: targetPosition }, 2000).start();
  }, [nameOfPage]);

  useFrame(() => {
    zoomTween.current.update();
    positionTween.current.update();
  });

  return (
    <OrthographicCamera
      makeDefault
      ref={cameraRef}
      position={positionValue.current} // Use the position value from the tween
      zoom={zoomValue.current} // Use the zoom value from the tween
      near={0.1}
      far={1000}
    />
  );
}

export default function Home({ camera }) {
  const [select, setSelect] = useState("");
  return (
    <Canvas
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
    >
      <AnotherLight />
      <SunLight />
      <ambientLight color={"#ffffff"} intensity={0.9} />
      <Model path="/models/room_model.glb" />
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
      </mesh>
      {/* <FollowMouse /> */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <SetCamera nameOfPage={camera} />
    </Canvas>
  );
}
