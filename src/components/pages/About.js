import React, { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => {
      clearTimeout(fadeInTimer);
    };
  });

  return (
    <>
      <div
        className={`white-background overflow-y-auto ${
          isVisible ? `lg:opacity-100` : `lg:opacity-0`
        } duration-200 ease-in-out transition-opacity flex flex-col gap-8`}
      >
        <h1 className=" ml-10 pt-52">About me</h1>

        <div className="bg-main-green md:w-11/12 sm:w-11/12 w-full h-full">
          <p className="xl:text-2xl text-lg px-12 pt-24 pb-16 bg-main-green">
            Hello, my name is Nawaporn Sriprathet, a Front-end Web Developer
            skilled in React and Tailwind CSS. As a recent university graduate,
            I’m stepping seriously into the web development field, focusing on
            creating responsive, user-friendly websites with clean design.
            <br />
            <br />
            Though new to the field, I’m committed to learning and growing my
            skills and am open to opportunities that will further my
            development. In my free time, I enjoy playing games and listening to
            music, which keep me energized and inspired. &#128523;
          </p>
        </div>
      </div>
      <div
        className={`absolute top-0 right-0 bg-main-green  xl:w-8 w-6 h-full sm:z-10 ${
          isVisible ? `lg:opacity-100` : `lg:opacity-0`
        } duration-200 ease-in-out transition-opacity`}
      />
    </>
  );
};

export default About;
