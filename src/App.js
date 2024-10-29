import React from "react";
import Room from "./components/Room";
import WorkDetails from "./components/Work";
import { Canvas } from "@react-three/fiber";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <WorkDetails /> */}
      <Navbar />
      <Room className="z-0" />
    </div>
  );
}

export default App;
