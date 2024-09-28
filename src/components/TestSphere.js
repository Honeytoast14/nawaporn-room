import { Sphere, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
    />
  );
}

export default function TestSphere() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />

      <ambientLight intensity={0.3} />

      <Model
        path={"/models/moniter.glb"}
        scale={[2, 2, 2]}
        position={[0, -2, 0]}
      />

      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[10, 10]}
        receiveShadow
      >
        <meshStandardMaterial color="gray" />
      </Plane>

      <OrbitControls />
    </Canvas>
  );
}
