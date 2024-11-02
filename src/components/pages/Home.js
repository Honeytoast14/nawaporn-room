import React, { useRef, useEffect } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Easing, Tween } from "@tweenjs/tween.js";
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

function SetCamera({ nameOfPage }) {
  const cameraRef = useRef();
  const zoomValue = useRef(200);
  const positionValue = useRef([5.5, 5, 5]);

  useEffect(() => {
    if (!cameraRef.current) return;

    cameraRef.current.zoom = zoomValue.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

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
    if (!nameOfPage) return;

    let targetZoom = 200;
    let targetPosition = [5.5, 5, 5];

    if (nameOfPage === "Work") {
      targetZoom = 900;
      targetPosition = [13, 5, 6];
    } else if (nameOfPage === "About") {
      targetZoom = 2600;
      targetPosition = [25, 19, 26];
    } else if (nameOfPage === "Contact") {
      targetZoom = 1050;
      targetPosition = [9, 10, 19];
    } else if (nameOfPage === "Home") {
      targetZoom = 200;
      targetPosition = [5.5, 5, 5];
    }

    if (zoomTween.current.isPlaying()) {
      zoomTween.current.stop();
    }

    if (positionTween.current.isPlaying()) {
      positionTween.current.stop();
    }

    zoomTween.current
      .to({ current: targetZoom }, 1100)
      .onComplete(() => {
        zoomValue.current = targetZoom;
      })
      .start();

    positionTween.current
      .to({ current: targetPosition }, 1600)
      .onComplete(() => {
        positionValue.current = targetPosition;
      })
      .start();
  }, [nameOfPage]);

  useFrame(() => {
    zoomTween.current.update();
    positionTween.current.update();
  });

  return (
    <OrthographicCamera
      makeDefault
      ref={cameraRef}
      position={positionValue.current}
      zoom={zoomValue.current}
      near={0.1}
      far={1000}
    />
  );
}

export default function Home({ camera }) {
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
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        enableDamping={false}
      />
      <SetCamera nameOfPage={camera} />
    </Canvas>
  );
}
