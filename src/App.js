import React, { useEffect, useRef } from "react";
import ExampleModel from "./components/ExampleModel";
import Room from "./components/Room";
import "./App.css";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <ExampleModel /> */}
      <Room />
    </div>
  );
}

export default App;
