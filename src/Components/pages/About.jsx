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
            Hello! <br />
            My name is Nawaporn Sriprathet, and I’m a passionate Front-end Web
            Developer specializing in React and Tailwind CSS. As a recent
            university graduate, I’m diving headfirst into the web development
            field, dedicated to crafting responsive, user-friendly websites with
            clean and modern designs.
            <br />
            <br />
            Although I’m at the beginning of my journey, I’m eager to learn,
            grow, and embrace opportunities that challenge me to develop
            further. When I’m not coding, I enjoy playing games and listening to
            music—activities that keep me inspired and energized. &#128523;
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
