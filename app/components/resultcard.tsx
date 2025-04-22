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
    <div className="overflow-hidden bg-white/10 hover:bg-white/20 transition-colors duration-300 px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center w-full gap-3 sm:gap-0">
      {/* Left Side: Logo and Match */}
      <div className="flex items-center gap-3 max-w-[65%] sm:max-w-[70%] mb-2 sm:mb-0">
        <img
          src={result.teamLogo}
          alt="Team Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white shadow-md flex-shrink-0"
        />
        <div className="text-white overflow-hidden">
          <div className="text-sm sm:text-base font-medium text-xl tracking-wide ">
            Lumbini Lions <span className="text-gray-300 text-xs mx-1">vs</span> {result.team2}
          </div>
        </div>
      </div>

      {/* Right Side: Result */}
      <div
        className={`text-sm sm:text-base font-medium ${
          result.victory ? 'text-green-400' : 'text-red-400'
        } flex items-center flex-shrink-0`}
      >
        <span>{result.victory ? 'Won' : 'Lost'}</span>
        <span className="text-xs text-gray-300 mx-1">by</span>
        <span className="font-semibold">{result.margin.toString()}</span>
      </div>
    </div>
  );
};

export default Resultcard;