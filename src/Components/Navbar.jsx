/* eslint-disable react/prop-types */

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const NavButton = ({ text, onClick, selected }) => {
  return (
    <div className="flex uppercase sm:mr-2 sm:mt-6 sm:w-6 sm:[text-orientation:upright] sm:[writing-mode:vertical-lr] xl:mr-4">
      <p
        onClick={onClick}
        className={`cursor-pointer text-center text-sm duration-150 ease-in-out xl:text-base ${
          selected === text
            ? `text-lg font-bold`
            : `2xl:font-normal 2xl:hover:text-lg 2xl:hover:font-extrabold 2xl:hover:duration-150`
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default function Navbar({ onSelected, selectedPage }) {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [progress, setVisible]);

  return (
    <div
      className={`absolute top-0 z-20 mt-5 flex w-full justify-between px-5 text-main-black ${visible ? `visible opacity-100` : `invisible opacity-0`} transition-opacity duration-1000 ease-in-out sm:right-0 sm:mt-0 sm:w-auto sm:pr-5`}
    >
      <NavButton
        text={"Home"}
        onClick={() => onSelected("Home")}
        selected={selectedPage}
      />
      <NavButton
        text={"Work"}
        onClick={() => onSelected("Work")}
        selected={selectedPage}
      />
      <NavButton
        text={"About"}
        onClick={() => onSelected("About")}
        selected={selectedPage}
      />
      <NavButton
        text={"Contact"}
        onClick={() => onSelected("Contact")}
        selected={selectedPage}
      />
    </div>
  );
}
