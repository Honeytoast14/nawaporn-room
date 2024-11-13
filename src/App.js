import React, { useState, useEffect } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import "./App.css";

function App() {
  const [select, setSelect] = useState("Home");
  const [headline, setHeadline] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100%" }} className="font-dm-sans">
      <Navbar
        onNavClick={(item) => setSelect(item)}
        activeNav={select}
        setVisible={navVisible}
      />

      <Home
        namePage={select}
        videoHeadline={headline}
        setNav={(newSetNav) => setNavVisible(newSetNav)}
      />
      {select === "Work" && (
        <Work
          headline={(newHeadline) => {
            setHeadline(newHeadline);
          }}
        />
      )}
      {select === "About" && <About selectNav={select} />}
      {select === "Contact" && <Contact />}
    </div>
  );
}

export default App;
