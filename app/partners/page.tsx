"use client"
import React from 'react'
import Image from 'next/image'

const PartnersPage = () => {
    return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500 mb-8 text-center">
                    <span className="text-amber-500">|</span> OUR PARTNERS
                </h1>
                
                <p className="text-white text-center text-lg mb-12 max-w-3xl mx-auto">
                    We&apos;re proud to collaborate with these amazing organizations who share our passion for cricket and community development. Together, we&apos;re creating a stronger cricket culture in Nepal.
                </p>
                
                {/* Main Sponsors Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-['Bebas_Neue'] text-amber-500 mb-6 text-center">
                        MAIN SPONSORS
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        <div className="bg-white/10 hover:bg-white/20 transition-all p-8 rounded-lg flex flex-col items-center">
                            <Image 
                                src="/sponsor1.webp" 
                                alt="GlobeTech Industries" 
                                width={240}
                                height={120}
                                className="h-24 object-contain mb-4"
                            />
                            <h3 className="text-xl text-white font-semibold mb-2">GlobeTech Industries</h3>
                            <p className="text-gray-300 text-center">Official Title Sponsor</p>
                        </div>
                        
                        <div className="bg-white/10 hover:bg-white/20 transition-all p-8 rounded-lg flex flex-col items-center">
                            <Image 
                                src="/sponsor2.webp" 
                                alt="Mountain Airways" 
                                width={240}
                                height={120}
                                className="h-24 object-contain mb-4"
                            />
                            <h3 className="text-xl text-white font-semibold mb-2">Mountain Airways</h3>
                            <p className="text-gray-300 text-center">Official Travel Partner</p>
                        </div>
                    </div>
                </section>
                
                {/* Associate Sponsors */}
                <section className="mb-16">
                    <h2 className="text-3xl font-['Bebas_Neue'] text-amber-500 mb-6 text-center">
                        ASSOCIATE SPONSORS
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 hover:bg-white/10 transition-all p-6 rounded-lg flex flex-col items-center">
                            <Image 
                                src="/sponsor3.webp" 
                                alt="NepBank" 
                                width={180}
                                height={90}
                                className="h-16 object-contain mb-3"
                            />
                            <h3 className="text-lg text-white font-medium mb-1">NepBank</h3>
                            <p className="text-gray-400 text-center text-sm">Official Banking Partner</p>
                        </div>
                        
                        <div className="bg-white/5 hover:bg-white/10 transition-all p-6 rounded-lg flex flex-col items-center">
                            <Image 
                                src="/sponsor4.webp" 
                                alt="Mountain Dew" 
                                width={180}
                                height={90}
                                className="h-16 object-contain mb-3"
                            />
                            <h3 className="text-lg text-white font-medium mb-1">Mountain Dew</h3>
                            <p className="text-gray-400 text-center text-sm">Official Beverage Partner</p>
                        </div>
                        
                        <div className="bg-white/5 hover:bg-white/10 transition-all p-6 rounded-lg flex flex-col items-center">
                            <Image 
                                src="/sponsor5.webp" 
                                alt="TechNep" 
                                width={180}
                                height={90}
                                className="h-16 object-contain mb-3"
                            />
                            <h3 className="text-lg text-white font-medium mb-1">TechNep</h3>
                            <p className="text-gray-400 text-center text-sm">Official Technology Partner</p>
                        </div>
                    </div>
                </section>
                
                {/* Community Partners */}
                <section>
                    <h2 className="text-3xl font-['Bebas_Neue'] text-amber-500 mb-6 text-center">
                        COMMUNITY PARTNERS
                    </h2>
                    
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-10">
                        <div className="flex flex-wrap justify-center gap-y-8 gap-x-12">
                            <div className="flex flex-col items-center">
                                <Image 
                                    src="/partner1.webp" 
                                    alt="Lumbini Cricket Academy" 
                                    width={140}
                                    height={70}
                                    className="h-12 object-contain mb-2 opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-gray-400 text-xs">Lumbini Cricket Academy</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <Image 
                                    src="/partner2.webp" 
                                    alt="Youth Sports Foundation" 
                                    width={140}
                                    height={70}
                                    className="h-12 object-contain mb-2 opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-gray-400 text-xs">Youth Sports Foundation</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <Image 
                                    src="/partner3.webp" 
                                    alt="Community Health Initiative" 
                                    width={140}
                                    height={70}
                                    className="h-12 object-contain mb-2 opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-gray-400 text-xs">Community Health Initiative</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <Image 
                                    src="/partner4.webp" 
                                    alt="Tourism Nepal" 
                                    width={140}
                                    height={70}
                                    className="h-12 object-contain mb-2 opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-gray-400 text-xs">Tourism Nepal</p>
                            </div>
                        </div>
                        
                        <div className="text-center mt-12">
                            <h3 className="text-xl text-white font-semibold mb-4">Become a Partner</h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Interested in partnering with Lumbini Lions? We&apos;re always looking for organizations that share our values and vision for cricket in Nepal.
                            </p>
                            <button className="bg-amber-500 hover:bg-amber-600 text-black text-lg font-['Bebas_Neue'] px-6 py-3 rounded-lg transition-transform hover:scale-105">
                                CONTACT US FOR PARTNERSHIP
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PartnersPage;