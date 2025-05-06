"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroPlayers() {
  // Left players will cycle through 1-5
  const [leftIndex, setLeftIndex] = useState(0);
  // Right players will cycle through 7-11
  const [rightIndex, setRightIndex] = useState(0);
  // Track screen width for responsive layout
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Define the fixed player arrays
  const leftPlayers = [1, 2, 3, 4, 5];
  const rightPlayers = [7, 8, 9, 10, 11]; 
  
  // Check screen size on mount and resize
  // State to track if component is loaded
  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after component mounts
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  

  const containerClass = `relative w-full fade-in-on-scroll h-full flex items-center justify-center ${isloaded ? 'show' : ''}`;
  return (
        <div className="absolute inset-0 z-[3] md:top-[150px] top-[75px] flex items-center justify-center">

        {/* Player images with staggered positioning and z-index */}
        <div className={containerClass}>
        <div className="absolute z-[0] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image 
            src="/ellipse.png"
            alt="Background ellipse" 
            height={560} 
            width={1200} 
            className="player-image scale-220 md:scale-120 lg:scale-130 xl:scale-100" 
          />
        </div>
          {/* Left-most player (layer 1) - hidden on small screens */}
          {!isSmallScreen && (
            <div className="absolute md:left-[14%]  left-[10%] transform translate-y-[10%] translate-x-[20%] z-[1] transition-all duration-1000">
              <Image 

                src="/players/tilakleftest.png" //4
                // src="/players/bikashleft.png" //4
                // src={`/players/${leftPlayers[(leftIndex) % 5]}.png`} 
                alt={`player${leftPlayers[(leftIndex) % 5]}`} 
                height={550} 
                width={275} 
                className="player-image md:scale-125 lg:scale-135 xl:scale-160" 
                />
            </div>
          )} 
          
          {/* Left player (layer 2) - shown on all screens */}
          <div 
            className={`absolute ${
              isSmallScreen 
              ? 'left-0 transform -translate-x-[20vw] scale-125 translate-y-[2vh]' 
              : 'md:left-[25%] left-[15%] transform  scale-120 translate-y-[25%] translate-x-[5%]'
            } z-[2] transition-all duration-1000`}
          >
            <Image 
            //   src={`/players/${leftPlayers[(leftIndex + 1) % 5]}.png`} 
            src="/players/bibekleft.png"
            // src="/players/benright.png"
            alt={`player${leftPlayers[(leftIndex + 1) % 5]}`} 
            height={isSmallScreen ? 520 : 560} 
            width={isSmallScreen ? 260 : 280} 
            className="player-image transform md:-translate-x-[20px] md:scale-120 lg:scale-130 xl:scale-160" 
            />
          </div>
          
          {/* Center player (layer 5 - top) - stays the same */}
          <div className="absolute z-[5] transform scale-110 md:translate-y-[20%] translate-x-[15px] md:scale-125 lg:scale-160 xl:scale-180">
            <Image 
              src="/players/rohitcenter.png" 
              alt="player8" 
              height={590} 
              width={350} 
              className="player-image"
              priority 
              />
          </div>
          
          {/* Right player (layer 2) - shown on all screens */}
          <div 
            className={`absolute ${
              isSmallScreen 
              ? 'right-0 transform translate-y-[1vh] scale-110 translate-x-[25%]' 
                : 'md:right-[32%] scale-110 right-[15%] transform translate-y-[27%] translate-x-[20%]'
              } z-[2] transition-all duration-1000`}
              >
            <Image 
            //   src={`/players/${rightPlayers[(rightIndex) % 5]}.png`} 
            src="/players/arjunright.png"
            // src="/players/tomleft.png"
              alt={`player${rightPlayers[(rightIndex) % 5]}`} 
              height={isSmallScreen ? 520 : 560} 
              width={isSmallScreen ? 260 : 280} 
              className="player-image md:scale-110 lg:scale-130 xl:scale-160" 
              />
          </div>

          {!isSmallScreen && (
            <div className="absolute md:right-[22%] right-[10%] transform translate-x-[15%] scale-110 translate-y-[17%] z-[1] transition-all duration-1000">
              <Image 
                // src={`/players/${rightPlayers[(rightIndex + 1) % 5]}.png`} 
                // src="/players/bibekright.png"
                src="/players/aashutoshrightest.png"
                alt={`player${rightPlayers[(rightIndex + 1) % 5]}`} 
                height={550} 
                width={275} 
                className="transform -translate-x-[10px] player-image md:scale-125 lg:scale-135 xl:scale-160"  //10
              />
            </div>
          )}
        </div>
      </div>
)}