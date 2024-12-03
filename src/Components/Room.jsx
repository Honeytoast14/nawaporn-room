/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useProgress, useVideoTexture } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Room = ({ selectedPage, headline }) => {
  const roomRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { progress, loaded, item } = useProgress();
  const width = window.innerWidth;

  const gltf = useLoader(GLTFLoader, "/model/room_no_animation.glb");
  
  const { actions, names } = useAnimations(gltf.animations, roomRef);

  // const url = useMemo(() => {
  //   switch (headline) {
  //     case "Touch The Wood":
  //       return "./assets/videos/touchTheWood.mp4";
  //     case "Solar System":
  //       return "./assets/videos/solar.mp4";
  //     case "Learn2Safe":
  //       return "./assets/videos/learn2safe.mp4";
  //     case "QALLZ":
  //       return "./assets/videos/qallz.mp4";
  //     default:
  //       return console.error("no vid");
  //   }
  // }, [headline]);

  // const imgTexture = useLoader(
  //   THREE.TextureLoader,
  //   "./assets/img/nintendoSetting.png",
  // );

  // const vidTexture = useVideoTexture(url);  

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
    const handleResize = () => {
      setModelScale();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   imgTexture.wrapS = THREE.RepeatWrapping;
  //   imgTexture.wrapT = THREE.RepeatWrapping;
  //   imgTexture.rotation = 2 * Math.PI;
  //   imgTexture.colorSpace = THREE.SRGBColorSpace;
  //   imgTexture.flipY = false;
  // }, [imgTexture]);

  // useEffect(() => {
  //   vidTexture.wrapS = THREE.RepeatWrapping;
  //   vidTexture.wrapT = THREE.RepeatWrapping;
  //   vidTexture.rotation = -Math.PI / 2;
  //   vidTexture.repeat.set(-4.12, 4.11);
  //   vidTexture.offset.set(-0.045, 0.449);
  //   vidTexture.colorSpace = THREE.SRGBColorSpace;
  //   vidTexture.needsUpdate = true;
  // }, [vidTexture]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      // if (child.name === "nintendoScreen") {
      //   if (selectedPage === "About" && imgTexture) {
      //     child.material = new THREE.MeshBasicMaterial({
      //       map: imgTexture,
      //       toneMapped: false,
      //     });
      //   } else {
      //     {
      //       child.material = gltf.materials["black_main"];
      //     }
      //   }
      // }

      // if (child.name === "screen") {
      //   if (selectedPage === "Work") {
      //     if(vidTexture){
      //       child.material = new THREE.MeshBasicMaterial({
      //         map: vidTexture,
      //         toneMapped: false,
      //       });
      //     }
      //   } else {
      //     child.material = gltf.materials["black_main"];
      //   }
      // }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [
    gltf.scene,
    // progress,
    // imgTexture,
    // gltf.materials,
    // selectedPage,
    // vidTexture,
    // width,
  ]);

  // animation
  useEffect(() => {
    if (selectedPage === "Contact" && actions["phoneRing"]) {
      const action = actions["phoneRing"];
      action.loop = THREE.LoopOnce;
      const playAnim = setInterval(() => {
        action.reset().play();
      }, 3500);

      return () => {
        if (playAnim) {
          clearInterval(playAnim);
        }
      };
    }

    if (names != null) {
      if (progress === 100) {
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
  });

  useFrame(() => {
    if (roomRef.current) {
      roomRef.current.rotation.y = mousePos.current.x * 0.015;
      roomRef.current.rotation.x = mousePos.current.y * 0.002;
    }
  });
  return (
    <>
      <primitive object={gltf.scene} scale={1} ref={roomRef} />
    </>
  );
};

export default Room;
