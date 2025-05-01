import React from 'react'
import Image from 'next/image';
const FeaturedVideos = () => {
    return ( 
        <div className='h-[536px] relative w-auto overflow-hidden'>
                <div 
                className="absolute inset-y-0 left-0 right-0 z-[2] opacity-70"
                style={{
                    background: 'linear-gradient(to right, #050C13 0%, #060C14 45%, #060C14 50%,rgb(75, 62, 35) 100%)'
                }}
                ></div>            
                <div className='flex relative justify-end h-full w-full '>
                <p className='font-[poppins] text-[40px] text-white z-10 absolute left-[145px] top-[95px] '>Featured videos</p>
                <p className='font-[poppins] text-[20px] opacity-70 text-white z-10 absolute left-[145px] top-[143px] hover:underline '>View all videos</p>
                <iframe className='absolute left-[144px] top-[199px] z-[10]' width="369" height="238" src="https://www.youtube.com/embed/e1T8r5eQcSg?si=Z0WoGUxz3eIbNN2b" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>            
                <iframe className='absolute left-[530px] top-[199px] z-[10]' width="369" height="238" src="https://www.youtube.com/embed/TOZf2D0EVrY?si=3uoMaODKI-k8m34E" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>                <Image alt="fvbg" src="/fv.png" height={536} width={1095} className='h-full w-auto object-cover z-[1]'/>
            </div>
        </div>
     );
}
 
export default FeaturedVideos;