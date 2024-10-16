import React, { useRef, useEffect } from "react";
import { FPSStats, GridHelperGround } from "./Test";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  useHelper,
} from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
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
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, "yellow");

  return (
    <directionalLight
      ref={lightRef}
      position={[1.5, 7, 3]}
      castShadow
      intensity={3}
      shadow-mapSize={[1024, 1024]}
      shadow-camera-far={20}
      shadow-normalBias={0.02}
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
      <SunLight />
      <ambientLight />
      <Model path="/models/room_with_texture.glb" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <OrthographicCamera
        makeDefault
        position={[5.5, 5, 5]}
        zoom={200}
        near={0.1}
        far={1000}
      />
      <FPSStats />
      <GridHelperGround />
      <axesHelper args={[5]} />
    </Canvas>
  );
}
