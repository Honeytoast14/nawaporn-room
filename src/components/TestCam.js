import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const Camera = ({ zoomLevel }) => {
  const cameraRef = useRef();

  useFrame(() => {
    TWEEN.update(); // อัพเดต TWEEN ในทุกเฟรม
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel.current; // ปรับตำแหน่งกล้องตามค่า zoom
      console.log("Current Zoom Level:", zoomLevel.current); // แสดงค่า zoom ในคอนโซล
    }
  });

  return (
    <perspectiveCamera ref={cameraRef} position={[0, 0, zoomLevel.current]} />
  );
};

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh position={[2, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const Plane = () => {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const TestCam = () => {
  const zoomLevel = useRef(900); // เริ่มต้นที่ 900

  // ฟังก์ชันสำหรับซูม
  const zoom = (targetZoom) => {
    console.log("Zooming to:", targetZoom); // แสดงเป้าหมายการซูมในคอนโซล
    const zoomTween = new TWEEN.Tween({ zoom: zoomLevel.current })
      .to({ zoom: targetZoom }, 1000) // ระยะเวลา 1 วินาที
      .onUpdate(({ zoom }) => {
        zoomLevel.current = zoom; // อัปเดตค่า zoomLevel
        console.log("Updated Zoom Level:", zoom); // แสดงค่า zoom ที่อัปเดต
      })
      .start();
  };

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Camera zoomLevel={zoomLevel} />
        <Box />
        <Sphere />
        <Plane />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <button className="bg-main-green" onClick={() => zoom(200)}>
          Zoom Out
        </button>
        <button className="bg-main-pink" onClick={() => zoom(900)}>
          Zoom In
        </button>
      </div>
    </>
  );
};

export default TestCam;
