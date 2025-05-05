"use client"

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { usePlayerData } from "../hooks/usePlayerData";
import styles from "./EmblaPlayerCarousel.module.css";
import PlayerCard from "./PlayerCard"; // Import the PlayerCard component

export const EmblaPlayerCarousel = () => {
  const { players, loading, error } = usePlayerData();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  
  // Main carousel
  const [mainViewRef, mainEmbla] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  
  // Thumbnail carousel
  const [thumbViewRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    loop: false
  });
  
  const onThumbClick = useCallback(
    (index) => {
      if (!mainEmbla || !thumbEmbla) return;
      mainEmbla.scrollTo(index);
    },
    [mainEmbla, thumbEmbla]
  );
  
  const scrollPrev = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollPrev();
  }, [mainEmbla]);

  const scrollNext = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollNext();
  }, [mainEmbla]);
  
  const onSelect = useCallback(() => {
    if (!mainEmbla || !thumbEmbla) return;
    
    // Update selected index
    const newIndex = mainEmbla.selectedScrollSnap();
    setSelectedIndex(newIndex);
    
    // Scroll thumbnail carousel to keep active thumb visible
    thumbEmbla.scrollTo(newIndex);
  }, [mainEmbla, thumbEmbla]);
  
  // Initialize
  useEffect(() => {
    if (!mainEmbla || !thumbEmbla) return;
    
    onSelect();
    mainEmbla.on("select", onSelect);
    
    return () => {
      mainEmbla.off("select", onSelect);
    };
  }, [mainEmbla, thumbEmbla, onSelect]);
  
  // Show loading state if players data is still loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Show error message if there was an error
  if (error || players.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400">Failed to load player data</p>
        <p className="text-gray-400 text-sm mt-2">{error}</p>
      </div>
    );
  }
  
  const selectedPlayer = players[selectedIndex] || {};
  
  return (
    <div className="bg-[#06101B] text-white py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl md:ml-[10vw] font-bold text-start mb-0">
          <span className="text-white-500 font-[poppins]">OUR LIONS</span> 
        </h2>
        <p className="text-1xl pb-[5%] md:text-[14px] mt-10px md:ml-[10.1vw] opacity-80 font-[poppins] text-start mb-0">
          View all lions
        </p>
        
        {/* Main carousel with roar controls */}
        <div className={styles.emblaMain}>
          {/* Left Roar Control */}
          <button 
            className={styles.roarControl}
            onClick={scrollPrev}
            aria-label="Previous player"
          >
            <Image
              src="/leftroar.png"
              alt="Previous"
              width={287}
              height={466}
              className={styles.roarImg}
            />
          </button>
          
          <div className={styles.emblaMainViewport} ref={mainViewRef}>
            <div className={styles.emblaMainContainer}>
            {players.map((player, index) => (
              <div className={styles.emblaMainSlide} key={player.id} data-active={index === selectedIndex}>
                <div className={styles.playerMainCard}>
                  {/* Simply use PlayerCard component */}
                  <div className={styles.playerCardWrapper}>
                    <PlayerCard player={player} />
                  </div>
                  
                  {/* Keep the desktop stats section */}
                  <div className={`${styles.playerInfo} md:block hidden`}>
                    <h3 className="text-2xl md:text-4xl font-bold mb-2">
                      {player.firstName} <span className="text-amber-500">{player.lastName}</span>
                    </h3>
                    <p className="text-amber-400 uppercase tracking-wider mb-6">{player.class || "All-Rounder"}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={styles.statItem}>
                        <span className="text-sm text-gray-400">Matches</span>
                        <span className="text-2xl font-bold">26</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className="text-sm text-gray-400">Runs</span>
                        <span className="text-2xl font-bold">643</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className="text-sm text-gray-400">Average</span>
                        <span className="text-2xl font-bold">38.5</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className="text-sm text-gray-400">Strike Rate</span>
                        <span className="text-2xl font-bold">145.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          
          {/* Right Roar Control */}
          <button 
            className={`${styles.roarControl} ${styles.roarControlRight}`}
            onClick={scrollNext}
            aria-label="Next player"
          >
            <Image
              src="/rightroar.png"
              alt="Next"
              width={287}
              height={466}
              className={styles.roarImg}
            />
          </button>
        </div>
        
{/* Thumbnails section */}
<div className={styles.emblaThumb}>
  <div className={styles.emblaThumbViewport} ref={thumbViewRef}>
    <div className={styles.emblaThumbContainer}>
      {players.map((player, index) => {
        // Use consistent image path construction
        const imageName = player.firstName.toLowerCase();
        const imgSrc = `/playercards/${imageName}card.png`;
        
        return (
          <button
            key={player.id}
            className={`${styles.emblaThumbSlide} ${
              index === selectedIndex ? styles.emblaThumbSelected : ""
            }`}
            onClick={() => onThumbClick(index)}
          >
            <div className={styles.thumbImageContainer}>
              <Image
                src={imgSrc}
                alt={`${player.firstName} ${player.lastName} thumbnail`}
                width={80}
                height={80}
                className="object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/default-player.png";
                }}
              />
              <span className={styles.playerNumber}>{index + 1}</span>
            </div>
            <span className={styles.thumbPlayerName}>
              {player.firstName.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};