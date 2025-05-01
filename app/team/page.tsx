"use client"
import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard';
import { usePlayerData } from '../hooks/usePlayerData';
import { PlayerClass } from '@prisma/client';

const TeamPage = () => {
    const {players, loading, error} = usePlayerData();
    const [filteredData, setFilteredData] = useState<typeof players>([]);
    const [searchItem,setSearchItem] = useState<string | null>(null);
    useEffect(() => {
        if(!players) return;
        if(searchItem===null) {
            setFilteredData(players)
        } else {
            setFilteredData(players.filter(player => 
                player.class === searchItem));
        }
    }, [searchItem, players]); // This closing parenthesis was in the wrong place

        if(loading){
            return<div>loading...</div>
        }
        if (error) {
            return <div>Error loading players</div>;
        }
                // Batsman
            //WicketKeeper
            //AllRounder
            //Bowler
    return (
        <div className="w-full max-w-6xl py-30 mx-auto">
            <div className='text-white flex gap-4 mb-8 justify-center'>
                <button 
                    onClick={() => setSearchItem(null)}
                    className={`px-4 py-2 rounded ${searchItem === null ? 'bg-amber-500 text-black' : 'bg-gray-700'}`}
                >
                    All players
                </button>
                <button 
                    onClick={() => setSearchItem("AllRounder")}
                    className={`px-4 py-2 rounded ${searchItem === "AllRounder" ? 'bg-amber-500 text-black' : 'bg-gray-700'}`}
                >
                    All rounders
                </button>
                <button 
                    onClick={() => setSearchItem("Bowler")}
                    className={`px-4 py-2 rounded ${searchItem === "Bowler" ? 'bg-amber-500 text-black' : 'bg-gray-700'}`}
                >
                    Bowlers
                </button>
                <button 
                    onClick={() => setSearchItem("Batsman")}
                    className={`px-4 py-2 rounded ${searchItem === "Batsman" ? 'bg-amber-500 text-black' : 'bg-gray-700'}`}
                >
                    Batters
                </button>
                <button 
                    onClick={() => setSearchItem("WicketKeeper")}
                    className={`px-4 py-2 rounded ${searchItem === "WicketKeeper" ? 'bg-amber-500 text-black' : 'bg-gray-700'}`}
                >
                    Wicket Keepers
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 lg:gap-8 w-full">
                {filteredData.map((player, index) => (
                    <div 
                        key={player?.id ? `${player.id}-${index}` : `empty-${index}`} 
                        className="transition-all duration-500 ease-in-out transform hover:scale-105"
                    >
                        {player && <PlayerCard player={player} />}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TeamPage;