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

  // Optional: Function to handle manual scrolling with buttons
  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('div')?.offsetWidth || 0;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
<section className="w-full md:mx-30 md:py-20 overflow-hidden">
  {/* Change from "container mx-auto" to have right padding of 0 on desktop */}
  <div className="container-fluid px-4 md:pl-12 md:pr-0">
    <div className="flex flex-col w-full max-w-8xl">
      {/* Section Header - Same as before */}
      <div className="mb-8 md:mb-12 self-start flex justify-between w-full">
        <div>
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-[poppins] font-semibold uppercase mt-2">
            MATCH RESULTS
          </h2>
          <h4 className="text-gray-500 text-sm md:text-base font-[poppins] text-[14px] font-medium">
            RECENT PERFORMANCES
          </h4>
        </div>
        {/* Navigation buttons - Same as before */}
        <div className="hidden md:flex items-center gap-2">
          {/* buttons stay the same */}
        </div>
      </div>
      
      {/* Scrollable Results Container - Change from px-0 to pr-0 */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:pl-0 md:pr-0 scrollbar-hide"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {/* Add a spacer div at the start for small screens */}
        <div className="md:hidden w-[5%] flex-shrink-0"></div>
        
        {results.map((result, index) => (
          <div 
            key={result.id} 
            className={`
              w-[90%] md:w-[30%] lg:w-[28%] flex-shrink-0 
              ${index === 0 ? 'snap-start md:snap-start pl-0 md:pl-0' : 'snap-center'} 
              ${index < results.length - 1 ? 'px-2' : 'pl-2 pr-0'}
            `}
            style={{
              marginRight: index === results.length - 1 ? '0' : '' 
            }}
          >
            <MatchCard match={result} />
          </div>
        ))}
        
      </div>
            
            {/* Add a spacer div at the end for small screens */}
            <div className="md:hidden w-[5%] flex-shrink-0"></div>
          </div>
          
          {/* View All Results Button */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <Link 
              href="/results" 
              className="bg-red-500 hover:bg-red-600 transition-colors rounded-3xl px-5 py-2.5 text-white font-bold flex items-center"
            >
              View All Results
              <svg className="ml-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.51807 7.99998C1.51807 7.85776 1.56251 7.7422 1.6514 7.65331C1.74029 7.56442 1.85584 7.51998 1.99807 7.51998H13.7847L10.6381 4.37331C10.5314 4.26665 10.4781 4.1422 10.4781 3.99998C10.4781 3.85776 10.5314 3.7422 10.6381 3.65331C10.7447 3.56442 10.8692 3.51998 11.0114 3.51998C11.1536 3.51998 11.2781 3.55554 11.3847 3.62665L15.3847 7.62665C15.4558 7.73331 15.4914 7.85776 15.4914 7.99998C15.4914 8.1422 15.4558 8.26665 15.3847 8.37331L11.3847 12.3733C11.2781 12.4444 11.1536 12.48 11.0114 12.48C10.8692 12.48 10.7447 12.4355 10.6381 12.3466C10.5314 12.2578 10.4781 12.1422 10.4781 12C10.4781 11.8578 10.5314 11.7333 10.6381 11.6266L13.7847 8.47998H1.99807C1.85584 8.47998 1.74029 8.43554 1.6514 8.34665C1.56251 8.25776 1.51807 8.1422 1.51807 7.99998Z" fill="white"/>
              </svg>
            </Link>
          </div> 
        </div>
    </section>
  );
}