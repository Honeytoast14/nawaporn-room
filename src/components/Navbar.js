import React from "react";

export default function Navbar() {
  const navText = [
    { text: "Home" },
    { text: "Work" },
    { text: "About" },
    { text: "Contact" },
  ];

  return (
    <div className="absolute top-0 right-0 z-10 text-main-black font-dm-sans h-48 w-52 flex pl-5">
      {navText.map((item) => (
        <div className="flex flex-col w-4 mr-6 mt-6 text-base hover:text-lg hover:font-extrabold hover:duration-150 duration-150 ease-in-out cursor-pointer">
          {item.text.split("").map((letter) => (
            <span className="text-center uppercase">{letter}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
