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
  
  // Cycle player images
  useEffect(() => {
    // Change player images every 10 seconds
    const interval = setInterval(() => {
      // Cycle through left players
      setLeftIndex((prevIndex) => (prevIndex + 1) % leftPlayers.length);
      // Cycle through right players
      setRightIndex((prevIndex) => (prevIndex + 1) % rightPlayers.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [leftPlayers.length, rightPlayers.length]);
  
  return (
    <div className="absolute inset-0 z-[3] md:top-[150px] top-[75px] flex items-center justify-center">
      <div className="relative w-full fade-in-on-scroll h-full flex items-center justify-center">            
        {/* Player images with staggered positioning and z-index */}
        <div className="relative h-[572px] w-full max-w-[1100px] flex items-center justify-center">
          {/* Left-most player (layer 1) - hidden on small screens */}
          {!isSmallScreen && (
            <div className="absolute md:left-[15%] left-[10%] transform -translate-x-[15%] z-[1] transition-all duration-1000">
              <Image 
                src="/players/bikashleft.png" //4
                // src={`/players/${leftPlayers[(leftIndex) % 5]}.png`} 
                alt={`player${leftPlayers[(leftIndex) % 5]}`} 
                height={550} 
                width={275} 
                className="player-image md:scale-125 lg:scale-135 xl:scale-150" 
              />
            </div>
          )} 
          
          {/* Left player (layer 2) - shown on all screens */}
          <div 
            className={`absolute ${
              isSmallScreen 
                ? 'left-0 transform -translate-x-[10%]' 
                : 'md:left-[25%] left-[15%] transform -translate-x-[5%]'
            } z-[2] transition-all duration-1000`}
          >
            <Image 
            //   src={`/players/${leftPlayers[(leftIndex + 1) % 5]}.png`} 
              src="/players/tomleft.png"
              alt={`player${leftPlayers[(leftIndex + 1) % 5]}`} 
              height={isSmallScreen ? 520 : 560} 
              width={isSmallScreen ? 260 : 280} 
              className="player-image md:scale-120 lg:scale-130 xl:scale-150" 
            />
          </div>
          
          {/* Center player (layer 5 - top) - stays the same */}
          <div className="absolute z-[5] transform scale-110 md:scale-125 lg:scale-160 xl:scale-170">
            <Image 
              src="/players/rohitcenter.png" 
              alt="player8" 
              height={590} 
              width={295} 
              className="player-image"
              priority 
            />
          </div>
          
          {/* Right player (layer 2) - shown on all screens */}
          <div 
            className={`absolute ${
              isSmallScreen 
                ? 'right-0 transform translate-x-[10%]' 
                : 'md:right-[30%] right-[15%] transform translate-x-[10%]'
            } z-[2] transition-all duration-1000`}
          >
            <Image 
            //   src={`/players/${rightPlayers[(rightIndex) % 5]}.png`} 
              src="/players/benright.png"
              alt={`player${rightPlayers[(rightIndex) % 5]}`} 
              height={isSmallScreen ? 520 : 560} 
              width={isSmallScreen ? 260 : 280} 
              className="player-image md:scale-110 lg:scale-130 xl:scale-150" 
            />
          </div>
          
            <Image 
            //   src={`/players/${rightPlayers[(rightIndex) % 5]}.png`} 
              src="/ellipse.png"
              alt={`player${rightPlayers[(rightIndex) % 5]}`} 
              height={isSmallScreen ? 520 : 560} 
              width={isSmallScreen ? 260 : 280} 
              className="player-image md:scale-120 lg:scale-130 xl:scale-300" 
            />
          {/* Right-most player (layer 1) - hidden on small screens */}
          {!isSmallScreen && (
            <div className="absolute md:right-[15%] right-[10%] transform translate-x-[15%] z-[1] transition-all duration-1000">
              <Image 
                // src={`/players/${rightPlayers[(rightIndex + 1) % 5]}.png`} 
                src="/players/bibekright.png"
                alt={`player${rightPlayers[(rightIndex + 1) % 5]}`} 
                height={550} 
                width={275} 
                className="player-image md:scale-125 lg:scale-135 xl:scale-150"  //10
              />
            </div>
          )}
        </div>
      </div>
    </div>
)}