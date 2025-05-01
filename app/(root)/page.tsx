import React from "react";
import "./rootpage.css";
import Image from "next/image";
import Secondpage from "../components/secondpage";
import Thirdpage from "../components/thirdpage";
import QuizPage from "../quizpage/page";
import ResultsSection from "../components/ResultsSection";
import ScrollEffects from "../components/scrolleffects";
import FixturesSection from "../components/FixturesSection";
import LionPlayers from "../lionplayers/page";
import NewsPage from "../news/page";
import styles from "../components/navbar.module.css"
import FeaturedVideos from "../components/featuredVideo";
import dynamic from 'next/dynamic';
import LazyLoadSection from '../components/LazyLoadSection';


// Data for match results
const resultArray = [
  { id: 1, team2: "Sudur Paschim Royals", margin: 45, victory: false, teamLogo: "/sudur.png" },
  { id: 2, team2: "Janakpur Bolts", margin: 1, victory: false, teamLogo: "/janakpur.png" },
  { id: 3, team2: "Chitwan Rhinos", margin: 33, victory: true, teamLogo: "/chitwan.png" },
  /*{ id: 4, team2: "Kathmandu Gurkhas", margin: 18, victory: false, teamLogo: "/kathmandu.png" },
  { id: 5, team2: "Pokhara Avengers", margin: 10, victory: false, teamLogo: "/pokhara.png" },
  { id: 6, team2: "Biratnagar Kings", margin: 0, victory: false, teamLogo: "/biratnagar.png" },
  { id: 7, team2: "Karnali Yaks", margin: 0, victory: false, teamLogo: "/karnali.png" }*/
];
const fixturesArray = [
  { id: 1, team2: "Pokhara Avengers", team2Logo: "/pokhara.png", date: "6 DEC", time: "1:15 PM" },
  { id: 2, team2: "Kathmandu Gurkhas", team2Logo: "/kathmandu.png", date: "10 DEC", time: "1:15 PM" },
  { id: 3, team2: "Biratnagar Kings", team2Logo: "/biratnagar.png", date: "12 DEC", time: "9:15 AM" },
  { id: 4, team2: "Karnali Yaks", team2Logo: "/karnali.png", date: "14 DEC", time: "9:15 AM" }
];
export default async function RootPage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with background image - Only covers the first viewport */}
      <div className="relative min-h-screen">
        {/* Background image for hero section only */}
        <div className="absolute inset-0 z-[1]">
          <Image
            src="/headerbg.jpg"
            alt="Background"
            fill
            className="object-cover object-top"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
      
        <ScrollEffects />
        
        {/* Team images container */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <div className="relative w-full fade-in-on-scroll h-full flex items-center justify-center">            
            <Image 
              src="/team.png" 
              width={1500}
              height={1000}
              className="absolute w-[100%] lg:w-[70%] md:w-[90%] max-w-5xl object-contain "
              alt="Team image"
              priority
            />
          </div>
        </div>
        
        {/* Gradient overlay - positioned relative to the team image */}
        <div className="absolute bottom-0 lg:top-[400px] left-0 right-0 h-[50vh] z-[7]">
          <div className="w-full h-full bg-gradient-to-t from-[#06101B] via-[#06101B]/80 to-transparent"></div>
        </div>
        
        {/* Sponsors section - floating over the gradient */}
        <div className="relative flex justify-center top-[130vw] md:top-[700px] left-0 right-0 z-[8]">
          <div className="container px-4">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 md:gap-8">
              {[
                { src: "/ncell.png", alt: "Ncell" },
                { src: "/buddhaair.png", alt: "Buddha Air" },
                { src: "/hilife.png", alt: "Hi-Life" },
                { src: "/babu88.png", alt: "Babu88" },
                { src: "/yeti.png", alt: "Yeti Airlines" },
                { src: "/fortuna.png", alt: "Fortuna" },
                { src: "/nidpil.png", alt: "NIDPIL" },
                { src: "/folliderm.png", alt: "Folliderm" }
              ].map((sponsor, index) => (
                <div key={index} className={styles.logoWrapper}>
                <div  className={`${styles.logoContainer} flex justify-center items-center `}>
                  <Image 
                    src={sponsor.src}
                    width={300}
                    height={300}
                    alt={sponsor.alt}
                    className="h-8 sm:h-10 w-auto object-contain hover:scale-110 transition-all duration-300"
                    style={{ filter: "brightness(3) contrast(1.8)" }}
                  />
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections 
          <QuizPage />
          {/* Uncomment these as needed */}
      <div className="relative z-0 bg-[#06101B]">
          <ResultsSection results={resultArray} />
          <LionPlayers />
          <FeaturedVideos/>
          <NewsPage/>
        <div className="container mx-0 py-20">
        </div>
      </div>
    </div>
  );
}