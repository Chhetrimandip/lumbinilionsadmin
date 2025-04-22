"use client";

import React, { useEffect, useRef, useState } from "react";
import "./rootpage.css";
import Image from "next/image";
import Secondpage from "../components/secondpage";
import Resultcard from "../components/resultcard";
import Thirdpage from "../components/thirdpage";
import QuizPage from "../test/page";

const RootPage = () => {
  // Using the state for navbar visibility to avoid the unused variable error
  const [, setShowNavbar] = useState(false);
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
<>
  <div className="relative w-full min-h-screen bg-neutral-800 transparent overflow-hidden">
    {/* Background Image and Overlays */}
    <section className='hero-section'>
    <Image 
      src="/team.png" 
      width={2000}
      height={1000}
      className='absolute left-1/2 top-3/4 fade-in-on-scroll transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[2000px] object-contain z-10'
      alt="Team image"
    />
    </section>
    <h1 className="absolute left-1/2 top-2/7 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[700px] text-center text-5xl md:text-6xl lg:text-7xl font-bold z-10 text-amber-500">
      Lineup
    </h1>
    <Image 
      src="/heart.png" 
      width={700}
      height={350}
      alt="Hearts" 
      className="absolute left-1/2 top-2/7 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[700px] object-contain z-10"
    />
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20"></div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent z-20"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/90 to-transparent z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black opacity-75 z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent z-21"></div>
    </div>

    {/* Roaring Lion */}
    <Image
      src="/lionroar.png"
      width={500}
      height={400}
      alt="Roaring Lion"
      className="absolute left-0 max-w-full top-[1px] w-64 sm:w-[400px] object-contain overflow-hidden md:w-[500px] h-auto z-0 opacity-80"
    />
  </div>
  <div className="bg-black">
  {/* Results Section */}
 <div className="relative transparent z-30 pt-10">
    {/* Results array */}
    {(() => {
      // Import or define the ResultType type to match what Resultcard expects      
      const resultarray = [
        {
          id: 1,
          team2: "Sudur Paschim Royals",
          margin: 45,
          victory: false,
          teamLogo: "/sudur.png"
        },
        {
          id: 2,
          team2: "Janakpur Bolts",
          margin: 1,
          victory: false,
          teamLogo: "/janakpur.png"
        },
        {
          id: 3,
          team2: "Chitwan Rhinos",
          margin: 33,
          victory: true,
          teamLogo: "/chitwan.png"
        },
        {
          id: 4,
          team2: "Kathmandu Gurkhas",
          margin: 18,
          victory: false,
          teamLogo: "/kathmandu.png"
        },
        {
          id: 5,
          team2: "Pokhara Avengers",
          margin: 10,
          victory: false,
          teamLogo: "/pokhara.png"
        },
        {
          id: 6,
          team2: "Biratnagar Kings",
          margin: 0,
          victory: false,
          teamLogo: "/biratnagar.png"
        },
        {
          id: 7,
          team2: "Karnali Yaks",
          margin: 0,
          victory: false,
          teamLogo: "/karnali.png"
        }
      ];
      
      
      return (
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl border-[1.5px] border-amber-500 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-light text-sm sm:text-base">
              {resultarray.map(element => (
          <Resultcard key={element.id} result={element} />
              ))}
            </div>
          </div>
        </div>
      );
    })()}
  </div>

  <div className="relative pb-48 bg-transparent">
    <Image 
      data-layer="Sponsers" 
      width={1096}
      height={192}
      className="absolute left-1/2 transform -translate-x-1/2 w-[1096px] h-48 z-30 bg-transparent" 
      src="/sponsors.png" 
      alt="Sponsors"
    />
  </div>
  </div>
  <QuizPage/>
  
  {/*2nd page */}
  <Secondpage/>
  {/*3rd page */}
  <Thirdpage />
</>
);
}
export default RootPage;