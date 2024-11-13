import React, { useRef, useEffect, useState } from "react";
import { OrbitControls, useAnimations } from "@react-three/drei";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Welcome from "./Welcome";
import SetCamera from "../Camera";

import me from "../../assets/imgs/nintendoSetting.png";

import learn2safe from "../../assets/videos/learn2safe.mp4";
import solar from "../../assets/videos/solar.mp4";
import qallz from "../../assets/videos/qallz.mp4";
import touchTheWood from "../../assets/videos/touchTheWood.mp4";

function Model({ path, navName, setLoading, setNav }) {
  const manager = new THREE.LoadingManager();
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { actions, names } = useAnimations(gltf.animations, modelRef);
  const videoTexture = useRef(
    new THREE.VideoTexture(document.getElementById("video"))
  ).current;
  const imgTexture = new THREE.TextureLoader(manager).load(me);

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
    if (imgTexture) {
      imgTexture.wrapS = THREE.RepeatWrapping;
      imgTexture.wrapT = THREE.RepeatWrapping;
      imgTexture.rotation = 2 * Math.PI;
      imgTexture.colorSpace = THREE.SRGBColorSpace;
      imgTexture.flipY = false;
    }
  }, [imgTexture]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      //normal is "screen". no animation is "screen001"
      if (child.name === "screen") {
        if (navName === "Work" && videoTexture) {
          child.material = new THREE.MeshBasicMaterial({
            map: videoTexture,
            color: new THREE.Color("rgb(255, 255, 255)"),
          });
          videoTexture.needsUpdate = true;
        } else if (gltf.materials && gltf.materials["black_main"]) {
          child.material = gltf.materials["black_main"];
        }
      }
      if (child.name === "nintendoScreen") {
        if (navName === "About" && imgTexture) {
          child.material = new THREE.MeshBasicMaterial({
            map: imgTexture,
            toneMapped: false,
          });
        } else if (gltf.materials && gltf.materials["black_main"]) {
          child.material = gltf.materials["black_main"];
        }
      }
    });

    //All animations
    if (names != null) {
      manager.onLoad = () => {
        setTimeout(() => {
          setLoading(false);
          names.forEach((clip) => {
            const action = actions[clip];
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            action.play();
          });

          setTimeout(() => {
            setNav(true);
          }, 3300);
        }, 3200);
      };

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
  }, [
    gltf,
    actions,
    names,
    navName,
    videoTexture,
    imgTexture,
    manager,
    setLoading,
  ]);

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
      modelRef.current.rotation.y = mousePos.current.x * 0.015;
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

export default function Home({ namePage, videoHeadline, setNav }) {
  let videoPath = touchTheWood;
  const [loading, setLoading] = useState(true);

  if (videoHeadline === "Solar System") {
    videoPath = solar;
  } else if (videoHeadline === "Learn2Safe") {
    videoPath = learn2safe;
  } else if (videoHeadline === "QALLZ") {
    videoPath = qallz;
  }

  return (
    <>
      {loading && <Welcome />}
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
        <Model
          path="/models/room.glb"
          navName={namePage}
          setLoading={setLoading}
          setNav={setNav}
        />
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.3, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
        </mesh>
        <OrbitControls enabled={false} />
        <SetCamera nameOfPage={namePage} />
      </Canvas>
      <video
        src={videoPath}
        autoPlay
        loop
        muted
        className="w-0 h-0 absolute top-0 z-0"
        id="video"
      />
    </>
  );
}
