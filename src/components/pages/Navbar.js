import React from "react";

const Navbar = ({ onNavClick, activeNav, setVisible }) => {
  const navText = [
    { text: "Home" },
    { text: "Work" },
    { text: "About" },
    { text: "Contact" },
  ];

  return (
    <div
      className={`absolute top-0 right-0 z-20 text-main-black h-48 w-52 flex pr-5 justify-end transition-opacity duration-1000 ease-in-out ${
        setVisible ? `opacity-100` : `opacity-0`
      }`}
    >
      {navText.map((item) => (
        <div
          key={item.text}
          onClick={() => onNavClick(item.text)}
          className={`flex flex-col w-4 lg:mr-6 mr-4 mt-6 lg:text-base text-sm hover:text-lg hover:font-extrabold hover:duration-150 duration-150 ease-in-out cursor-pointer ${
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
