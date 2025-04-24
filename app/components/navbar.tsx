"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollThreshold = 40; // Increased threshold to reduce sensitivity
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Clear any existing timeout to prevent rapid changes
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Only update if we've scrolled past the threshold
            if (Math.abs(window.scrollY - lastScrollY) > scrollThreshold) {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    // Scrolling down - hide the navbar
                    setVisible(false);
                    // Close mobile menu when scrolling down
                    setMobileMenuOpen(false);
                } else if (window.scrollY < lastScrollY) {
                    // Scrolling up - show the navbar
                    setVisible(true);
                }
                
                // Add a delay before updating lastScrollY to prevent flickering
                scrollTimeout.current = setTimeout(() => {
                    setLastScrollY(window.scrollY);
                }, 100); // Increased timeout for better debouncing
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [lastScrollY]);

    // Close mobile menu when escape key is pressed
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (  
        <>
            {/* Backdrop for mobile menu */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <nav className={`bg-neutral-900/80 backdrop-blur-sm py-2 fixed w-full z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo - always visible */}
                    <Link href="/" className="relative z-50">
                        <Image 
                            src="/logo.png" 
                            width={120}
                            height={84}
                            alt="Lumbini Lions Logo" 
                            className="w-20 h-14 md:w-28 md:h-20 hover:scale-110 transition-transform duration-300" 
                            priority
                        />
                    </Link>

                    {/* Desktop Menu - keep unchanged */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-amber-500 hover:text-amber-400 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300">HOME</Link>
                        <Link href="/shop" className="text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300">SHOP</Link>
                        <Link href="/news" className="text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300">NEWS</Link>
                        <Link href="/partners" className="text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300">PARTNERS</Link>
                    </div>

                    {/* Hamburger Button - only on mobile */}
                    <button 
                        className="md:hidden relative z-50 p-2" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                        </div>
                    </button>

                    {/* Mobile Menu */}
                    <div className={`fixed md:hidden top-0 right-0 w-[250px] h-full bg-neutral-800 z-40 shadow-lg transform transition-transform duration-300 ease-in-out pt-24 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col items-center gap-6 px-4">
                            <Link 
                                href="/" 
                                className="w-full text-center py-3 text-amber-500 hover:text-amber-400 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300 border-b border-neutral-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            
                            <Link 
                                href="/shop" 
                                className="w-full text-center py-3 text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300 border-b border-neutral-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                SHOP
                            </Link>
                            
                            <Link 
                                href="/news" 
                                className="w-full text-center py-3 text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300 border-b border-neutral-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                NEWS
                            </Link>
                            
                            <Link 
                                href="/partners" 
                                className="w-full text-center py-3 text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300 border-b border-neutral-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                PARTNERS
                            </Link>
                            
                            <Link 
                                href="/quizpage" 
                                className="w-full text-center py-3 text-zinc-100 hover:text-amber-500 text-2xl font-['Bebas_Neue'] uppercase tracking-wide transition-colors duration-300 border-b border-neutral-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                QUIZ
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;