/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const WorkItem = ({
  headline,
  caption,
  caption2,
  link,
  buttonText,
  isLast,
  scroller,
  onEnterHeadline,
}) => {
  const itemRef = useRef();
  useEffect(() => {
    if (itemRef.current && scroller.current) {
      ScrollTrigger.create({
        scroller: scroller.current,
        trigger: itemRef.current,
        start: "top 65%",
        end: "120% 50%",
        markers: false,
        onEnter: () => onEnterHeadline(headline),
        onEnterBack: () => onEnterHeadline(headline),
      });
    }

    return () => ScrollTrigger.refresh();
  }, [scroller, onEnterHeadline, headline]);

  return (
    <div
      className={`md:pink-bg w-full bg-main-pink px-12 py-28 sm:[width:77%] lg:py-32 lg:[width:70%] xl:w-9/12 ${
        isLast ? `border-none` : `border-b-8 border-dashed border-main-white`
      }`}
    >
      <div ref={itemRef} className="h-auto w-auto scroller">
        <h1 className="head mb-4 text-2xl font-bold">{headline}</h1>
        <p className="text-lg xl:text-xl">{caption}</p>
        {caption2 !== null ? (
          <p className="mb-7 text-lg font-semibold text-red-500 xl:text-xl italic">
            {caption2}
          </p>
        ) : (
          ""
        )}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="hover-button h-11 w-32 rounded-xl bg-main-yellow text-base xl:h-12 xl:w-36 xl:text-xl">
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  );
};

const Work = ({ setHeadline }) => {
  const scroller = useRef();

  const workData = [
    {
      headline: "Touch The Wood",
      caption:
        "Touch The Wood is a thesis game project where players take on the role of an orange cat who along with its siblings falls into a different dimension. While confused, the siblings are kidnapped by a villain. Players must explore, solve puzzles, and uncover stories in various locations to rescue the siblings and return to their original world.",
      caption2: "Note: This game is available only in Thai.",
      link: "https://drive.google.com/drive/folders/1TxpDMDayaJMrF_gY0zFZqorCZ20y_DK3?usp=sharing",
    },
    {
      headline: "Solar System",
      caption:
        "Solar System is a 3D interactive website about the solar system. It provides detailed information about each planet and features audio that represents the unique sounds of each planet.",
      link: "https://ssolar-system.web.app/",
    },
    {
      headline: "Learn2Safe",
      caption:
        "Learn2Safe is a sex education website featuring videos, quizzes, infographics, and tests to assess users understanding. The website covers topics such as STDs, safe sex practices, and risky situations, as well as practical skills for safety and awareness.",
      link: "https://learn2safe.web.app/",
    },
    {
      headline: "QALLZ",
      caption:
        "QALLZ is a mock-up website designed for selling my work and the work of my friends. This project was assigned by my professor during my time in college.",
      link: "https://qallz-real.web.app/",
    },
  ];

  return (
    <>
      <div
        ref={scroller}
        className={`white-background scrollbar-hidden sm:h-full sm:overflow-y-auto`}
      >
        <h1 className="mb-8 pt-52 text-center sm:ml-10 sm:text-left">Works</h1>
        {workData.map((item, index) => (
          <WorkItem
            key={index}
            headline={item.headline}
            caption={item.caption}
            caption2={item.caption2}
            link={item.link}
            buttonText={index === 0 ? "Try To Play" : "Visit Website"}
            isLast={index === workData.length - 1}
            scroller={scroller}
            onEnterHeadline={setHeadline}
          />
        ))}
      </div>
      <div
        className={`absolute right-0 top-0 h-full w-6 flex-none bg-main-pink sm:z-10 xl:w-8`}
      />
    </>
  );
};

export default Work;
