"use client"
import React from 'react'
import Image from 'next/image'
import Shopcard from '../components/shopcard'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'

const Shoppage = () => {
    // Sample product data array
    const { addtocart, totalitem } = useCartStore();
    const cartCount = totalitem();
    
    const products = [
        {
            id: 1,
            name: "Lumbini Lions Home Jersey",
            price: "900.99",
            image: "/shirt.png",
            isFeatured: true
        },
        {
            id: 2,
            name: "Lumbini Lions Away Jersey",
            price: "900.99",
            image: "/awayjersey.jpg",
            isFeatured: false
        },
        {
            id: 3,
            name: "Lumbini Lions Hoodie",
            price: "4000.99",
            image: "/hoodie.png",
            isFeatured: false
        },
        {
            id: 4,
            name: "Lumbini Lions T-Shirt",
            price: "500.99",
            image: "/shirt.png",
            isFeatured: false
        },

    ];

    return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4 relative">
            {/* Cart icon/button */}
            <Link href="/cart" className="fixed top-24 right-8 z-10 bg-amber-500 hover:bg-amber-600 text-black p-3 rounded-full transition-colors shadow-lg">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>
                    )}
                </div>
            </Link>
            
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500 mb-8 text-center">
                    <span className="text-amber-500">|</span> OFFICIAL MERCHANDISE
                </h1>
                
                {/* Featured Product */}
                <div className="bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded-xl mb-16 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 flex justify-center items-center p-8">
                            <Image 
                                src="/jersey.png" 
                                alt="Featured Jersey"
                                width={400}
                                height={400}
                                className="w-full max-w-[400px] object-contain"
                            />
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center p-8">
                            <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white mb-4">Lumbini Lions Official Jersey</h2>
                            <p className="text-gray-300 mb-8">The official match jersey of the Lumbini Lions, featuring advanced moisture management, breathable fabric, and the team&apos;s iconic emblem. Made with recycled polyester, this authentic jersey combines comfort, style, and sustainability.</p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <button 
                                    onClick={() => addtocart({
                                        id: "jersey",
                                        price: 900.99,
                                        name: "Lumbini Lions Official Jersey",
                                        image: "/jersey.png"
                                    })} 
                                    className="bg-amber-500 hover:bg-amber-600 text-black text-xl font-['Bebas_Neue'] px-6 py-3 rounded-lg transition-colors"
                                >
                                    ADD TO CART — Rs900.99
                                </button>
                                <button className="bg-neutral-700 hover:bg-neutral-600 text-white text-xl font-['Bebas_Neue'] px-6 py-3 rounded-lg transition-colors">
                                    VIEW DETAILS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {products.filter(product => !product.isFeatured).map(product => (
                        <Shopcard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Shoppage;