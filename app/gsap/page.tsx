"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import styles from './carousel.module.css'; 
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

const GsapCarousel = () => {
  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const progressRef = useRef({ value: 0 });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const carousel = carouselRef.current;
    const images = imagesRef.current;
    const progress = progressRef.current;
    const radius = 242;

    let wheelTimeout;
    const debounceWheel = (callback, delay = 200) => {
      return function(...args) {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => callback.apply(this, args), delay);
      };
    };

    const handleWheelEnd = debounceWheel(() => {
      // Snap to nearest position
      const imageCount = images.length;
      const snapIncrement = 1 / imageCount;
      const snapPoint = Math.round(progress.value / snapIncrement) * snapIncrement;
      
      gsap.to(progress, {
        duration: 0.5,
        ease: "power2.out",
        value: snapPoint
      });
    }, 150);
    
    // Setup observer for mouse/wheel interactions
    const observer = Observer.create({
      target: carousel,
      type: "wheel,pointer",
      onPress: self => {
        carousel.style.cursor = 'grabbing';
        // Stop any ongoing animations when user interacts
        gsap.killTweensOf(progress);
      },
      onRelease: self => {
        carousel.style.cursor = 'grab';
        
        // Calculate nearest snap point when released
        const imageCount = images.length;
        const snapIncrement = 1 / imageCount;
        const snapPoint = Math.round(progress.value / snapIncrement) * snapIncrement;
        
        // Animate to the nearest snap point
        gsap.to(progress, {
          duration: 0.5,
          ease: "power2.out",
          value: snapPoint,
          onUpdate: () => {
            // Force update to ensure smooth animation to snap point
            animate();
          }
        });
      },
      onChange: self => {
        gsap.killTweensOf(progress);
        const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05;
        gsap.to(progress, {
          duration: 2,
          ease: 'power4.out',
          value: `+=${p}`
        });
        
        if (self.event.type === 'wheel') {
          handleWheelEnd();
        }
      }
    });
    
    // Animation function
    const animate = () => {
      images.forEach((image, index) => {
        const theta = index / images.length - progress.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const y = Math.cos(theta * Math.PI * 2) * radius;
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta}deg)`;
      });
    };
    
    // Add animation to ticker
    gsap.ticker.add(animate);
    
    // Cleanup function
    return () => {
      gsap.ticker.remove(animate);
      observer.kill();
    };
  }, []);
  
  // Add images to refs array
  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };
  
  return (
    <div className={styles.carousel} ref={carouselRef}>
      {[1, 2, 3, 4, 5, 6, 7, 8,9].map((num) => (
        <div key={num} className={styles.carouselImage} ref={addToRefs}>
        <div className={styles.imageWrapper}>
          <Image 
            src={`/${num}.png`}
            alt={`Carousel image ${num}`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      ))}
    </div>
  );
};

export default GsapCarousel;