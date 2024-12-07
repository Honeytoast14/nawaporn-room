/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useProgress } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Room = ({ selectedPage }) => {
  const roomRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { progress } = useProgress();

  const gltf = useLoader(GLTFLoader, "/model/room_no_screen.glb");
  const { actions, names } = useAnimations(gltf.animations, roomRef);

  const imgTexture = useLoader(
    THREE.TextureLoader,
    "/assets/imgs/nintendoSetting.png",
  );

  const materials = useMemo(
    () => ({
      default: gltf.materials["black_main"],
      nintendo: new THREE.MeshBasicMaterial({
        map: imgTexture,
        toneMapped: false,
      }),
    }),
    [imgTexture, gltf.materials],
  );

  const setModelScale = () => {
    if (roomRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (height > 600) {
        if (width > 1024) {
          roomRef.current.scale.set(1, 1, 1);
        } else if (width >= 768) {
          roomRef.current.scale.set(0.8, 0.8, 0.8);
        } else {
          roomRef.current.scale.set(0.5, 0.5, 0.5);
        }
      } else if (height > 450) {
        roomRef.current.scale.set(0.7, 0.7, 0.7);
      } else {
        roomRef.current.scale.set(0.5, 0.5, 0.5);
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
    if (imgTexture) {
      imgTexture.wrapS = THREE.RepeatWrapping;
      imgTexture.wrapT = THREE.RepeatWrapping;
      imgTexture.rotation = 2 * Math.PI;
      imgTexture.colorSpace = THREE.SRGBColorSpace;
      imgTexture.flipY = false;
    }
  }, [imgTexture]);

  useEffect(() => {
    if (progress === 100) {
      gltf.scene.traverse((child) => {
        if (child.name === "nintendoScreen") {
          child.material =
            selectedPage === "About" ? materials.nintendo : materials.default;
        }

        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [progress, selectedPage, materials, gltf.scene]);

  // Play animations
  useEffect(() => {
    if (selectedPage === "Contact" && actions["phoneRing"]) {
      const action = actions["phoneRing"];
      action.loop = THREE.LoopOnce;
      const playAnim = setInterval(() => {
        action.reset().play();
      }, 3500);

      return () => clearInterval(playAnim);
    }

    if (names && progress === 100) {
      const timeout = setTimeout(() => {
        names.forEach((clip) => {
          const action = actions[clip];
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
          action.play();
        });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [actions, names, progress, selectedPage]);

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
    if (roomRef.current) {
      roomRef.current.rotation.y = mousePos.current.x * 0.015;
      roomRef.current.rotation.x = mousePos.current.y * 0.002;
    }
  });

  return <primitive object={gltf.scene} ref={roomRef} />;
};

export default Room;
