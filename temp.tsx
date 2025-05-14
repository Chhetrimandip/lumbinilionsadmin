"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X } from 'lucide-react';

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery'); // API route to fetch gallery images
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleryImages(data);
      } catch (err) {
        setError('Failed to load gallery images. Please try again later.');
      }
    }

    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-[#06101B] to-[#0A192F] text-white min-h-screen py-16">
      {/* Gallery Header */}
      <div className="w-full relative">
        {/* Background Image */}
        <div className="w-full h-[300px] md:h-[595px] relative">
          <Image 
            src="/headerbg2.webp"
            alt="Header Background"
            fill
            className="object-cover"
          />
          {/* Overlay Image */}
          <div className="absolute inset-0">
            <Image 
              src="/rectangle151.webp"
              alt="Overlay"
              fill
              className="object-cover"
            />
          </div>
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
              Gallery
            </h1>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4">
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 
                  ${image.isLandscape ? 'sm:col-span-2' : 'row-span-1 sm:row-span-2'}`}
                onClick={() => openModal(image)} // Open modal on click
              >
                <div className={`relative ${
                  image.isLandscape 
                    ? 'h-64 sm:h-72 md:h-80 lg:h-96' 
                    : 'h-80 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]'
                }`}>
                  <Image
                    src={image.imageUrl}
                    alt={image.title || 'Gallery Image'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full">
                      <p className="text-white font-medium text-lg">
                        {image.title || 'Gallery Image'}
                      </p>
                      <p className="text-white/70 text-sm">
                        NPL 2024 • Lumbini Lions
                      </p>
                    </div>
                    {/* Expand button */}
                    <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Load More Button */}
        <div className="mt-12 flex justify-center">
          <button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
            <span>Load More Images</span>
            <Camera className="w-5 h-5 ml-2" />
          </button>
        </div>
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
      {/* Modal for Full-Screen Preview */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title || 'Gallery Image'}
              width={1200}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}