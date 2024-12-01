/* eslint-disable react/prop-types */
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useRef, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Easing, Tween } from '@tweenjs/tween.js';

export default function Camera({ selectedPage }) {
  const cameraRef = useRef();
  const zoomValue = useRef(200);
  const positionValue = useRef([5.5, 5, 5]);

  const zoomTweenRef = useRef(null);
  const positionTweenRef = useRef(null);

  const getZoomForAbout = useCallback(() => {
    const width = window.innerWidth;
    return width > 1440 ? 4500 : 4000;
  }, []);

  const getPositionForAbout = useCallback(() => {
    const width = window.innerWidth;
    return width >= 1440 ? [6.7, 6.21, 6.12] : [6.6, 6.13, 6.06];
  }, []);

  const updateCameraForPage = useCallback(() => {
    let targetZoom = zoomValue.current;
    let targetPosition = [...positionValue.current];

    if (window.innerWidth >= 1024) {
      if (selectedPage === 'Work') {
        targetZoom = 1250;
        targetPosition = [6, 5.87, 6.07];
      } else if (selectedPage === 'About') {
        targetZoom = getZoomForAbout();
        targetPosition = getPositionForAbout();
      } else if (selectedPage === 'Contact') {
        targetZoom = 1250;
        targetPosition = [6.1, 5.35, 5.08];
      } else if (selectedPage === 'Home') {
        targetZoom = 200;
        targetPosition = [5.5, 5, 5];
      }
    } else {
      targetZoom = 200;
      targetPosition = [5.5, 5, 5];
    }

    if (zoomTweenRef.current?.isPlaying()) {
      zoomTweenRef.current.stop();
    }
    if (positionTweenRef.current?.isPlaying()) {
      positionTweenRef.current.stop();
    }

    zoomTweenRef.current = new Tween({ current: zoomValue.current })
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

    positionTweenRef.current = new Tween({ current: positionValue.current })
      .to({ current: targetPosition }, 1800)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ current }) => {
        positionValue.current = current;
        if (cameraRef.current) {
          cameraRef.current.position.set(current[0], current[1], current[2]);
        }
      })
      .start();
  }, [selectedPage, getZoomForAbout, getPositionForAbout]);

  useEffect(() => {
    if (!cameraRef.current) return;

    const handleResize = () => {
      updateCameraForPage();
    };

    updateCameraForPage();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedPage, updateCameraForPage]);

  useFrame(() => {
    if (zoomTweenRef.current) {
      zoomTweenRef.current.update();
    }
    if (positionTweenRef.current) {
      positionTweenRef.current.update();
    }
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        ref={cameraRef}
        position={positionValue.current}
        zoom={zoomValue.current}
        near={0.1}
        far={1000}
      />
      <OrbitControls enabled={false} />
    </>
  );
}
