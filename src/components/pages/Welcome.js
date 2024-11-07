import React, { useEffect, useState } from "react";

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <div className="absolute top-0 z-40 w-full h-full bg-second_white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p
          className={`text-xl text-main-black font-light transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Welcome to my portfolio.
        </p>
      </div>
    </div>
  );
}
