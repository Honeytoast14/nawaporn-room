import React, { useState } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

function App() {
  const [select, setSelect] = useState("Home");

  return (
    <div style={{ height: "100vh", width: "100%" }} className="font-dm-sans">
      <Navbar onNavClick={(item) => setSelect(item)} activeNav={select} />
      <Home camera={select} style={{ flex: 1 }} />
      {select === "Work" && <Work />}
      {select === "About" && <About />}
      {select === "Contact" && <Contact />}
    </div>
  );
}

export default App;
