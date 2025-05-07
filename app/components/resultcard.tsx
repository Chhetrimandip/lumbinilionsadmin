import React, { FC } from 'react';
import Image from 'next/image';

interface ScheduleProps {
  match : {
    id: string;
    opponent: string;
    opponentLogo: string;
    matchDate: Date;
    isCompleted: boolean;
    venue?: string;
    victory?: boolean;
    lionsRuns?: number;
    lionsWickets?: number;
    lionsOvers?: number;
    opponentRuns?: number;
    opponentWickets?: number;
    opponentOvers?: number;
    margin?: number;
    marginType?: string;
    ballsLeft?: number;
  }
}

const MatchCard: FC<{ match: ScheduleProps['match'] }> = ({ match }) => {
  const isUpcoming = !match.isCompleted;
  match.margin = match.lionsRuns && match.opponentRuns 
    ? Math.abs(match.lionsRuns - match.opponentRuns) 
    : undefined;
  match.marginType = "run";
  
  return (
    <div className="overflow-hidden py-5 bg-[#050C13] hover:bg-[#162339] transition-all duration-300 shadow-lg">
      {/* Logos section - same for both types */}
      <div className="flex flex-row justify-start w-full">
        <div className="flex-shrink-0 mr-[-8px]">
          <Image src="/logo.png" alt="Lumbini Lions Logo" width={180} height={144} 
            className="w-32 h-22 sm:w-32 sm:h-24 md:scale-120 object-contain drop-shadow-lg" />
        </div>
        <Image src={match.opponentLogo} alt={`${match.opponent} Logo`} width={120} height={120}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg" />
      </div>
      
      {/* Team names with scores underneath */}
      <div className="flex justify-start px-7 mt-3">
        {/* Lions side */}
        <div className="flex flex-col ">
          <span className="text-white font-[poppins] mr-1 font-semibold text-[16px] text-xs sm:text-sm">
            Lumbini Lions <span className='mx-3 hidden md:inline'> vs </span>
          </span>
          {!isUpcoming && (
            <span className="text-white opacity-70 text-xs sm:text-sm mt-2 font-[poppins]">
              {match.lionsRuns}/{match.lionsWickets} 
              {match.lionsOvers && `(${match.lionsOvers})`}
            </span>
          )}
        </div>
        
        {/* VS text
        <div className="flex items-center mt-[-3vh]">
          <span className="text-white mx-5 font-[poppins] font-semibold text-[16px] text-xs sm:text-sm">
            vs
          </span>
        </div> */}
        
        {/* Opponent side */}
        <div className="flex flex-col">
          <span className="text-white font-[poppins] font-semibold text-[16px] text-xs sm:text-sm">
            {match.opponent || "TBD"}
          </span>
          {!isUpcoming && (
            <span className="text-white opacity-70 text-xs mt-2 sm:text-sm font-[poppins]">
              {match.opponentRuns}/{match.opponentWickets}
              {match.opponentOvers && `(${match.opponentOvers})`}
            </span>
          )}
        </div>
      </div>
      
      {isUpcoming ? (
        // Upcoming match section
        <>
          <div className="flex flex-col items-center mt-2 text-white px-5">
            <span className="text-amber-500 font-bold">
              {new Date(match.matchDate).toLocaleDateString('en-US', { 
                weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
              })}
            </span>
            <span className="text-white opacity-70">
              {new Date(match.matchDate).toLocaleTimeString('en-US', { 
                hour: '2-digit', minute: '2-digit' 
              })}
            </span>
            {match.venue && (
              <span className="text-white opacity-70 text-sm mt-1">{match.venue}</span>
            )}
          </div>
        </>
      ) : (
        // Completed match section - just showing result now, scores moved up
        <>
          <hr className="opacity-30 mt-5 mx-7" />
          <p className="text-amber-500 font-[poppins] font-medium pb-3 text-[14px] mt-4 ml-[1.7vw]">
            Lumbini Lions {match.victory 
              ? `won by ${match.margin} ${match.marginType}${match.ballsLeft ? ` (${match.ballsLeft} balls left)` : ''}` 
              : `lost by ${match.margin} ${match.marginType}`}
          </p>
        </>
      )}
    </div>
  );
};

export default MatchCard;