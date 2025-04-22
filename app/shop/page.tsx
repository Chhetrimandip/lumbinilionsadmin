import React from 'react'
import Link from 'next/link'

const shoppage = () => {
    return (
        <div className="relative min-h-screen py-20 w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/buddha.png"
                    alt="Buddha Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                {/* Vignette effect (darker corners) */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto py-20 px-4 text-white">
                <h1 className="text-5xl font-['Bebas_Neue'] text-amber-500 mb-12 text-center">
                    <span className="text-amber-500">|</span> TEAM SHOP
                </h1>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                    {/* Jersey Image */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <img src="jersey.png" alt="Jersey" className="w-full max-w-[700px]"></img>
                    </div>
                    
                    {/* Product Details */}
                    <div className="md:w-1/2 bg-neutral-900/60 backdrop-blur-sm p-6 rounded-lg">
                        <h2 className="text-4xl font-['Bebas_Neue'] text-amber-500">Home Jersey</h2>
                        <div className="flex items-center mt-2 mb-4">
                            <p className="text-2xl font-['Bebas_Neue'] text-white">Price: Rs. 999 /-</p>
                            <span className="ml-6 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">In Stock</span>
                        </div>
                        
                        <div className="my-6 border-t border-b border-gray-700 py-6">
                            <h3 className="text-3xl font-['Bebas_Neue'] text-amber-500 mb-4">ROAR WITH PRIDE</h3>
                            <p className="text-zinc-300 mb-4">
                                Embody the spirit of the Lumbini Lions with our official 2025 home jersey. Designed for comfort and crafted with passion, this jersey connects you to the team's legacy.
                            </p>
                            <p className="text-zinc-300 mb-4">
                                Featuring our iconic lion emblem and the golden hues of Lumbini, this premium jersey combines style with team pride—perfect for match days or showcasing your allegiance every day.
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <h4 className="text-xl font-['Bebas_Neue'] text-white mb-2">Key Features:</h4>
                            <ul className="list-disc pl-5 text-zinc-300 space-y-1">
                                <li>Official Lumbini Lions crest and team colors</li>
                                <li>Moisture-wicking, lightweight fabric</li>
                                <li>Enhanced durability for lasting support</li>
                                <li>Proudly crafted in Nepal</li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-6 mb-6">
                            <div>
                                <h4 className="text-xl font-['Bebas_Neue'] text-white mb-2">Choose Player:</h4>
                                <select className="bg-neutral-800 text-white px-4 py-2 rounded w-full">
                                    <option>Standard</option>
                                    <option value="custom">Custom Name</option>
                                    <option>Sharma</option>
                                    <option>Paudel</option>
                                </select>
                            </div>
                            <div>
                                <h4 className="text-xl font-['Bebas_Neue'] text-white mb-2">Size:</h4>
                                <select className="bg-neutral-800 text-white px-4 py-2 rounded w-full">
                                    <option>Select Size</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                            </div>
                        </div>
                        
                        <Link href="/shop/order" className="inline-block bg-amber-500 hover:bg-amber-600 text-black text-2xl font-['Bebas_Neue'] px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 text-center">
                            ORDER NOW
                        </Link>
                    </div>
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-xl font-['Bebas_Neue'] text-zinc-400">More products coming soon...</p>
                </div>
            </div>
        </div>
    );
}
 
export default shoppage;