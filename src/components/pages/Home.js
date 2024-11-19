import React, { useRef, useState, useEffect, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Welcome from "./Welcome";
import SetCamera from "../Camera";
import Model from "../Model";
import * as THREE from "three";

import learn2safe from "../../assets/videos/learn2safe.mp4";
import solar from "../../assets/videos/solar.mp4";
import qallz from "../../assets/videos/qallz.mp4";
import touchTheWood from "../../assets/videos/touchTheWood.mp4";

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
  const [planePosition, setPlanePosition] = useState(-1.3);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const videoRef = useRef(null);

  if (videoHeadline === "Solar System") {
    videoPath = solar;
    console.log(videoPath);
  } else if (videoHeadline === "Learn2Safe") {
    videoPath = learn2safe;
    console.log(videoPath);
  } else if (videoHeadline === "QALLZ") {
    videoPath = qallz;
    console.log(videoPath);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const { width, height } = windowSize;

    if (height > 600) {
      if (width > 1024) {
        setPlanePosition(-1.3);
      } else if (width >= 768) {
        setPlanePosition(-1.05);
      } else {
        setPlanePosition(-0.65);
      }
    } else if (height > 450) {
      setPlanePosition(-0.95);
    } else {
      setPlanePosition(-0.65);
    }
  }, [windowSize]);

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
          videoRef={videoRef}
        />
        <mesh
          rotation-x={-Math.PI / 2}
          position={[0, planePosition, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
        </mesh>
        <OrbitControls enabled={false} />
        <SetCamera nameOfPage={namePage} />
      </Canvas>
      <video
        ref={videoRef}
        src={videoPath}
        autoPlay
        loop
        muted
        className="absolute top-0 z-0"
      />
    </>
  );
}
