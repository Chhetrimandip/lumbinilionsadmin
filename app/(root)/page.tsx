import React from 'react'
import './rootpage.css'
import Thirdpage from '../components/thirdpage';
import Secondpage from '../components/secondpage';

const Homepage = () => {
  return (
<>
  <div className="relative w-full min-h-screen bg-neutral-800 overflow-hidden">
    {/* Background Image and Overlays */}
    <div className="absolute inset-0 z-10">

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20"></div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent z-20"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/90 to-transparent z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black opacity-75 z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent z-21"></div>
    </div>

    {/* Title */}
    <div className="relative z-30 flex flex-col items-center pt-24 px-4 md:px-8">
      <div className="relative text-center">
        <h1 className="absolute text-zinc-100 text-4xl top-20 sm:text-5xl md:text-6xl font-['Bebas_Neue'] tracking-wide uppercase"
          style={{
            textShadow: 
            "-1px -1px 0 #71717a, 1px -1px 0 #71717a, -1px 1px 0 #71717a, 1px 1px 0 #71717a",
          }}>
          LUMBINI LIONS LINEUP
        </h1>
      </div>
    </div>

    {/* Match Section */}
    <div className="relative z-30 flex flex-col items-center justify-center mt-24 px-4 md:px-0">
      <div className="flex items-center justify-center gap-6 flex-wrap text-center">
        <button className="hover:scale-110 transition-transform">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M30 36L18 24L30 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <img src="logo.png" alt="Lumbini Lions Logo" className="w-40 sm:w-56 md:w-80 h-auto" />

        <div className="text-amber-500 text-4xl sm:text-5xl md:text-6xl font-['Bebas_Neue']">
          VS
          <div className="text-white text-base md:text-xl mt-2">
            2025/12/7 12PM @Dashrath Stadium
          </div>
        </div>

        <img src="sudur.png" alt="Opponent Logo" className="w-32 sm:w-40 md:w-48 h-auto" />

        <button className="hover:scale-110 transition-transform">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M18 36L30 24L18 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    {/* Schedule Title */}
    <div className="relative z-30 mt-12 text-center text-white text-4xl md:text-[5rem] font-['Bebas_Neue'] uppercase tracking-wider">
      Schedule |
    </div>

    {/* Roaring Lion */}
    <img
      src="lionroar.png"
      alt="Roaring Lion"
      className="absolute left-0 top-[196px] w-64 sm:w-[400px] md:w-[633px] h-auto z-0 opacity-80"
    />
  </div>
  {/*2nd page */}
  <Secondpage/>
    {/*3rd page */}

</>


            );
          }

          export default Homepage;