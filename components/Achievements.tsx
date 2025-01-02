import React from "react";
import ACHIEVEMENTS from "@/lib/data/achievements";

function Achievements() {
  return (
    <section className="bg-gradient-to-b from-bgBlue to-bgGreen">
      <div className="py-6 md:py-12 md:mt-6 px-1 overflow-hidden ">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-scroll flex">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[210px] md:w-[320px] px-4 mx-4 flex flex-col items-center text-center"
              >
                <h3 className="text-3xl md:text-5xl 2xl:text-7xl font-bold text-secondary">
                  {achievement.title}
                </h3>
                <p className="text-primary text-center text-sm md:text-xl font-semibold mt-2">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
          <div className="animate-scroll flex max-w" aria-hidden="true">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[210px] md:w-[320px] px-4 mx-4 flex flex-col items-center text-center"
              >
                <h3 className="text-3xl md:text-5xl 2xl:text-7xl font-bold text-secondary">
                  {achievement.title}
                </h3>
                <p className="text-primary text-center text-sm md:text-xl font-semibold mt-2">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
