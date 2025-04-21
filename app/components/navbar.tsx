"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

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
            <div className="container mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 px-2">
                <Link href="/" className="text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">HOME</Link>
                
                <Link href="/news" className="text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">News</Link>
                
                <Link href="/shop" className="text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Shop</Link>
                
                <Link href="/" className="mx-2">
                    <img 
                        className="w-28 h-20 sm:w-36 sm:h-28 md:w-48 md:h-32 lg:w-60 lg:h-40 hover:scale-110 transition-transform duration-300" 
                        src="logo.png" 
                        alt="Lumbini Lions Logo" 
                    />
                </Link>
                
                <Link href="/partners" className="text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Partners</Link>
                
                <Link href="/contact" className="text-zinc-100 hover:text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;
