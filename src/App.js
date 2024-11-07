import React, { useState, useEffect } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Welcome from "./components/pages/Welcome";

function App() {
  const [select, setSelect] = useState("Home");
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showWelcome, setWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcome(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }} className="font-dm-sans">
      {showWelcome && <Welcome />}

      {showNavbar && (
        <Navbar onNavClick={(item) => setSelect(item)} activeNav={select} />
      )}

      {showHome && <Home namePage={select} style={{ flex: 1 }} />}
      {select === "Work" && <Work />}
      {select === "About" && <About />}
      {select === "Contact" && <Contact />}
    </div>
  );
}

export default App;
