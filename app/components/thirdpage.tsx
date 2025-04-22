import React from 'react'
import Link from 'next/link'

const Thirdpage = () => {
    return (
        <div className="w-full bg-black overflow-hidden">
            {/* SECTION 1: Achievements Bar */}
            <div className="w-full py-8 bg-neutral-800">
                <h2 className="text-center text-4xl sm:text-5xl font-['Bebas_Neue'] mb-8">
                    <span className="text-amber-500">|</span>
                    <span className="text-white">Achievements</span>
                </h2>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mx-auto px-4">
                    {/* Achievement 1 */}
                    <div className="flex flex-col items-center">
                        <img className="w-24 h-24 md:w-28 md:h-28" src="crickleague.png" alt="Best Team Award" />
                        <div className="mt-4 text-center text-amber-500 text-2xl sm:text-3xl md:text-4xl font-['Bebas_Neue']">
                            Best team of the year
                        </div>
                    </div>
                    
                    {/* Achievement 2 */}
                    <div className="flex flex-col items-center">
                        <img className="w-24 h-14 md:w-28 md:h-16" src="npllogo.png" alt="Trophy" />
                        <div className="mt-4 text-center text-amber-500 text-2xl sm:text-3xl md:text-4xl font-['Bebas_Neue']">
                            1st Place
                        </div>
                    </div>
                    
                    {/* Achievement 3 */}
                    <div className="flex flex-col items-center">
                        <img className="w-40 h-24 md:w-52 md:h-32" src="can.png" alt="Fanbase Award" />
                        <div className="mt-4 text-center text-amber-500 text-2xl sm:text-3xl md:text-4xl font-['Bebas_Neue']">
                            Best fanbase
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: News and Social Media */}
            <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-8">
                {/* News Section Header */}
                <div className="md:w-1/4 flex items-center">
                    <h2 className="text-3xl font-['Bebas_Neue']">
                        <span className="text-amber-500">|</span>
                        <span className="text-white"> NEWS</span>
                    </h2>
                </div>
                
                {/* Social Media Cards - Stack on mobile, side by side on desktop */}
                <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Instagram Card */}
                    <div className="bg-neutral-900 p-4 flex flex-col">
                        <div className="flex items-center">
                            <span className="text-amber-500 text-4xl font-['Bebas_Neue']">|</span>
                            <h3 className="text-white text-2xl font-['Bebas_Neue'] ml-2">Connect on Instagram</h3>
                            <svg className="ml-auto w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35 13H35.02M14 4H34C39.5228 4 44 8.47715 44 14V34C44 39.5228 39.5228 44 34 44H14C8.47715 44 4 39.5228 4 34V14C4 8.47715 8.47715 4 14 4ZM32 22.74C32.2468 24.4045 31.9625 26.1044 31.1875 27.598C30.4125 29.0916 29.1863 30.3028 27.6833 31.0593C26.1802 31.8159 24.4769 32.0792 22.8156 31.8119C21.1543 31.5445 19.6195 30.7602 18.4297 29.5703C17.2398 28.3805 16.4555 26.8457 16.1881 25.1844C15.9208 23.5231 16.1841 21.8198 16.9407 20.3167C17.6972 18.8137 18.9084 17.5875 20.402 16.8125C21.8956 16.0375 23.5955 15.7532 25.26 16C26.9578 16.2518 28.5297 17.0429 29.7434 18.2566C30.9571 19.4703 31.7482 21.0422 32 22.74Z" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p className="text-white text-xl font-['Bebas_Neue'] mt-2">@/lumbinilions</p>
                    </div>
                    
                    {/* Shop Card */}
                    <div className="bg-neutral-900 p-4">
                        <div className="flex items-center">
                            <span className="text-amber-500 text-4xl font-['Bebas_Neue']">|</span>
                            <h3 className="text-white text-2xl font-['Bebas_Neue'] ml-2">Shop our apparel now</h3>
                        </div>
                        <div className="flex justify-end">
                            <img className="w-16 h-16 " src="jersey.png" alt="Shop icon" />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3: Featured News Article */}
            <div className="w-full px-4 md:px-8 py-8">
                <div className="relative rounded-lg overflow-hidden max-w-5xl mx-auto">
                    <img 
                        className="w-full h-auto object-cover" 
                        src="news.jpg" 
                        alt="News Feature" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <h2 className="absolute bottom-0 left-0 right-0 text-center text-amber-500 text-2xl sm:text-3xl md:text-4xl font-['Bebas_Neue'] uppercase p-4">
                        Lumbini Lions restrict Janakpur Bolts to 136 with impressive bowling
                    </h2>
                </div>
            </div>

            {/* SECTION 4: Our Story */}
            <div className="w-full px-4 md:px-8 py-10 bg-black">
                <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
                    {/* Team Logo */}
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <img className="w-full max-w-xs mx-auto" src="logo.png" alt="Team Logo" />
                    </div>
                    
                    {/* Story Text */}
                    <div className="md:w-2/3 md:pl-8">
                        <h2 className="text-5xl sm:text-6xl font-['Bebas_Neue'] text-white relative">
                            Our story
                            <span className="absolute bottom-0 left-0 text-amber-500">___</span>
                        </h2>
                        <p className="text-white text-lg sm:text-xl mt-6 max-w-lg font-bold">
                            We started our journey from the golden peaceful lands of Lumbini where lord Buddha was born
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default Thirdpage;