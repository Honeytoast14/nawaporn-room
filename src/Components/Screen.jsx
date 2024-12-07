/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from "@react-three/fiber";
import { useProgress, useVideoTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const Screen = ({ selectedPage, headline }) => {
  const screen = useLoader(GLTFLoader, "/model/screen.glb");
  const screenRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { progress } = useProgress();
  const { names, actions } = useAnimations(screen.animations, screenRef);

  const url = useMemo(() => {
    switch (headline) {
      case "Touch The Wood":
        return "/assets/videos/touchTheWood.webm";
      case "Solar System":
        return "/assets/videos/solar.webm";
      case "Learn2Safe":
        return "/assets/videos/learn2safe.webm";
      case "QALLZ":
        return "/assets/videos/qallz.webm";
      default:
        return null;
    }
  }, [headline]);

  const vidTexture = useVideoTexture(url);

  useEffect(() => {
    if (vidTexture) {
      vidTexture.wrapS = THREE.RepeatWrapping;
      vidTexture.wrapT = THREE.RepeatWrapping;
      vidTexture.rotation = -Math.PI / 2;
      vidTexture.repeat.set(-4.12, 4.11);
      vidTexture.offset.set(-0.045, 0.449);
      vidTexture.colorSpace = THREE.SRGBColorSpace;

      if (screenRef.current) {
        screenRef.current.traverse((child) => {
          if (child.isMesh) {
            if (selectedPage === "Work") {
              child.material = new THREE.MeshBasicMaterial({
                map: vidTexture,
                toneMapped: false,
              });
            } else {
              child.material = screen.materials["black_main"];
            }
          }
        });
      }
    }
  }, [vidTexture, selectedPage, screen.materials]);

  useEffect(() => {
    if (progress === 100 && actions) {
      const timeout = setTimeout(() => {
        const action = actions["moniter.001"];
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        action.play();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [progress, actions, names]);

  const setModelScale = () => {
    if (screenRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (height > 600) {
        if (width > 1024) {
          screenRef.current.scale.set(1, 1, 1);
        } else if (width >= 768) {
          screenRef.current.scale.set(0.8, 0.8, 0.8);
        } else {
          screenRef.current.scale.set(0.5, 0.5, 0.5);
        }
      } else if (height > 450) {
        screenRef.current.scale.set(0.7, 0.7, 0.7);
      } else {
        screenRef.current.scale.set(0.5, 0.5, 0.5);
      }
    }
  };

  useEffect(() => {
    setModelScale();
    const handleResize = () => setModelScale();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (screenRef.current) {
      screenRef.current.rotation.y = mousePos.current.x * 0.015;
      screenRef.current.rotation.x = mousePos.current.y * 0.002;
    }
  });

  return <primitive object={screen.scene} ref={screenRef} />;
};

export default Screen;
