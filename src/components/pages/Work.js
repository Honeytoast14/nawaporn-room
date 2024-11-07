import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WorkItem = ({ headline, caption, link, buttonText, isLast }) => {
  const itemRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      itemRef.current,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%",
          end: "top 30%",
          markers: true,
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
      }
    );
  });

  return (
    <div
      ref={itemRef}
      className={`bg-main-pink w-4/5 py-32 px-12 ${
        isLast ? `border-none` : `border-b-8 border-main-white border-dashed`
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">{headline}</h1>
      <p className="text-xl mb-7">{caption}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="bg-main-yellow h-12 w-36 text-xl  rounded-xl hover-button">
          {buttonText}
        </button>
      </a>
    </div>
  );
};

const Work = () => {
  const workData = [
    {
      headline: "Touch The Wood",
      caption:
        "Touch The Wood is a thesis game project. In the game, players will play as an orange cat with siblings that fall into a different dimension. While confused, the player's siblings are kidnapped by a villain. The player must explore, solve puzzles, and search for stories in various locations to find their siblings and return to the original world. This game is only available in Thai language.",
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
    <div className="flex">
      <div className="absolute top-0 right-0 w-6/12 h-full bg-main-white text-main-black overflow-y-scroll">
        <h1 className="text-7xl ml-10 pt-52 mb-8 header">Works</h1>
        {workData.map((item, index) => (
          <WorkItem
            key={index}
            headline={item.headline}
            caption={item.caption}
            link={item.link}
            buttonText={index === 0 ? "Try To Play" : "Visit Website"}
            isLast={index === workData.length - 1}
          />
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-main-pink w-8 h-full"></div>
    </div>
  );
};

export default Work;
