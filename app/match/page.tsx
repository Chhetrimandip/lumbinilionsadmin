import React from 'react';
import Image from 'next/image';
import { Trophy, Calendar, Award, TrendingUp, Target, Activity, Zap, Disc, Shield, Flag, Medal, Star } from 'lucide-react';

const MatchesPage = () => {
  const tournamentlogo = [
    { position: 1, name: "Sudurpaschim Royals", points: 12, matches: 7, wins: 6, losses: 1, logo: "/logos/sudurpaschim.png" },
    { position: 2, name: "Janakpur Bolts", points: 10, matches: 7, wins: 5, losses: 2, logo: "/logos/janakpur.png" },
    { position: 3, name: "Chitwan Rhinos", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/chitwan.png" },
    { position: 4, name: "Karnali Yaks", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/karnali.png" },
    { position: 5, name: "Kathmandu Gurkhas", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/kathmandu.png" },
    { position: 6, name: "Biratnagar Kings", points: 4, matches: 7, wins: 2, losses: 5, logo: "/logos/biratnagar.png" },
    { position: 7, name: "Pokhara Avengers", points: 4, matches: 7, wins: 2, losses: 5, logo: "/logos/pokhara.png" },
    { position: 8, name: "Lumbini Lions", points: 2, matches: 7, wins: 1, losses: 6, logo: "/logos/lumbini.png" }
  ];

  const upcomingMatches = [
    {
      id: 1,
      homeTeam: {
        name: "Lions",
        logo: "/logo.png"
      },
      awayTeam: {
        name: "Kings",
        logo: "/kathmandu.png"
      },
      matchNumber: "Match #1",
      date: "May 15, 2023",
      time: "2:00 PM",
      venue: "Lumbini Cricket Stadium"
    },
    {
      id: 2,
      homeTeam: {
        name: "Avengers",
        logo: "/pokhara.png"
      },
      awayTeam: {
        name: "Lions",
        logo: "/logo.png"
      },
      matchNumber: "Match #2",
      date: "May 22, 2023",
      time: "4:30 PM",
      venue: "Pokhara Stadium"
    },
    {
      id: 3,
      homeTeam: {
        name: "Lions",
        logo: "/logo.png"
      },
      awayTeam: {
        name: "Rhinos",
        logo: "/chitwan.png"
      },
      matchNumber: "Match #3",
      date: "May 29, 2023",
      time: "2:00 PM",
      venue: "Lumbini Cricket Stadium"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#06101B] to-[#0A192F] text-white min-h-screen py-12">
      {/* Tournament Header */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-amber-500/10 blur-3xl z-0"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Trophy className="w-10 h-10 text-amber-500 mr-4" />
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">NPL</h1>
                  <p className="text-2xl font-bold text-white/80">2024</p>
                </div>
              </div>
            </div>
            <div className="relative h-28 w-28 md:h-32 md:w-32">
              <Image 
                src="/logos/lumbini.png" 
                alt="Lumbini Lions Logo" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Tournament Standings Table */}
        {/* <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/5">
          <div className="p-4 md:p-6 border-b border-amber-500/20">
            <h2 className="text-2xl font-bold flex items-center">
              <Award className="w-6 h-6 text-amber-500 mr-2" />
              Tournament Standings
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-500/10 text-amber-400">
                  <th className="py-4 px-4 text-left font-semibold">Pos</th>
                  <th className="py-4 px-4 text-left font-semibold">Team</th>
                  <th className="py-4 px-4 text-center font-semibold">Mat</th>
                  <th className="py-4 px-4 text-center font-semibold">W</th>
                  <th className="py-4 px-4 text-center font-semibold">L</th>
                  <th className="py-4 px-4 text-right font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {tournamentlogo.map((team) => (
                  <tr 
                    key={team.position} 
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      team.name === "Lumbini Lions" ? "bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                          team.position <= 3 
                            ? "bg-amber-500 text-black font-bold" 
                            : team.position === 4 
                              ? "bg-amber-500/30 text-white font-bold"
                              : "bg-white/10 text-white/70"
                        }`}>
                          {team.position}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-white/10 mr-3 relative overflow-hidden">
                          <Image 
                            src={team.logo} 
                            alt={team.name} 
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className={`${team.name === "Lumbini Lions" 
                          ? "font-bold text-amber-400" 
                          : ""}`}>
                          {team.name}
                        </span>
                        {team.position === 1 && (
                          <Medal className="w-5 h-5 text-amber-500 ml-2" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {team.matches}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-green-400">{team.wins}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-red-400">{team.losses}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-lg bg-amber-500/10 px-3 py-1 rounded-full">
                        {team.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-sm text-gray-400 border-t border-white/5 bg-white/5">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                <span>Top 3 - Direct Qualifiers</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500/30 mr-2"></div>
                <span>4th - Play-Off Qualifier</span>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Upcoming Matches Section - Added from thirdpage.tsx */}
        <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/5">
          <div className="p-4 md:p-6 border-b border-amber-500/20">
            <h2 className="text-2xl font-bold flex items-center">
              <Calendar className="w-6 h-6 text-amber-500 mr-2" />
              Upcoming Matches
            </h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col gap-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="bg-neutral-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 hover:bg-neutral-800/90 transition-colors border border-neutral-800">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="text-center w-20">
                        <Image 
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">{match.homeTeam.name}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold">VS</span>
                      </div>
                      <div className="text-center w-20">
                        <Image 
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">{match.awayTeam.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-right">
                      <div className="flex flex-col md:items-end">
                        <p className="text-amber-500 text-lg md:text-xl font-['Bebas_Neue'] uppercase">{match.matchNumber}</p>
                        <p className="text-gray-400">{match.date} • {match.time}</p>
                        <p className="text-white font-semibold mt-1">{match.venue}</p>
                        <button className="mt-3 inline-block bg-amber-600 hover:bg-amber-700 text-black font-semibold px-4 py-2 rounded transition-colors text-sm">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-lg transition-colors border border-neutral-700 font-['Bebas_Neue'] text-xl tracking-wide">
                VIEW FULL SCHEDULE
              </button>
            </div>
          </div>
        </section>

        {/* Team Summary */}
        <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl border border-amber-500/30 overflow-hidden shadow-lg shadow-amber-500/5">
          <div className="p-4 md:p-6 border-b border-amber-500/20">
            <h2 className="text-2xl font-bold flex items-center">
              <Target className="w-6 h-6 text-amber-500 mr-2" />
              Lumbini Lions Summary
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Matches</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Wins</p>
              <p className="text-3xl font-bold">1</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Activity className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Losses</p>
              <p className="text-3xl font-bold">6</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Award className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Points</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Net Run Rate</p>
              <p className="text-3xl font-bold">-0.50</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Zap className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Runs Scored</p>
              <p className="text-3xl font-bold">1,013</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Shield className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Runs Conceded</p>
              <p className="text-3xl font-bold">1,057</p>
            </div>

            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Flag className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Status</p>
              <p className="text-xl font-bold text-amber-500">Eliminated</p>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Batsmen */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Star className="w-5 h-5 mr-2" />
              Top Batsmen
            </h2>
            <ul className="space-y-4">
              <li className="pb-3 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">                     
                     <Image
                      src="/team/rohitcard.png"
                      alt='Rohit'
                      height={50}
                      width={50}
                      />
                    <strong>Rohit Paudel</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 132.60</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">279 runs</div>
              </li>
              <li className="pb-3 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                  <Image
                      src="/team/tomcard.png"
                      alt='Tom'
                      height={50}
                      width={50}
                      />
                    <strong>Tom Moores</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 136.66</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">123 runs</div>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                  <Image
                      src="/team/bibekcard.png"
                      alt='Bibek'
                      height={50}
                      width={50}
                      />
                    <strong>Bibek Yadav</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 153.12</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">83 runs</div>
              </li>
            </ul>
          </section>

          {/* Top Bowler */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Disc className="w-5 h-5 mr-2" />
              Top Bowler
            </h2>
            <div className="text-center">
                <div className="inline-block h-36 w-55 mb-4 relative">
                <div className="absolute scale:1.2 inset-0 flex items-center justify-center text-2xl font-bold text-amber-500">
                <Image
                      src="/team/saadcard.png"
                      alt='Saad'
                      height={200}
                      width={200}
                      
                      /> 
                  </div>
              </div>
              <div className="text-2xl font-bold mb-4">Saad Bin Zafar</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">9</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Wickets</div>
                </div>
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">6.5</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Economy</div>
                </div>
              </div>
            </div>
          </section>

          {/* Boundary Stats */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Zap className="w-5 h-5 mr-2" />
              Boundary Stats
            </h2>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-6">Total Boundary Runs: 624</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">84</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Fours</div>
                </div>
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">48</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Sixes</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MatchesPage;