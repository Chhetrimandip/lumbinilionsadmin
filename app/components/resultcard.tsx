import React, { FC } from 'react';

interface ResultProp {
  result: {
    teamLogo: string;
    team2: string;
    victory: boolean;
    margin: Number;
  };
}

const Resultcard: FC<{ result: ResultProp['result'] }> = ({ result }) => {
  return (
    <div className="bg-white/10 hover:bg-white/20 transition-colors duration-300 px-6 py-4 rounded-lg shadow-md flex justify-between items-center w-full">
      {/* Left Side: Logo and Match */}
      <div className="flex items-center gap-4">
        <img
          src={result.teamLogo}
          alt="Team Logo"
          className="w-12 h-12 rounded-full border border-white shadow-md"
        />
        <span className="text-lg text-white font-semibold tracking-wide font-['Bebas_Neue'] uppercase">
          Lumbini Lions vs {result.team2}
        </span>
      </div>

      {/* Right Side: Result */}
      <div
        className={`text-base font-bold tracking-wider uppercase ${
          result.victory ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {result.victory
          ? `Won by ${result.margin}`
          : `Lost by ${result.margin}`}
      </div>
    </div>
  );
};

export default Resultcard;
