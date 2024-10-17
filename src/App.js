import React from "react";
import Room from "./components/Room";
import Camera from "./components/Camera";
import WorkDetails from "./components/Work";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <WorkDetails /> */}
      <Room />
    </div>
  );
}

export default App;
