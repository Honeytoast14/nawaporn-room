import React, { useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  useHelper,
} from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { FPSStats } from "./FPS";
import { Mesh } from "three/src/Three.js";

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
      intensity={0.7}
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
      <ambientLight color={"#ffffff"} intensity={1} />
      <Model path="/models/room_with_texture.glb" />
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
      </mesh>
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
      {/* <gridHelper args={[10, 10]} /> */}
      {/* <axesHelper args={[5]} /> */}
      <FPSStats />
    </Canvas>
  );
}
