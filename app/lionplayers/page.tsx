// app/lionplayers/page.tsx
import Image from 'next/image';
import LazyLoadSection from '../components/LazyLoadSection';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PlayerCarouselControls } from '../components/PlayerCarouselControls';

// Dynamically import the content component
const LionPlayersContent = dynamic(() => import('../components/LionPlayersContent'), {
  loading: () => <div className="h-80 flex items-center justify-center">
    <div className="animate-pulse h-10 w-10 bg-amber-500 rounded-full"></div>
  </div>
});

const LionPlayers = () => {
  return (    
    <div className="w-full min-h-screen relative overflow-hidden text-white pt-24 pb-16">
      {/*This allows to control the cards through buttons*/}
      <PlayerCarouselControls />

      {/* Side decorative images stay the same */}
      <Image
        className="hidden object-contain lg:block absolute top-[170px] overflow-hidden left-0 w-72 rotate-0 z-10"
        src="/leftroar.png"
        alt="Lion decoration left"
        width={400}
        height={400}
      />
      <Image
        className="hidden lg:block object-contain absolute top-[170px] overflow-hidden right-0 w-72 rotate-0 z-10"
        src="/rightroar.png"
        alt="Lion decoration right"
        width={400}
        height={400}
      /> 
      
      {/* Content container */}
      <div className="relative z-20 -mt-10">
        {/* Heading with Navigation Controls */}
        <div className="px-20 flex flex-wrap items-end justify-between mb-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-['Bebas_Neue'] uppercase mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Our lions
          </h2>
          
          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            <button 
              id="prevSlide"
              aria-label="Previous Players"
              className="bg-amber-500 hover:bg-amber-600 text-black h-10 w-10 flex items-center justify-center rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              id="nextSlide"
              aria-label="Next Players"
              className="bg-amber-500 hover:bg-amber-600 text-black h-10 w-10 flex items-center justify-center rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Players carousel - wrapped in LazyLoadSection */}
          <LionPlayersContent />
      </div>
    </div>
  );
}
 
export default LionPlayers;