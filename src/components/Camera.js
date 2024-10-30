import React, { useEffect, useState } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function FollowMouse() {
  const [mouse, setMouse] = useState({ x: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const x = (event.clientX - windowHalfX) / windowHalfX;
      setMouse({ x });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    const camera = state.camera;

    camera.position.x += (5.5 + mouse.x * 0.2 - camera.position.x) * 0.5;
    camera.lookAt(0, 0, 0);
  });
}

function SetCamera({ nameOfPage }) {
  const cameraPosition = [
    {
      name: "Home",
      position: [5.5, 5, 5],
      zoom: 200,
    },
    {
      name: "Work",
      position: [1, 2, 2.5],
      zoom: 900,
    },
  ];

  const [select, setSelect] = useState("");
  return (
    <OrthographicCamera
      makeDefault
      position={cameraPosition[0].position}
      zoom={cameraPosition[0].zoom}
      near={0.1}
      far={1000}
    />
  );
}

export default function Camera({ page }) {
  return (
    <>
      <FollowMouse />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <SetCamera nameOfPage={page} />
    </>
  );
}
