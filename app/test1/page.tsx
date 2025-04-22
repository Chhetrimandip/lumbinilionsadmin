"use client";

import React, { useEffect, useRef, useState } from "react";
import Secondpage from "../components/secondpage";
import Resultcard from "../components/resultcard";
import Thirdpage from "../components/thirdpage";

const Homepage = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const img = document.querySelector(".fade-in-on-scroll");

    const handleScroll = () => {
      // Trigger fade-in if image is in view
      if (img) {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          img.classList.add("show");
        }
      }

      const currentScrollY = window.scrollY;

      // Navbar visibility logic
      setShowNavbar(
        currentScrollY < 100 || currentScrollY < lastScrollY.current
      );

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden overflow-y-hidden w-full">
      <div className="relative w-full min-h-screen bg-neutral-800 overflow-x-hidden overflow-y-hidden">
        {/* Background Image and Overlays */}
        <section className="hero-section overflow-x-hidden overflow-y-hidden">
          <img
            src="team.png"
            className="absolute overflow-x-hidden overflow-y-hidden left-1/2 top-3/4 fade-in-on-scroll transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[600px] sm:max-w-[900px] md:max-w-[1400px] object-contain z-10"
          />
        </section>
        <h1 className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] sm:max-w-[600px] md:max-w-[700px] text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold z-10 text-amber-500 overflow-x-hidden overflow-y-hidden">
          Lineup
        </h1>
        <img
          src="heart.png"
          alt="Hearts"
          className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] sm:max-w-[600px] md:max-w-[700px] object-contain z-10 overflow-x-hidden overflow-y-hidden"
        />
        <div className="absolute inset-0 z-10 overflow-x-hidden overflow-y-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20"></div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent z-20"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/90 to-transparent z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm z-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black opacity-75 z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent z-21"></div>
        </div>

        {/* Roaring Lion */}
        <img
          src="lionroar.png"
          alt="Roaring Lion"
          className="absolute left-0 top-[1px] w-32 sm:w-48 md:w-64 object-contain overflow-x-hidden overflow-y-hidden h-auto z-0 opacity-80"
        />
      </div>
      <Secondpage/>
      <Thirdpage/>
      </div>
      <Secondpage/>
      <Thirdpage/>
  );
};

export default Homepage;