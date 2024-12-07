/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Camera({ selectedPage }) {
  const cameraRef = useRef();
  const [zoom, setZoom] = useState(200);
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(5.5, 5, 5),
  );
  const [targetZoom, setTargetZoom] = useState(200);
  const width = window.innerWidth;
  const lerpSpeed = 0.04;

  useEffect(() => {
    if (width >= 1024) {
      if (selectedPage === "Home") {
        setTargetPosition(new THREE.Vector3(5.5, 5, 5));
        setTargetZoom(200);
      } else if (selectedPage === "Work") {
        setTargetPosition(new THREE.Vector3(6, 1.4, 0.37));
        setTargetZoom(1250);
      } else if (selectedPage === "About") {
        setTargetPosition(new THREE.Vector3(1.65, 1.2, 1.4));
        setTargetZoom(3500);
      } else if (selectedPage === "Contact") {
        setTargetPosition(new THREE.Vector3(3, 4, 9));
        setTargetZoom(1250);
      }
    } else {
      setTargetPosition(new THREE.Vector3(5.5, 5, 5));
      setTargetZoom(200);
    }
  }, [selectedPage, width]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.lerp(targetPosition, lerpSpeed);
      cameraRef.current.zoom = THREE.MathUtils.lerp(
        cameraRef.current.zoom,
        targetZoom,
        lerpSpeed,
      );
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        ref={cameraRef}
        position={[5.5, 5, 5]}
        zoom={zoom}
        near={0.1}
        far={1000}
      />
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
    </>
  );
}
