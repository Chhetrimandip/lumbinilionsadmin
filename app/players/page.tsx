import React from "react";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { EmblaPlayerCarousel } from "../components/EmblaPlayerCarousel";

const PlayerPage: React.FC = () => {
  return (
    <div>
      <div className="relative w-full min-h-screen overflow-hidden bg-[#06101B]">
        {/* Background images and overlays - lowest z-index */}
        <div className="absolute inset-0 z-[1]">
          {/* Base background */}
          <Image
            src="/headerbg2.png"
            alt="Background image"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Image */}
          <div className="absolute inset-0">
            <Image 
              src="/rectangle151.png"
              alt="Overlay"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Trapezium Stat Bars - middle z-index (behind player, above background) */}
        <div className="absolute inset-0 z-[5] flex items-start justify-center mt-60">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-4">
              
              {/* First trapezium */}
              <div className="relative h-16 md:h-20 lg:h-24 w-full max-w-[75%] lg:max-w-[65%]">
                
                <div className="absolute inset-0 bg-white opacity-60 clip-roof shadow-lg"></div>
                          
                <div className="absolute inset-0 flex items-center justify-around px-4">
                  
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-black">43</p>
                    <p className="text-xs md:text-sm font-medium text-black/80 uppercase">Matches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-black">1280</p>
                    <p className="text-xs md:text-sm font-medium text-black/80 uppercase">Runs</p>
                  </div>
                </div>
              </div>

              {/* Second trapezium */}
              <div className="relative h-16 md:h-20 lg:h-24 w-full max-w-[85%] lg:max-w-[75%]">
                <div className="absolute inset-0 bg-white opacity-60 clip-roof shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-around px-4">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-black">24</p>
                    <p className="text-xs md:text-sm font-medium text-black/80 uppercase">Wickets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-black">138.7</p>
                    <p className="text-xs md:text-sm font-medium text-black/80 uppercase">Strike Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player image - highest z-index to be above trapeziums */}
        <div className="absolute inset-0 z-[10]">
          <Image
            src="/team/rohitcard.png"
            alt="Ben Cuttings"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content overlay - positioned above the background, below the player */}
        <div className="container relative z-[20] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 h-full">
          <div className="flex flex-col h-full">
            {/* Player name and details */}
            <div className="lg:max-w-xl mb-auto">
              <div className="text-white font-['poppins'] tracking-wide">
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold">Ben</h1>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold mt-2 lg:mt-4">Cuttings</h1>
              </div>
              
              <div className="mt-4 sm:mt-6">
                <span className="text-white text-xl sm:text-3xl font-semibold font-['poppins'] tracking-wider">ALL ROUNDER</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex hidden md:block space-x-4 mt-6 sm:mt-10">
                <a href="#" className="size-12 sm:size-16 flex items-center justify-center border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300">
                  <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="size-12 sm:size-16 flex items-center justify-center border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300">
                  <Facebook className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="size-12 sm:size-16 flex items-center justify-center border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300">
                  <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmblaPlayerCarousel/>
    </div>
  );
};

export default PlayerPage;