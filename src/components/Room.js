import React, { useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Camera from "./Camera";
import { FPSStats } from "./FPS";

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
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1, "yellow");

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
  // useHelper(lightRef, THREE.HemisphereLightHelper, 1, "Purple");
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

export default function Room() {
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
      <Camera />
      {/* <gridHelper args={[10, 10]} /> */}
      {/* <axesHelper args={[5]} /> */}
      {/* <FPSStats /> */}
    </Canvas>
  );
}
