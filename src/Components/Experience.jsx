/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Room from "./Room";
import Screen from "./Screen";
import Camera from "./Camera";

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

export default function Experience({ selectedPage, headline }) {
  const [planePosition, setPlanePosition] = useState(-1.3);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
      <AnotherLight />
      <SunLight />
      <ambientLight color={"#ffffff"} intensity={0.8} />
      <Room selectedPage={selectedPage} headline={headline} />
      <Screen selectedPage={selectedPage} headline={headline} />
      <Camera selectedPage={selectedPage} />
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, planePosition, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#ffba9a"} emissive={"#b1b1b1"} />
      </mesh>
    </>
  );
}
