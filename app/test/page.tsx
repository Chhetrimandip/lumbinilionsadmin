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
            <div className='flex relative justify-end h-full w-full'>
                <div className='absolute left-[145px] z-10 md:left-36'>
                    <p className='font-[poppins] text-[40px] text-white mt-[95px]'>Featured videos</p>
                    <p className='font-[poppins] text-[20px] opacity-70 text-white mt-2 hover:underline'>View all videos</p>
                    <div className='flex flex-col md:flex-row gap-4 mt-[40px]'>
                        <Image src="/buddha.jpg" alt='video1' height={238} width={369} className='object-contain z-[3]'/>
                        <Image src="/buddha.jpg" alt='video1' height={238} width={369} className='object-contain z-[3]'/>
                    </div>
                </div>
                <Image alt="fvbg" src="/fv.png" height={536} width={1095} className='h-full w-auto object-cover z-[1]'/>
            </div>
        </div>
    );
}
export default FeaturedVideos;