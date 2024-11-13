import React, { useEffect, useState } from "react";

const Navbar = ({ onNavClick, activeNav, setVisible }) => {
  const navText = [
    { text: "Home" },
    { text: "Work" },
    { text: "About" },
    { text: "Contact" },
  ];

  return (
    <div
      className={`absolute top-0 right-0 z-20 text-main-black h-48 w-52 flex pl-5 transition-opacity duration-1000 ease-in-out ${
        setVisible ? `opacity-100` : `opacity-0`
      }`}
    >
      {navText.map((item) => (
        <div
          key={item.text}
          onClick={() => onNavClick(item.text)}
          className={`flex flex-col w-4 mr-6 mt-6 text-base hover:text-lg hover:font-extrabold hover:duration-150 duration-150 ease-in-out cursor-pointer ${
            activeNav === item.text ? `font-extrabold` : `font-normal`
          }`}
          style={{ height: 24 * item.text.length }}
        >
          {item.text.split("").map((letter, letterIndex) => (
            <span
              key={`${item.text}-${letterIndex}`}
              className="text-center uppercase"
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
