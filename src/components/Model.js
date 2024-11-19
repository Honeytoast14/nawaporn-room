import { useEffect, useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

import me from "../assets/imgs/nintendoSetting.png";

export default function Model({ path, navName, setLoading, setNav, videoRef }) {
  const manager = new THREE.LoadingManager();
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { actions, names } = useAnimations(gltf.animations, modelRef);
  const videoTexture = useMemo(() => {
    if (videoRef.current) {
      return new THREE.VideoTexture(videoRef.current);
    }
    return null;
  }, [videoRef]);
  const imgTexture = new THREE.TextureLoader(manager).load(me);

  const setModelScale = () => {
    if (modelRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (height > 600) {
        if (width > 1024) {
          modelRef.current.scale.set(1, 1, 1);
        } else if (width >= 768) {
          modelRef.current.scale.set(0.8, 0.8, 0.8);
        } else {
          modelRef.current.scale.set(0.5, 0.5, 0.5);
        }
      } else if (height > 450) {
        modelRef.current.scale.set(0.7, 0.7, 0.7);
      } else {
        modelRef.current.scale.set(0.5, 0.5, 0.5);
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
      // Handle screen texture changes
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
    setNav,
  ]);

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
    if (modelRef.current) {
      modelRef.current.rotation.y = mousePos.current.x * 0.015;
      modelRef.current.rotation.x = mousePos.current.y * 0.002;
    }
  });

  return <primitive object={gltf.scene} position={[0, 0, 0]} ref={modelRef} />;
}
