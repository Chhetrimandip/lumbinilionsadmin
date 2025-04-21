import React from 'react'

const Thirdpage = () => {
    return ( 
        <div className="w-full min-h-screen bg-black text-white relative px-4 py-20 overflow-hidden">
        {/* Background Rectangle */}
        <div className="absolute top-0 left-0 w-full h-80 bg-neutral-800" />

        {/* Achievements Title */}
        <h2 className="absolute left-1/2 top-20 transform -translate-x-1/2 text-5xl font-['Bebas_Neue'] text-center">
          <span className="text-amber-500">|</span>
          <span className="text-white">Achievements</span>
        </h2>

        {/* Awards */}
        <div className="absolute top-[236px] left-1/2 transform -translate-x-1/2 text-5xl font-['Bebas_Neue'] text-amber-500 text-center">
          1st Place
        </div>
        <img src="https://placehold.co/119x61" alt="Trophy" className="absolute left-[660px] top-[137px] w-28 h-16" />
        <img src="https://placehold.co/117x117" alt="Medal Left" className="absolute left-[165px] top-[99px] size-28" />
        <div className="absolute left-[49px] top-[236px] text-4xl text-amber-500 font-['Bebas_Neue'] w-80 text-center">Best team of the year</div>
        <img src="https://placehold.co/202x128" alt="Medal Right" className="absolute left-[1073px] top-[80px] w-52 h-32" />
        <div className="absolute left-[1101px] top-[239px] text-4xl text-amber-500 font-['Bebas_Neue'] text-center">Best fanbase</div>

        {/* Instagram and Shop Cards */}
        {[
          {
            label: "Connect on instagram",
            handle: "@/lumbinilions",
            icon: true,
            top: 396,
            contentTop: 424,
            handleTop: 461,
          },
          {
            label: "Shop our apparel now",
            handle: null,
            icon: false,
            top: 532,
            contentTop: 552,
            handleTop: null,
          },
          {
            label: null,
            handle: null,
            icon: false,
            top: 667,
            contentTop: 695,
            handleTop: null,
          },
        ].map(({ label, handle, icon, top, contentTop, handleTop }, index) => (
          <div key={index}>
            <div className="absolute left-[77px]" style={{ top }}>
              <div className="w-80 h-28 bg-neutral-900" />
            </div>
            {label && (
              <div className="absolute left-[99px]" style={{ top: contentTop }}>
                <span className="text-amber-500 text-4xl font-['Bebas_Neue']">|</span>
                <div className="text-white text-2xl font-['Bebas_Neue'] text-center w-52">{label}</div>
              </div>
            )}
            {handle && (
              <div className="absolute left-[146px]" style={{ top: handleTop }}>
                <span className="text-white text-2xl font-['Bebas_Neue'] text-center">{handle}</span>
              </div>
            )}
            {icon && (
              <div className="absolute left-[329px] top-[434px]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M35 13H35.02M14 4H34C39.5228 4 44 8.47715 44 14V34C44 39.5228 39.5228 44 34 44H14C8.47715 44 4 39.5228 4 34V14C4 8.47715 8.47715 4 14 4ZM32 22.74C32.2468 24.4045 31.9625 26.1044 31.1875 27.598C30.4125 29.0916 29.1863 30.3028 27.6833 31.0593C26.1802 31.8159 24.4769 32.0792 22.8156 31.8119C21.1543 31.5445 19.6195 30.7602 18.4297 29.5703C17.2398 28.3805 16.4555 26.8457 16.1881 25.1844C15.9208 23.5231 16.1841 21.8198 16.9407 20.3167C17.6972 18.8137 18.9084 17.5875 20.402 16.8125C21.8956 16.0375 23.5955 15.7532 25.26 16C26.9578 16.2518 28.5297 17.0429 29.7434 18.2566C30.9571 19.4703 31.7482 21.0422 32 22.74Z"
                    stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* News Section */}
        <div className="absolute left-1/2 top-[396px] transform -translate-x-1/2 text-3xl font-['Bebas_Neue'] text-center">
          <span className="text-amber-500">|</span>
          <span className="text-white"> NEWS</span>
        </div>
        <div className="absolute left-[542px] top-[449px] w-[706px] h-80 bg-zinc-300" />
        <img src="https://placehold.co/482x321" alt="News Image" className="absolute left-[657px] top-[449px] w-[482px] h-80" />
        <div className="absolute left-[466px] top-[783px] text-amber-500 text-4xl uppercase font-['Bebas_Neue'] text-center leading-10">
          Lumbini Lions restrict Janakpur Bolts to 136 with impressive bowling
        </div>
      
        {/* Arrows */}
        <div className="absolute left-[29px] top-[137px]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" fill="#212121" />
            <path d="M30 36L18 24L30 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute left-[1355px] top-[128px]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M18 36L30 24L18 12" stroke="#BF6A02" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      
        {/* Our Story Section */}
        <img src="https://placehold.co/253x169" alt="Story" className="absolute left-[29px] top-[826px] w-64 h-44" />
        <div className="absolute left-[248px] top-[853px] text-6xl text-white font-['Bebas_Neue']">Our story</div>
        <div className="absolute left-[248px] top-[853px] text-7xl text-amber-500 font-['Bebas_Neue']">___</div>
        <p className="absolute left-[248px] top-[898px] w-60 text-white text-xl font-bold font-['Beiruti'] leading-9">
          We started our journey from the golden peaceful lands of Lumbini where lord Buddha was born
        </p>
      
        {/* Decorative Rotated Image */}
        <img src="https://placehold.co/83x83" alt="Decor" className="absolute left-[394px] top-[618px] size-20 rotate-180" />
      </div>
     );
}
 
export default Thirdpage;