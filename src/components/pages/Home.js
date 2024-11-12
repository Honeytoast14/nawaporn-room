import React, { useRef, useEffect } from "react";
import {
  OrbitControls,
  OrthographicCamera,
  useAnimations,
} from "@react-three/drei";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Easing, Tween } from "@tweenjs/tween.js";
import * as THREE from "three";

import learn2safe from "../../assets/videos/learn2safe.mp4";
import solar from "../../assets/videos/solar.mp4";
import qallz from "../../assets/videos/qallz.mp4";
import touchTheWood from "../../assets/videos/touchTheWood.mp4";

function Model({ path, navName }) {
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { actions, names } = useAnimations(gltf.animations, modelRef);
  const videoTexture = useRef(
    new THREE.VideoTexture(document.getElementById("video"))
  ).current;

  useEffect(() => {
    if (videoTexture) {
      videoTexture.wrapS = THREE.RepeatWrapping;
      videoTexture.wrapT = THREE.RepeatWrapping;
      videoTexture.rotation = -Math.PI / 2;
      videoTexture.repeat.set(-4.12, 4.11);
      videoTexture.offset.set(-0.045, 0.449);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.needsUpdate = true;
    }
  }, [videoTexture]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      //normal is "screen". no animation is "screen001"
      if (child.name === "screen001") {
        child.material = new THREE.MeshBasicMaterial({
          map: videoTexture,
          color: new THREE.Color("rgb(255, 255, 255)"),
        });
        videoTexture.needsUpdate = true;
      }
    });

    //All animations
    if (names != null) {
      names.forEach((clip) => {
        const action = actions[clip];
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      });

      //Phone ringing animation
      if (navName === "Contact" && actions["phoneRing"]) {
        const action = actions["phoneRing"];

        const playWithDelay = () => {
          action.clampWhenFinished = true;
          setTimeout(() => {
            action.reset().play();
            action.setLoop(THREE.LoopRepeat, 4);
          }, 2000);
        };
        playWithDelay();
      }
    }
  }, [gltf, actions, names, navName, videoTexture]);

  useEffect(() => {
    //Model follow mouse
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = mousePos.current.x * 0.02;
      modelRef.current.rotation.x = mousePos.current.y * 0.002;
    }
  });

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
    new Tween({ current: zoomValue.current })
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        if (cameraRef.current) {
          cameraRef.current.zoom = current;
          cameraRef.current.updateProjectionMatrix();
        }
      })
  );

  const positionTween = useRef(
    new Tween({ current: positionValue.current })
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        if (cameraRef.current) {
          cameraRef.current.position.set(current[0], current[1], current[2]);
        }
      })
  );

  useEffect(() => {
    if (!nameOfPage) return;

    let targetZoom = zoomValue.current;
    let targetPosition = [...positionValue.current];

    if (nameOfPage === "Work") {
      targetZoom = 1250;
      targetPosition = [6, 5.85, 6];
    } else if (nameOfPage === "About") {
      targetZoom = 2600;
      targetPosition = [6.8, 6.25, 6.1];
    } else if (nameOfPage === "Contact") {
      targetZoom = 1250;
      targetPosition = [6.1, 5.35, 5.08];
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

    zoomTween.current = new Tween({ current: zoomValue.current })
      .to({ current: targetZoom }, 1500)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        zoomValue.current = current;
        if (cameraRef.current) {
          cameraRef.current.zoom = current;
          cameraRef.current.updateProjectionMatrix();
        }
      })
      .start();

    positionTween.current = new Tween({ current: positionValue.current })
      .to({ current: targetPosition }, 1800)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        positionValue.current = current;
        if (cameraRef.current) {
          cameraRef.current.position.set(current[0], current[1], current[2]);
        }
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

export default function Home({ namePage, videoHeadline }) {
  let videoPath = touchTheWood;

  if (videoHeadline === "Solar System") {
    videoPath = solar;
  } else if (videoHeadline === "Learn2Safe") {
    videoPath = learn2safe;
  } else if (videoHeadline === "QALLZ") {
    videoPath = qallz;
  }

  return (
    <>
      <Canvas
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        className="z-10"
      >
        <AnotherLight />
        <SunLight />
        <ambientLight color={"#ffffff"} intensity={0.9} />
        <Model path="/models/room_no_animation.glb" navName={namePage} />
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.3, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
        </mesh>
        <OrbitControls enabled={false} />
        <SetCamera nameOfPage={namePage} />
      </Canvas>
      <video
        autoPlay
        loop
        muted
        controls
        className="w-0 h-0 absolute top-0 z-0"
        id="video"
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
