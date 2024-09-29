import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Model({ path, position, scale, rotation }) {
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();

  React.useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

function StaticLight({ position }) {
  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, "yellow");

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      intensity={1}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-camera-far={50}
      shadow-bias={-0.0001}
    />
  );
}

function AmbientLighting() {
  return <ambientLight intensity={0.3} />;
}

export default function ExampleModel() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }} shadows>
      <AmbientLighting />
      <StaticLight position={[5, 10, 2]} />
      <Environment preset="forest" />
      <Model
        path="/models/no-moniter.glb"
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
      <Model
        path="/models/moniter.glb"
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
      <OrbitControls />
    </Canvas>
  );
}
