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
          <p className="mb-7 text-lg font-semibold text-red-500 xl:text-xl">
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
        "Touch The Wood is a thesis game project. In the game, players will play as an orange cat with siblings that fall into a different dimension. While confused, the player's siblings are kidnapped by a villain. The player must explore, solve puzzles, and search for stories in various locations to find their siblings and return to the original world.",
      caption2: "**This game is only available in Thai language.**",
      link: "https://drive.google.com/drive/folders/1TxpDMDayaJMrF_gY0zFZqorCZ20y_DK3?usp=sharing",
    },
    {
      headline: "Solar System",
      caption:
        "Solar System is a website about the solar system in 3D that tells information about each planet and also has sounds from that planet.",
      link: "https://ssolar-system.web.app/",
    },
    {
      headline: "Learn2Safe",
      caption:
        "A sex education website that has videos, quizzes, infographics, and tests to see if you understand the content. The website covers topics such as STDs, safe sex, and risky situations and skills.",
      link: "https://learn2safe.web.app/",
    },
    {
      headline: "QALLZ",
      caption:
        "I have been involved in creating a mock-up website for selling my work and my friends' work. This website was assigned by my professor during college.",
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
