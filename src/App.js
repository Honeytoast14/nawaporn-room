import React, { useState } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";

function App() {
  const [select, setSelect] = useState("");

  return (
    <div style={{ height: "100vh", width: "100%" }} className="font-dm-sans">
      <Navbar onNavClick={(item) => setSelect(item)} />
      <Home camera={select} style={{ flex: 1 }} />
      {select === "Work" && <Work />}
    </div>
  );
}

export default App;
