import React from "react";
// import { Link, Outlet } from "react-router-dom";

const Navbar = ({ onNavClick }) => {
  const navText = [
    { text: "Home" },
    { text: "Work" },
    { text: "About" },
    { text: "Contact" },
  ];

  return (
    <>
      <div className="absolute top-0 right-0 z-30 text-main-black h-48 w-52 flex pl-5">
        {navText.map((item) => (
          <div
            onClick={() => onNavClick(item.text)}
            className="flex flex-col w-4 mr-6 mt-6 text-base hover:text-lg hover:font-extrabold hover:duration-150 duration-150 ease-in-out cursor-pointer"
          >
            {item.text.split("").map((letter) => (
              <span className="text-center uppercase">{letter}</span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
