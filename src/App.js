import React, { useState } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";
import TestCam from "./components/TestCam";

function App() {
  const [select, setSelect] = useState("");

  return (
    <div style={{ height: "100vh", width: "100%" }} className=" font-dm-sans">
      {/* <TestCam /> */}
      <Navbar onNavClick={(item) => setSelect(item)} />
      <Home camera={select} />
      {select === "Work" ? <Work /> : null}
    </div>
  );
}

export default App;
