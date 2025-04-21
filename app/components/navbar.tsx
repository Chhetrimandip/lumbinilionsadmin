"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'


const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // If we're scrolling down and past 50px, hide the navbar
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                setVisible(false);
            } 
            // If we're scrolling up, show the navbar
            else if (window.scrollY < lastScrollY) {
                setVisible(true);
            }
            
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (  
        <nav className={`bg-transparent py-1 fixed w-full z-[100] transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}>
            <div className="container mx-auto flex justify-center items-center gap-8 px-2">
                <Link href="/" className="text-zinc-100 hover:text-amber-500 text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">HOME</Link>
                <Link href="/news" className="text-zinc-100 hover:text-amber-500 text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">News</Link>
                <Link href="/shop" className="text-zinc-100 hover:text-amber-500 text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Shop</Link>
                
                <Link href="/" className="mx-2">
                    <img className="w-60 h-40 hover:scale-120 transition-transform duration-300" src="logo.png" alt="Lumbini Lions Logo" />
                </Link>
                
                <Link href="/partners" className="text-zinc-100 hover:text-amber-500 text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Partners</Link>
                <Link href="/contact" className="text-zinc-100 hover:text-amber-500 text-5xl font-['Bebas_Neue'] uppercase tracking-tighter transition-colors duration-300">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;