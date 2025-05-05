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
import styles from "../components/navbar.module.css";
import FeaturedVideos from "../components/featuredVideo";
import dynamic from 'next/dynamic';
import LazyLoadSection from '../components/LazyLoadSection';
import { prisma } from "@/lib/db";
import HeroPlayersWrapper from "../components/HeroPlayersWrapper";


export default async function RootPage() {
  let resultArray = [];
  try {
    resultArray = await prisma.schedule.findMany({
      orderBy: { matchDate: 'desc' },
      take: 5
    });
  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }
  
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with background image */}
      <div className="relative min-h-screen">
        {/* Background image for hero section */}
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
        
        {/* Replace the static player images with the dynamic component */}
        <HeroPlayersWrapper />
        
        
        {/* Gradient overlay - positioned relative to the team image */}
        <div className="absolute bottom-0 lg:top-[550px] left-0 right-0 h-[50vh] z-[7]">
          <div className="w-full h-full bg-gradient-to-t from-[#06101B] via-[#06101B]/80 to-transparent"></div>
        </div>
        
        {/* Sponsors section - floating over the gradient */}
        <div className="relative flex justify-center top-[130vw] md:top-[700px] left-0 right-0 z-[10]">
          <div className="container z-[10] md:mx-[150px] px-4">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
              {[
                { src: "/ncell.png", alt: "Ncell" },
                { src: "/buddhaair.png", alt: "Buddha Air" },
                { src: "/hilife.png", alt: "Hi-Life" },
                { src: "/yeti.png", alt: "Yeti Airlines" },
                { src: "/fortuna.png", alt: "Fortuna" },
                { src: "/nidpil.png", alt: "NIDPIL" },
                { src: "/folliderm.png", alt: "Folliderm" }
              ].map((sponsor, index) => (
                <div key={index} className={styles.logoWrapper}>
                  <div className={`${styles.logoContainer} flex justify-center items-center`}>
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

      {/* Content Sections */}
      <div className="relative top-[-70px] pt-5 sm:top-[-150px] md:pt-[0px] pt-[60px] md:top-[20px] z-[8] bg-[#06101B]">         
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