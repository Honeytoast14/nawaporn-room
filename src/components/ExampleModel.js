import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";

function Model({ path, position, scale }) {
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

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      scale={scale}
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

function EnvironmentMap({ intensity }) {
  const { scene, gl } = useThree();

  const envMap = useLoader(EXRLoader, "/Environments/yoga_room_1k.exr");

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);

    const envTexture = pmremGenerator.fromEquirectangular(envMap).texture;

    scene.environment = envTexture;
    scene.environmentIntensity = intensity;

    return () => {
      pmremGenerator.dispose();
    };
  }, [envMap, scene, gl, intensity]);

  return null;
}

export default function ExampleModel() {
  return (
    <Canvas camera={{ position: [3, 2.8, 3] }} shadows>
      <ambientLight intensity={0.1} />
      <StaticLight position={[5, 10, 2]} />
      <EnvironmentMap intensity={0.39} />
      <Model
        path="/models/no-moniter.glb"
        position={[0, -0.6, 0]}
        scale={[1, 1, 1]}
      />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Select enabled>
            <Model
              path="/models/moniter.glb"
              position={[0, -0.6, 0]}
              scale={[1, 1, 1]}
            />
          </Select>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={50}
            width={1800}
          />
        </EffectComposer>
      </Selection>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.75}
        minPolarAngle={Math.PI / 2.75}
        maxAzimuthAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 80}
      />
    </Canvas>
  );
}
