"use client"

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { usePlayerData } from "../hooks/usePlayerData";
import styles from "./PlayerCardCarousel.module.css";

export const PlayerCardCarousel = () => {
  const { players, loading, error } = usePlayerData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  
  // Initialize carousel with 4 slides visible at once on desktop
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
    dragFree: true,
  });
  
  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000);
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000);
  }, [embla]);
  
  const onSelect = useCallback(() => {
    if (!embla) return;
    setActiveIndex(embla.selectedScrollSnap());
  }, [embla]);
  
  // Auto-play functionality
  useEffect(() => {
    if (!embla || !autoPlayEnabled) return;
    
    const autoPlayInterval = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 10000); // 10 seconds interval for auto-scrolling
    
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [embla, autoPlayEnabled]);
  
  // Initialize and setup event listeners
  useEffect(() => {
    if (!embla) return;
    
    onSelect();
    embla.on("select", onSelect);
    
    // Reset auto-play when user interacts with carousel
    const handlePointerDown = () => {
      setAutoPlayEnabled(false);
      setTimeout(() => setAutoPlayEnabled(true), 15000);
    };
    
    embla.on("pointerDown", handlePointerDown);
    
    return () => {
      embla.off("select", onSelect);
      embla.off("pointerDown", handlePointerDown);
    };
  }, [embla, onSelect]);
  
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error || players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load player data</p>
      </div>
    );
  }

  return (
    <div className="bg-[#06101B] text-white pb-[30vh] relative">
      {/* Left roar image (decorative) */}
      <div className={styles.roarImageLeft}>
        <Image
          src="/leftroar.png"
          alt="Decorative lion roar"
          width={287}
          height={466}
          className={styles.roarImg}
        />
      </div>
      
      {/* Right roar image (decorative) */}
      <div className={styles.roarImageRight}>
        <Image
          src="/rightroar.png"
          alt="Decorative lion roar"
          width={287}
          height={466}
          className={styles.roarImg}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-white md:ml-[9vw] flex flex-col font-[poppins]">OUR LIONS
              <span className="text-[14px] font-medium opacity-60 ">View all</span>
            </span>
          </h2>
          
          {/* Navigation buttons moved to right side */}
          <div className="flex space-x-3">
            <button 
              className={styles.navButton}
              onClick={scrollPrev}
              aria-label="Previous players"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className={styles.navButton}
              onClick={scrollNext}
              aria-label="Next players"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className={styles.embla}>
          <div className={styles.emblaViewport} ref={viewportRef}>
            <div className={styles.emblaContainer}>
              {players.map((player) => {
                // Construct the image path
                const imageName = player.firstName.toLowerCase();
                const imgSrc = `/playercards/${imageName}card.png`;
                // const imgSrc = "/playercards/tomcard.png"
                
                return (
                  <div className={styles.emblaSlide} key={player.id}>
                    <Link href={`/players/${player.slug}`} className={styles.playerCard}>
                      <div className={styles.playerImageWrapper}>
                        {/* Changed to fixed dimensions with object-contain */}
                        <div className={styles.imageFixedContainer}>
                          <Image
                            src={imgSrc}
                            alt={`${player.firstName} ${player.lastName}`}
                            fill
                            quality={100}
                            className={styles.playerImage}
                            onError={(e) => {
                              e.currentTarget.src = "/default-player.png";
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.playerName}>
                        <h3 className="text-lg flex flex-col font-['poppins'] tracking-wide">
                          <span className="text-amber-500 text-[14px] font-semibold text-align-start leading-none">{player.lastName}</span>
                          <span className="text-white-500 text-[24px] font-semibold text-align-start -mt-1">{player.firstName}</span>
                        </h3>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCardCarousel;