"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                setVisible(false);
            } else if (window.scrollY < lastScrollY) {
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (  
        <nav className={`bg-transparent py-1 fixed w-full z-[100] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}>
            <div className="container mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 px-2">
                <Link href="/" className="w-28 h-16 text-center text-amber-500 hover:text-amber-400 text-2xl sm:text-3xl font-['Bebas_Neue'] uppercase leading-[62.40px] tracking-wide underline transition-colors duration-300">HOME</Link>
                
                <Link href="/shop" className="w-28 h-16 text-center text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl font-['Bebas_Neue'] uppercase leading-[62.40px] tracking-wide transition-colors duration-300">SHOP</Link>
                
                <Link href="/" className="mx-2">
                    <Image 
                        src="/logo.png" 
                        width={160}
                        height={112}
                        alt="Lumbini Lions Logo" 
                        className="w-28 h-20 sm:w-32 sm:h-24 md:w-40 md:h-28 hover:scale-110 transition-transform duration-300" 
                        priority
                    />
                </Link>
                
                <Link href="/news" className="w-28 h-16 text-center text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl font-['Bebas_Neue'] uppercase leading-[62.40px] tracking-wide transition-colors duration-300">NEWS</Link>
                
                <Link href="/partners" className="w-28 h-16 text-center text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl font-['Bebas_Neue'] uppercase leading-[62.40px] tracking-wide transition-colors duration-300">PARTNERS</Link>
            </div>
        </nav>
    );
}

export default Navbar;