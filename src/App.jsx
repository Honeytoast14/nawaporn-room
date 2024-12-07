import "./App.css";
import "@fontsource/dm-sans";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import Experience from "./Components/Experience";
import LoadingScreen from "./Components/LoadingScreen";
import Navbar from "./Components/Navbar";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import Work from "./Components/pages/Work";

export default function App() {
  const [select, setSelect] = useState("Home");
  const [headline, setHeadline] = useState("Touch The Wood");

  return (
    <div className="App w-shv h-svh">
      <LoadingScreen />
      <Canvas
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        <Suspense fallback={null}>
          <Experience selectedPage={select} headline={headline} />
        </Suspense>
      </Canvas>
      <Navbar onSelected={setSelect} selectedPage={select} />
      {select === "About" && <About />}
      {select === "Contact" && <Contact />}
      {select === "Work" && <Work setHeadline={setHeadline} />}
    </div>
  );
}
