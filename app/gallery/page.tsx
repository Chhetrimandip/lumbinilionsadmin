"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X } from 'lucide-react';

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openmodal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
  }

  // Filter images based on selected category
  useEffect(() => {
    if (!galleryImages.length) return;

    if (selectedCategory === null || selectedCategory === 'All') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(image => 
        image.category === selectedCategory
      ));
    }
  }, [selectedCategory, galleryImages]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleryImages(data);
        setFilteredImages(data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(img => img.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load gallery images. Please try again later.');
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#06101B] to-[#0A192F] text-white min-h-screen py-16">
      {/* Gallery Header */}
      <div className="w-full relative">
        {/* Background Image */}
        <div className="w-full h-[300px] md:h-[595px] relative">
          <Image 
            src="/headerbg2.png"
            alt="Header Background"
            fill
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(6, 16, 27, 0) 0%, 
                rgba(6, 16, 27, 0.43) 18%, 
                rgba(6, 16, 27, 0.73) 45%, 
                rgba(6, 16, 27, 0.90) 75%, 
                rgba(6, 16, 27, 1) 100%)`,
              backdropFilter: 'blur(2px)'
            }}
          ></div>
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Lion Shield positioned behind text */}
            <div className="absolute w-[335px] h-[344.5px] opacity-100">
              <Image 
                src="/lionsshield.png"
                alt="Lion Shield"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold font-['poppins'] tracking-wider">
              Gallery
            </h1>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4">
        {/* Filter categories - dynamically generated */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12">
          <div className='text-white font-bold text-[20px] font-[poppins] flex flex-wrap gap-6 mb-12 justify-center'>
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 py-1 transition-all duration-300 ${
                  (selectedCategory === category || (category === 'All' && selectedCategory === null)) 
                  ? 'text-white border-b-2 border-amber-500' 
                  : 'text-white/60 hover:text-white'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-10 md:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <div className="relative h-[235px] w-[353px] mx-auto">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || 'Gallery Image'}
                    width={353}
                    height={235}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full">
                      <p className="text-white font-medium text-lg">
                        {image.title || 'Gallery Image'}
                      </p>
                      <p className="text-white/70 text-sm">
                        {image.category ? `${image.category} • ` : ''}NPL 2024 • Lumbini Lions
                      </p>
                    </div>
                    {/* Expand button */}
                    <button onClick={() => openmodal(image)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load More Button - Only show if there are images */}
        {filteredImages.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
              <span>Load More Images</span>
              <Camera className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
        
        {/* Gallery Info */}
        <div className="mt-20 mb-10 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">About Our Gallery</h3>
              <p className="text-white/70">
                The Lumbini Lions gallery showcases the best moments from our matches, training sessions, and fan engagement events. Our team photographers capture the essence of cricket and the spirit of our Lions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Usage Rights</h3>
              <p className="text-white/70">
                All images are copyright protected and owned by Lumbini Lions Cricket Club. For media inquiries and usage permissions, please contact our media relations department.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Submit Photos</h3>
              <p className="text-white/70">
                Are you a fan with great shots of the Lions? Submit your photos for a chance to be featured in our fan gallery section. Tag us on social media or use #LumbiniLions.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Full screen modal preview*/}
      {isModalOpen && selectedImage && (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
          <div className='relative w-full max-w-4xl'>
            <button className='absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors'
              onClick={closeModal}>
              <X className='w-6 h-6'/>
            </button>
            <Image 
              src={selectedImage.imageUrl}
              alt={selectedImage.title || "Gallery Image"}
              width={1200}
              height={800}
              className='object-contain'
            />
          </div>
        </div>
      )}
    </div>
  );
}