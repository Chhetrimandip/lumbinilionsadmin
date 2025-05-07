"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroPlayers() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [leftPlayerIndex, setLeftPlayerIndex] = useState(0);
  const [rightPlayerIndex, setRightPlayerIndex] = useState(0);
  
  // Define arrays of images for left and right positions
  const leftPlayers = [
    { src: "/players/unmuktleftest1.png", alt: "unmukt" },
    { src: "/players/sundeepleftest.png", alt: "sundeep" },
    { src: "/players/suryaleftest.png", alt: "surya" },
    { src: "/players/tilakleftest1.png", alt: "Tilak" },
    { src: "/players/arjunleftest1.png", alt: "arjun" },
    { src: "/players/dineshleftest.png", alt: "dinesh" },
    { src: "/players/arifleftest.png", alt: "arif" },
  ];
  
  const rightPlayers = [
    { src: "/players/saadrightest.png", alt: "saad" },
    { src: "/players/ramonrightest.png", alt: "Ramon" },
    { src: "/players/bibekrightest.png", alt: "Bibek" },
    { src: "/players/abhisheshrightest.png", alt: "Abhishesh" },
    { src: "/players/bikashrightest.png", alt: "bikash" },
    { src: "/players/durgeshrightest.png", alt: "durgesh" },
    { src: "/players/aashutoshrightest.png", alt: "aashutosh" },

  ];
  
  useEffect(() => {
    // Set isLoaded to true after component mounts
    setIsLoaded(true);
    
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
  
  // Player rotation effect
  useEffect(() => {
    if (isSmallScreen) return; // Don't rotate on mobile
    
    const rotationInterval = setInterval(() => {
      setLeftPlayerIndex(prev => (prev + 1) % leftPlayers.length);
      setRightPlayerIndex(prev => (prev + 1) % rightPlayers.length);
    }, 5000); // Change every 10 seconds todo
    
    return () => clearInterval(rotationInterval);
  }, [isSmallScreen, leftPlayers.length, rightPlayers.length]);
  
  // Refs for fade animation
  const leftPlayerRef = useRef<HTMLDivElement>(null);
  const rightPlayerRef = useRef<HTMLDivElement>(null);
  
  // Apply fade effect when indices change
  useEffect(() => {
    if (isSmallScreen) return;
    
    const fadeElement = (element: HTMLDivElement | null) => {
      if (!element) return;
      
      // Fade out
      element.style.opacity = '0';
      
      // Fade in after a short delay
      setTimeout(() => {
        element.style.opacity = '1';
      }, 600);
    };
    
    fadeElement(leftPlayerRef.current);
    fadeElement(rightPlayerRef.current);
  }, [leftPlayerIndex, rightPlayerIndex, isSmallScreen]);
  
  return (
    // Changed from absolute to relative positioning to fix disappearing issue
    <div className="absolute inset-0 z-[3] md:top-[100px] top-[75px] flex items-center justify-center">
      {isSmallScreen ? (
        // Mobile layout - simplified for small screens
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${isLoaded ? 'show' : ''}`}>
          <div className="absolute z-[0] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image 
              src="/ellipse.png"
              alt="Background ellipse" 
              height={560} 
              width={1200} 
              className="player-image scale-220" 
            />
          </div>
          
          {/* Left player on mobile */}
          <div className="absolute left-0 transform -translate-x-[20vw] scale-125 translate-y-[2vh] z-[2]">
            <Image 
              src="/players/tomleft.png"
              alt="Left player" 
              height={520}
              width={260}
              className="player-image" 
            />
          </div>
          
          {/* Center player on mobile */}
          <div className="absolute z-[5] transform scale-110 translate-x-[15px]">
            <Image 
              src="/players/rohitcenter.png" 
              alt="Center player" 
              height={590} 
              width={350} 
              className="player-image"
              priority 
            />
          </div>
          
          {/* Right player on mobile */}
          <div className="absolute right-0 transform translate-y-[1vh] scale-110 translate-x-[25%] z-[2]">
            <Image 
              src="/players/benright.png"
              alt="Right player" 
              height={520}
              width={260}
              className="player-image" 
            />
          </div>
        </div>
      ) : (
        // Desktop fluid layout - scales as a single unit
        <div className={`relative w-full h-[100vh] ${isLoaded ? 'show' : ''}`}>
          {/* Fluid container that scales with viewport - fixed height issues */}
          <div 
            className="relative w-full h-full max-w-[1800px] mx-auto"
          >
            {/* Background ellipse */}
            <div className="absolute left-1/2 top-1/2 w-full h-[90%] transform -translate-x-1/2 -translate-y-1/2 z-[0]">
              <Image 
                src="/ellipse.png"
                alt="Background ellipse" 
                fill
                className="object-contain" 
              />
            </div>
            
            {/* Player group container - this scales as one unit */}
            <div className="absolute inset-0">
              {/* Left-most player - with fade transition */}
              <div 
                ref={leftPlayerRef}
                className="absolute left-[13%] bottom-0 h-[100%] w-[29%] z-[1] transition-opacity duration-500"
              >
                <Image 
                  src={leftPlayers[leftPlayerIndex].src}
                  alt={leftPlayers[leftPlayerIndex].alt}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
              
              {/* Left player */}
              <div className="absolute left-[23%] bottom-0 h-[100%] w-[30%] z-[2]">
                <Image 
                  src="/players/tomlefte.png"
                  alt="Left player" 
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
              
              {/* Center player */}
              <div className="absolute left-1/2 bottom-0 h-[100%] w-[33%] transform -translate-x-1/2 z-[5]">
                <Image 
                  src="/players/rohitcenter.png"
                  alt="Center player" 
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                  priority
                />
              </div>
              
              {/* Right player */}
              <div className="absolute  right-[26%] bottom-0 h-[100%] w-[30.5%] z-[2]">
                <Image 
                  src="/players/benright.png"
                  alt="Right player"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
              
              {/* Right-most player - with fade transition */}
              <div 
                ref={rightPlayerRef}
                className="absolute right-[17%] bottom-0 h-[94%] w-[29%] z-[1] transition-opacity duration-500"
              >
                <Image 
                  src={rightPlayers[rightPlayerIndex].src}
                  alt={rightPlayers[rightPlayerIndex].alt}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}