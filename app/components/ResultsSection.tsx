// app/components/ResultsSection.tsx
"use client";
import React, { useRef } from 'react';
import MatchCard from "./resultcard";
import Link from 'next/link';
import Image from 'next/image';

interface ResultType {
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

interface ResultsSectionProps {
  results: ResultType[];
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Set initial scroll position with a slight offset to the right
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      // Set initial scroll position to show there's content on the left
      scrollContainerRef.current.scrollLeft = -300; // Adjust this value as needed
    }
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('div:nth-child(2)')?.offsetWidth || 0;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full md:py-20 overflow-hidden">
      {/* md;pl12 */}
      <div className="container-fluid px-4 md:px-0 md:pr-0"> 
        <div className="flex flex-col w-full max-w-8xl">
          {/* Header section */}
          <div className="mb-8 md:mb-12 self-start flex justify-between w-full">
            <div className='md:mx-38'>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-[poppins] font-semibold uppercase mt-2">
                MATCH RESULTS
              </h2>
              <h4 className="text-gray-500 text-sm md:text-base font-[poppins] text-[14px] font-medium">
                View all matches
              </h4>
            </div>
            {/* todo ask <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollTo('left')}
                aria-label="Previous"
                className="bg-[#141F2B] hover:bg-[#1a2736] p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo('right')}
                aria-label="Next"
                className="bg-[#141F2B] hover:bg-[#1a2736] p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div> */}
          </div>
          
          {/* Simple scrollable container  */}
          <div className="relative overflow-visible">            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: '0',          // Remove left padding
                paddingRight: '0',         // Remove right padding
                scrollSnapType: 'x mandatory',
              }}
            >
            {/* Add spacer div at the end to allow scrolling past the last card */}
            <div className="w-[80px] md:w-[9.5%] flex-shrink-0"></div>
              
              {results.map((result, index) => (
                <div 
                  key={result.id} 
                  className={`
                    w-[90%] md:w-[30%] lg:w-[36%] flex-shrink-0
                    ${index < results.length - 1 ? 'mr-4' : ''} 
                    snap-center
                  `}
                >
                  <MatchCard match={result} />
                </div>
              ))}
              
              {/* Add spacer div at the end to allow scrolling past the last card */}
              <div className="w-[80px] md:w-[120px] flex-shrink-0"></div>
            </div>
          </div>
          
          {/* View All Results Button todo ask
          <div className="mt-8 md:mt-12 flex justify-center">
            <Link 
              href="/fixtures" 
              className="bg-amber-500 hover:bg-amber-600 text-[#06101B] px-6 py-3 rounded-md font-bold transition-all duration-300 inline-flex items-center"
            >
              View All Fixtures
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}