import React from "react";

const ACHIEVEMENTS = [
  { title: "+220", description: "Happy Patients" },
  { title: "+15", description: "Professional Doctors & Nurses" },
  { title: "$1M", description: "Investment in Health Tech" },
  { title: "+5", description: "Years of Healthcare Excellence" },
  { title: "24/7", description: "Open for Emergency Services" },
];

function Achievements() {
    return (
      <div className="bg-slate-200 py-6 md:py-12 px-1 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-scroll flex">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[210px] md:w-[320px] px-4 mx-4 flex flex-col items-center text-center"
              >
                <h3 className="text-3xl md:text-5xl 2xl:text-7xl font-bold text-[#00A0DC]">
                  {achievement.title}
                </h3>
                <p className="text-[#2a6f97] text-center text-sm md:text-xl font-semibold mt-2">
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
                <h3 className="text-3xl md:text-5xl 2xl:text-7xl font-bold text-[#00A0DC]">
                  {achievement.title}
                </h3>
                <p className="text-[#2a6f97] text-center text-sm md:text-xl font-semibold mt-2">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Achievements;
