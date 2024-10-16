import React, { useRef, useEffect, useCallback } from "react";
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
import { FPSStats, GridHelperGround } from "./Test";

function Model({ path, position, scale, onClick, isClickable }) {
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

  const handleClick = useCallback(
    (event) => {
      if (isClickable) {
        event.stopPropagation();
        onClick();
      }
    },
    [onClick, isClickable]
  );

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      scale={scale}
      onClick={handleClick}
    />
  );
}

function StaticLight({ position, intensity }) {
  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, "yellow");

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      castShadow
      shadow-mapSize={[1024, 1024]}
      shadow-camera-far={20}
      shadow-bias={-0.01}
    />
  );
}

function EnvironmentMap({ intensity, path }) {
  const { scene, gl } = useThree();

  const envMap = useLoader(EXRLoader, path);

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);

    const envTexture = pmremGenerator.fromEquirectangular(envMap).texture;

    scene.environment = envTexture;
    scene.environmentIntensity = intensity;

    return () => {
      pmremGenerator.dispose();
    };
  }, [envMap, scene, gl, intensity, path]);

  return null;
}

export default function ExampleModel() {
  const alertClick = useCallback(() => {
    alert("hello");
  }, []);

  return (
    <Canvas camera={{ position: [3, 2.8, 3] }} shadows>
      <GridHelperGround />
      <FPSStats />
      <ambientLight intensity={0.1} />
      <StaticLight position={[3, 15, 2]} intensity={2} />
      {/* <EnvironmentMap path={"Environments/yoga_room_1k.exr"} intensity={0.6} /> */}
      <Model
        path="/models/no-moniter.glb"
        isClickable={false}
        scale={[0.5, 0.5, 0.5]}
      />
      <Selection>
        <EffectComposer multisampling={2} autoClear={false}>
          <Select enabled>
            <Model
              path="/models/moniter.glb"
              scale={[0.5, 0.5, 0.5]}
              onClick={alertClick}
              isClickable={true}
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
      // maxPolarAngle={Math.PI / 2.75}
      // minPolarAngle={Math.PI / 2.75}
      // maxAzimuthAngle={Math.PI / 2}
      // minAzimuthAngle={-Math.PI / 80}
      />
    </Canvas>
  );
}
