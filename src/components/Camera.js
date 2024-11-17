import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Easing, Tween } from "@tweenjs/tween.js";
import { OrthographicCamera } from "@react-three/drei";

export default function SetCamera({ nameOfPage }) {
  const cameraRef = useRef();
  const zoomValue = useRef(200);
  const positionValue = useRef([5.5, 5, 5]);

  const getZoomForAbout = () => {
    const width = window.innerWidth;
    return width > 1440 ? 4500 : 4000;
  };

  const getPositionForAbout = () => {
    const width = window.innerWidth;
    return width > 1440 ? [6.7, 6.21, 6.12] : [6.6, 6.12, 6.06];
  };

  useEffect(() => {
    if (!cameraRef.current) return;

    cameraRef.current.zoom = zoomValue.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  const zoomTween = useRef(
    new Tween({ current: zoomValue.current })
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        if (cameraRef.current) {
          cameraRef.current.zoom = current;
          cameraRef.current.updateProjectionMatrix();
        }
      })
  );

  const positionTween = useRef(
    new Tween({ current: positionValue.current })
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        if (cameraRef.current) {
          cameraRef.current.position.set(current[0], current[1], current[2]);
        }
      })
  );

  useEffect(() => {
    if (!nameOfPage) return;
    let targetZoom = zoomValue.current;
    let targetPosition = [...positionValue.current];

    if (nameOfPage === "Work") {
      targetZoom = 1250;
      targetPosition = [6, 5.85, 6];
    } else if (nameOfPage === "About") {
      targetZoom = getZoomForAbout();
      targetPosition = getPositionForAbout();
    } else if (nameOfPage === "Contact") {
      targetZoom = 1250;
      targetPosition = [6.1, 5.35, 5.08];
    } else if (nameOfPage === "Home") {
      targetZoom = 200;
      targetPosition = [5.5, 5, 5];
    }

    if (zoomTween.current.isPlaying()) {
      zoomTween.current.stop();
    }
    if (positionTween.current.isPlaying()) {
      positionTween.current.stop();
    }

    if (window.innerWidth < 1024) {
      targetZoom = 200;
      targetPosition = [5.5, 5, 5];
    }

    zoomTween.current = new Tween({ current: zoomValue.current })
      .to({ current: targetZoom }, 1500)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        zoomValue.current = current;
        if (cameraRef.current) {
          cameraRef.current.zoom = current;
          cameraRef.current.updateProjectionMatrix();
        }
      })
      .start();

    positionTween.current = new Tween({ current: positionValue.current })
      .to({ current: targetPosition }, 1800)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        positionValue.current = current;
        if (cameraRef.current) {
          cameraRef.current.position.set(current[0], current[1], current[2]);
        }
      })
      .start();
  }, [nameOfPage]);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      const handleResize = () => {
        if (zoomTween.current.isPlaying()) zoomTween.current.stop();
        if (positionTween.current.isPlaying()) positionTween.current.stop();

        zoomTween.current = new Tween({ current: zoomValue.current })
          .to({ current: 200 }, 1500)
          .easing(Easing.Quadratic.Out)
          .onUpdate(({ current }) => {
            zoomValue.current = current;
            if (cameraRef.current) {
              cameraRef.current.zoom = current;
              cameraRef.current.updateProjectionMatrix();
            }
          })
          .start();

        positionTween.current = new Tween({ current: positionValue.current })
          .to({ current: [5.5, 5, 5] }, 1800)
          .easing(Easing.Quadratic.Out)
          .onUpdate(({ current }) => {
            positionValue.current = current;
            if (cameraRef.current) {
              cameraRef.current.position.set(
                current[0],
                current[1],
                current[2]
              );
            }
          })
          .start();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useFrame(() => {
    zoomTween.current.update();
    positionTween.current.update();
  });

  return (
    <OrthographicCamera
      makeDefault
      ref={cameraRef}
      position={positionValue.current}
      zoom={zoomValue.current}
      near={0.1}
      far={1000}
    />
  );
}
