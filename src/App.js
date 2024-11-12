import React, { useState, useEffect } from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Work from "./components/pages/Work";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Welcome from "./components/pages/Welcome";

function App() {
  const [select, setSelect] = useState("Home");
  const [headline, setHeadline] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [showWelcome, setWelcome] = useState(false);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => setWelcome(false), 3200);
    const homeTimer = setTimeout(() => setShowHome(true), 3000);
    const navbarTimer = setTimeout(() => setShowNavbar(true), 6000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(homeTimer);
      clearTimeout(navbarTimer);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }} className="font-dm-sans">
      {showWelcome && <Welcome />}

      {showNavbar && (
        <Navbar onNavClick={(item) => setSelect(item)} activeNav={select} />
      )}

      {showHome && <Home namePage={select} videoHeadline={headline} />}
      {select === "Work" && (
        <Work
          headline={(newHeadline) => {
            setHeadline(newHeadline);
          }}
        />
      )}

      {select === "About" && <About />}
      {select === "Contact" && <Contact />}
    </div>
  );
}

export default App;
