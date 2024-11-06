import React from "react";

const About = () => {
  return (
    <>
      <div className="absolute top-0 right-0 w-6/12 h-full bg-main-white text-main-black">
        <h1 className="text-7xl ml-10 pt-52">About me</h1>
        <div
          className="bg-main-green w-11/12 mt-8 px-12 pt-24"
          style={{ height: `calc(100vh - 312px)` }}
        >
          <p className="text-2xl">
            Hello, my name is Nawaporn Sriprathet, a Front-end Web Developer
            skilled in React and Tailwind CSS. As a recent university graduate,
            I’m stepping seriously into the web development field, focusing on
            creating responsive, user-friendly websites with clean design.{" "}
            <br />
            <br />
            Though new to the field, I’m committed to learning and growing my
            skills and am open to opportunities that will further my
            development. In my free time, I enjoy playing games and listening to
            music, which keep me energized and inspired. &#128523;
          </p>
          <div className="absolute top-0 right-0 bg-main-green w-8 h-full"></div>
        </div>
      </div>
    </>
  );
};

export default About;
