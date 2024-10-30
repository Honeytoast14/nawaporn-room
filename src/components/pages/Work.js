import React from "react";

const Work = () => {
  const workData = [
    {
      headline: "Touch The Wood",
      caption:
        "Touch The Wood is a thesis game project. In the game, players will play as an orange cat with siblings that fall into a different dimension. While confused, the player's siblings are kidnapped by a villain. The player must explore, solve puzzles, and search for stories in various locations to find their siblings and return to the original world. This game is only available in Thai.",
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
    <div className="scrollbar-hidden">
      <div className="absolute top-0 right-0 w-6/12 h-full bg-main-white text-main-black">
        <h1 className="text-7xl ml-10 mt-52">Works</h1>
        <div className="bg-main-pink h-full w-4/5 mt-8">
          <>
            {workData.map((item, index) => (
              <div className="py-32 px-12 border-b-8 border-main-white border-dashed">
                <h1 className="text-3xl font-bold mb-4">{item.headline}</h1>
                <p className="text-xl mb-7">{item.caption}</p>
                <a rel="" href={item.link} target="_blank">
                  <button className="bg-main-yellow h-12 w-36 text-xl border-solid border border-main-black rounded-xl">
                    {index == 0 ? "Try To Play" : "Visit Website"}
                  </button>
                </a>
              </div>
            ))}
          </>
        </div>
      </div>
      <div className="absolute top-0 right-0 bg-main-pink w-8 h-full "></div>
    </div>
  );
};

export default Work;
