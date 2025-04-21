import React from 'react'
import './rootpage.css'
import Thirdpage from '../components/thirdpage';
import Secondpage from '../components/secondpage';

const Homepage = () => {
  return (
    <>
    <div data-layer="Group 2" className="relative w-full  h-[1024px] scale-90 md:scale-95 lg:scale-100 origin-top-left">
      {/* Layer 1 - Main Container */}
      {/* Layer 2 - Desktop Background with Enhanced Shadow */}
      <div data-layer="Desktop - 2" className="relative w-full h-full bg-neutral-800 overflow-hidden">
        {/* Navigation stays at the top */}
        {/* Layer 4 - Team Lineup Title */}
        <div className="relative mt-24 z-50">
          {/* Shadow text - Layer 4.1 */}
          <div className="absolute opacity-50 text-neutral-500 top-[100px] left-[200px] text-5xl font-['Bebas_Neue'] uppercase tracking-wide">
            LUMBINI LIONS LINEUP
          </div>
          {/* Main text - Layer 4.2 */}
          <div className="absolute  text-zinc-100 text-5xl top-[95px] left-[205px] font-['Bebas_Neue'] uppercase tracking-wide">
            LUMBINI LIONS LINEUP
          </div>
        </div>

        {/* Layer 5 - Team Image with overlay */}
        <div className="absolute inset-0 z-10">
          {/* Background image */}
          <img 
            className="w-full h-full object-cover"
            src="team.png" 
            alt="Team Photo" 
          />
          
          {/* Dark overlay over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black z-20"></div>

          {/* Side shadows - Left */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black/90 to-transparent z-20"></div>

          {/* Side shadows - Right */}
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black/90 to-transparent z-20"></div>

          {/* Subtle blur overlay for bottom section only */}
          <div className="absolute bottom-0 left-0 right-0  backdrop-blur-sm z-20"></div>

          {/* Additional vignette effect */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-75 z-20"></div>
          {/* Extra dark bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/100 to-black/90 backdrop-blur-lg z-21"></div>        </div>

        {/* Layer 6 - Match Schedule Section */}
        <div className="absolute scale-120 bottom-5 left-40 right-0 w-full flex  items-center justify-center z-30">
          <button className="transform hover:scale-110 transition-transform">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 36L18 24L30 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <img className="w-80 h-52 mx-8" src="logo.png" alt="Lumbini Lions Logo" />
          <div className="text-amber-500 text-6xl font-['Bebas_Neue'] mx-8">VS
            <div className="absolute bottom-9 left-14 right-0 flex justify-center text-white text-xl font-['Bebas_Neue'] z-30">
            2025/12/7 12PM @Dashrath stadium
            </div>
          </div>
          <img className="w-48 h-48 mx-8" src="sudur.png" alt="Opponent Logo" />

          <button className="transform hover:scale-110 transition-transform">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 36L30 24L18 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Layer 7 - Schedule Title and Match Time */}
        <div className="absolute bottom-35 left-30 text-white text-[5rem] font-['Bebas_Neue'] uppercase tracking-wider z-30">
          Schedule |
        </div>
      </div>
            <img className="absolute -left-32 top-[196px] w-[633px] h-[633px]" src="lionroar.png" />
              </div>
               {/* second page */}
                <Secondpage/>
                {/* Third Page */}
                <Thirdpage />
               </>
            );
          }

          export default Homepage;