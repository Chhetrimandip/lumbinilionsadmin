import React, { FC } from 'react';
import Image from 'next/image';

interface ResultProp {
  result: {
    teamLogo: string;
    team2: string;
    victory: boolean;
    margin: number;
  };
}

const Resultcard: FC<{ result: ResultProp['result'] }> = ({ result }) => {
  return (
    <div className="overflow-hidden py-5 bg-[#050C13] hover:bg-[#162339] transition-all duration-300  shadow-lg  ">
      <div className="flex flex-row sm:flex-row items-center p-5 w-full">
        {/* Lumbini Lions Logo - Made wider */}
        <div className="flex-shrink-0 mr-2">
          <Image
            src="/logo.png"
            alt="Lumbini Lions Logo"
            width={180}
            height={144}
            className="w-32 h-22 sm:w-32 sm:h-24 object-contain drop-shadow-lg"
          />
        </div>                                                        
        <Image
          src={result.teamLogo}
          alt={`${result.team2} Logo`}
          width={120}
          height={120}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
        />

        {/* Match Result Section *
        <div className="py-4 px-6 flex flex-col items-center bg-black/20 w-full sm:w-auto">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xl sm:text-2xl font-bold ${result.victory ? 'text-green-500' : 'text-red-500'}`}>
              {result.victory ? 'Won' : 'Lost'}
            </span>
            <span className="text-xs text-gray-400 mx-1">by</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-500">{result.margin}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">runs/wickets</div>
        </div>
        
        {/* Opponent Section */}


          </div>
            <span className="text-white px-5 object-contain font-normal text-bold text-xs sm:text-sm text-center">LUMBINI LIONS VS {result.team2.toUpperCase()}</span>

          <div className="flex  gap-16 mt-2 text-white px-5 opacity-70">
            <span>154 (19.5)</span>
          
            <span>155 (18.4)</span>
          </div>
          <hr className='opacity-30 '/>
          <p className='text-amber-500 px-5 mt-2 mb-'>
            Lumbini Lions {result.victory ? `won by ${result.margin} wickets (8 balls left)` : `lost by ${result.margin} runs`}
          </p>

            </div>
        );
      };

      export default Resultcard;