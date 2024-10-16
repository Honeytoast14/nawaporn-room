import { useRef, useEffect } from "react";
import Stats from "three/examples/jsm/libs/stats.module";
import { useFrame } from "@react-three/fiber"; // Don't forget this if you use `useFrame`

export function FPSStats() {
  const statsRef = useRef();

  useEffect(() => {
    statsRef.current = new Stats();
    statsRef.current.showPanel(0);
    document.body.appendChild(statsRef.current.dom);

    return () => {
      document.body.removeChild(statsRef.current.dom);
    };
  }, []);

  useFrame(() => {
    if (statsRef.current) {
      statsRef.current.update();
    }
  });

  return null;
}

export function GridHelperGround() {
  return <gridHelper args={[10, 10]} />;
}
