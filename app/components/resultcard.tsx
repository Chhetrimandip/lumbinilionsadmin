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
  match.marginType = "run"
  console.log("Match data : ", match)
  return (
    <div className="overflow-hidden py-5 bg-[#050C13] hover:bg-[#162339] transition-all duration-300 shadow-lg">
      {/* Logos section - same for both types */}
      <div className="flex flex-row items-center p-5 w-full">
        <div className="flex-shrink-0 mr-2">
          <Image src="/logo.png" alt="Lumbini Lions Logo" width={180} height={144} 
            className="w-32 h-22 sm:w-32 sm:h-24 object-contain drop-shadow-lg" />
        </div>
        <Image src={match.opponentLogo} alt={`${match.opponent} Logo`} width={120} height={120}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg" />
      </div>
      
      {/* Team names - same for both */}
      <span className="text-white px-5 font-[poppins] font-semibold text-[16px] text-xs sm:text-sm text-center">
        LUMBINI LIONS VS {match.opponent?.toUpperCase() || "TBD"}
      </span>
      
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
        // Completed match section
      <>
        <div className="flex font-[poppins] font-semiblod text-[16px] justify-between mt-2 text-white px-5 opacity-70">
          <span>
            {match.lionsRuns}/{match.lionsWickets} 
            {match.lionsOvers && `(${match.lionsOvers})`}
          </span>
          <span>
            {match.opponentRuns}/{match.opponentWickets}
            {match.opponentOvers && `(${match.opponentOvers})`}
          </span>
        </div>
        <hr className="opacity-30" />
        <p className="text-amber-500 px-5 mt-2">
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