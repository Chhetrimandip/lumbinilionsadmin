// app/components/ResultsSection.tsx
"use client";
import React, { useRef } from 'react';
import Resultcard from "./resultcard";
import Link from 'next/link';

interface ResultType {
  id: number;
  team2: string;
  margin: number;
  victory: boolean;
  teamLogo: string;
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
    <section className="w-full py-20 md:py-16">
      <div className="container py-14 mx-auto px-4">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          {/* Section Header - Now left-aligned */}
          <div className="mb-8 md:mb-12 self-start flex justify-between w-full">
            <div>
              <h4 className="text-amber-500 text-sm md:text-base font-medium">
                RECENT PERFORMANCES
              </h4>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal uppercase mt-2">
                MATCH RESULTS
              </h2>
            </div>
            
            {/* Navigation buttons (hidden on mobile, visible on larger screens) */}
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollTo('left')} 
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                aria-label="Previous result"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => scrollTo('right')} 
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                aria-label="Next result"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Scrollable Results Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
          >
            {/* Add a spacer div at the start for small screens */}
            <div className="md:hidden w-[5%] flex-shrink-0"></div>
            
            {results.map(result => (
              <div 
                key={result.id} 
                className="w-[90%] md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 snap-center"
              >
                <Resultcard result={result} />
              </div>
            ))}
            
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
      </div>
    </section>
  );
}