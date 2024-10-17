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

export default function Camera() {
  return (
    <>
      <FollowMouse />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <OrthographicCamera
        makeDefault
        position={[5.5, 5, 5]}
        zoom={200}
        near={0.1}
        far={1000}
      />
    </>
  );
}
