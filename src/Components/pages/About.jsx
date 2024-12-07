// import Navbar from "../Navbar";

const About = () => {
  return (
    <>
      <div
        className={`white-background flex flex-col gap-8 sm:h-full sm:overflow-y-auto`}
      >
        {/* <Navbar/> */}
        <h1 className="flex-none pt-52 text-center sm:ml-10 sm:text-left">
          About me
        </h1>
        <div className="w-full flex-1 bg-main-green sm:[width:77%] md:w-4/5 lg:[width:70%] xl:w-9/12">
          <p className="px-12 pb-16 pt-24 text-lg 2xl:text-xl">
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
        className={`absolute right-0 top-0 h-auto w-6 flex-none bg-main-green sm:z-10 sm:h-full xl:w-8`}
      />
    </>
  );
};

export default About;
