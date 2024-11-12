import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  const itemRef = React.useRef();

  useGSAP(() => {
    gsap.to(itemRef.current, {
      scrollTrigger: {
        scroller: scroller.current,
        trigger: itemRef.current,
        start: "top 65%",
        end: "120% 50%",
        onEnter: () => onEnterHeadline(headline),
        onEnterBack: () => onEnterHeadline(headline),
        markers: true,
      },
    });
  });

  return (
    <div
      className={`bg-main-pink w-4/5 py-32 px-12 ${
        isLast ? `border-none` : `border-b-8 border-main-white border-dashed`
      }`}
    >
      <div ref={itemRef} className="w-auto h-auto">
        <h1 className="text-3xl font-bold mb-4 head">{headline}</h1>
        <p className="text-xl">{caption}</p>
        {caption2 !== null ? (
          <p className="text-xl mb-7 font-semibold text-red-500">{caption2}</p>
        ) : (
          ""
        )}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="bg-main-yellow h-12 w-36 text-xl rounded-xl hover-button">
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  );
};

const Work = ({ headline }) => {
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

  const scroller = useRef();

  return (
    <div className="flex">
      <div
        ref={scroller}
        className="absolute top-0 right-0 w-6/12 h-full bg-main-white text-main-black overflow-y-auto z-10"
      >
        <h1 className="text-7xl ml-10 pt-52 mb-8 header">Works</h1>
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
            onEnterHeadline={headline}
          />
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-main-pink w-8 h-full"></div>
    </div>
  );
};

export default Work;
