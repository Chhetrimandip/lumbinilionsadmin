import React from 'react'
import Image from 'next/image'

{ /* Header with background, overlay, and text */}
const NewsTop = () => {
    return ( 
        <div className="w-full relative">
        {/* Background Image */}
        <div className="w-full h-[300px] md:h-[595px] relative">
            <Image 
                src="/news3.jpg" 
                alt="Header Background"
                fill
                className="object-cover"
            />

            
            {/* Overlay Image */}
            {/* <div className="absolute inset-0">
                <Image 
                    src="/rectangle151.webp"
                    alt="Overlay"
                    fill
                    className="object-cover"
                />
            </div> */}
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                    {/* Lion Shield positioned behind text */}
                    <div className="absolute w-[335px] h-[344.5px] opacity-100">
                        <Image 
                            src="/lionsshield.webp"
                            alt="Lion Shield"
                            fill
                            className="object-contain"
                        />
                    </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold font-['poppins'] tracking-wider">
                    NEWS
                </h1>
            </div>
        </div>
    </div>
     );
}
 
export default NewsTop;