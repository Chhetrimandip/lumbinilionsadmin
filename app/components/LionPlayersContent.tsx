"use client"
import { useState, useEffect, useCallback, useRef } from 'react';
import PlayerCard from './PlayerCard';
import { usePlayerData } from '../hooks/usePlayerData';
import styles from './PlayerCard.module.css';

const LionPlayersContent = () => {
  const { players, loading, error } = usePlayerData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Use ResizeObserver to track visible card count
  const [visibleCards, setVisibleCards] = useState(1);
  
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(4); // xl
      else if (window.innerWidth >= 1024) setVisibleCards(3); // lg
      else if (window.innerWidth >= 768) setVisibleCards(2); // md
      else setVisibleCards(1); // mobile
    };
    
    // Initial calculation
    updateVisibleCards();
    
    // Update on resize
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);
  
  // Improved scroll function with better calculations
  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || !players?.length) return;
    
    const container = scrollContainerRef.current;
    const totalCards = players.length;
    
    // Calculate new index
    let newIndex;
    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(totalCards - visibleCards, currentIndex + 1);
    }
    
    // Update state first
    setCurrentIndex(newIndex);
    
    // Calculate scroll position
    const cardWidth = container.offsetWidth * 0.9; // 90% width on mobile
    const scrollPosition = cardWidth * newIndex;
    
    // Perform the scroll
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [currentIndex, players, visibleCards]);
  
  // Define handleControlClick with useCallback
  const handleControlClick = useCallback((direction: 'left' | 'right') => {
    setAutoPlay(false);
    scrollTo(direction);
    setTimeout(() => setAutoPlay(true), 10000);
  }, [scrollTo]);

  // Event listeners for external control buttons
  useEffect(() => {
    const handlePrev = () => handleControlClick('left');
    const handleNext = () => handleControlClick('right');
    
    document.addEventListener('player-carousel-prev', handlePrev);
    document.addEventListener('player-carousel-next', handleNext);
    
    return () => {
      document.removeEventListener('player-carousel-prev', handlePrev);
      document.removeEventListener('player-carousel-next', handleNext);
    };
  }, [handleControlClick]);
  
  // Auto-scroll effect
  useEffect(() => {
    let timer;
    if (autoPlay && players?.length > visibleCards) {
      timer = setInterval(() => {
        scrollTo('right');
      }, 5000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPlay, players?.length, currentIndex, scrollTo, visibleCards]);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-pulse h-10 w-10 bg-amber-500 rounded-full"></div>
      </div>
    );
  }
  
  if (error || !players || players.length === 0) {
    return <div>Failed to load players. Please try again later.</div>;
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Container with overflow to show peek effect */}
      <div className="relative overflow-hidden">
        {/* Add padding to show peeking cards */}
        <div className="px-0 md:px-0">
          {/* Scrollable Container with flex layout */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-2 px-2"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Add an empty space div at the start for mobile */}
            <div className="flex-none w-[5%] md:hidden"></div>
            
            {/* Player cards */}
            {players.map((player, index) => (
              <div 
                key={player.id || index}
                className={`${styles.playerCardScrollItem} snap-center`}
              >
                <PlayerCard player={player} />
              </div>
            ))}
            
            {/* Add an empty space div at the end for mobile */}
            <div className="flex-none w-[5%] md:hidden"></div>
          </div>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.min(4, Math.max(1, players.length - visibleCards + 1)) }).map((_, index) => (
          <button
            key={`page-${index}`}
            onClick={() => {
              // Set the new index
              setCurrentIndex(index);
              
              // Scroll to the position
              if (scrollContainerRef.current) {
                const cardWidth = scrollContainerRef.current.offsetWidth * 0.9; // 90% width
                scrollContainerRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-amber-500' : 'bg-gray-700'
            }`}
            aria-label={`Go to player ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LionPlayersContent;