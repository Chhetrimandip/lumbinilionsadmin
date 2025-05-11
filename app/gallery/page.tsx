import React from 'react';
import Image from 'next/image';
import { Camera, Maximize2 } from 'lucide-react';

// Number of gallery images to display initially
const INITIAL_IMAGE_COUNT = 5;

export default function GalleryPage() {
  // Generate image data based on the naming pattern
  const galleryImages = Array.from({ length: INITIAL_IMAGE_COUNT }, (_, index) => {
    const imageNumber = index + 1;
    const isLandscape = imageNumber % 2 !== 0; // Odd numbers are landscape
    
    return {
      id: imageNumber,
      src: `/gallery/${imageNumber}.jpg`,
      alt: `Gallery image ${imageNumber}`,
      isLandscape,
    };
  });

  return (
    <div className="bg-gradient-to-b from-[#06101B] to-[#0A192F] text-white min-h-screen py-16">
      {/* Gallery Header */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-amber-500/5 blur-3xl z-0"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <Camera className="w-12 h-12 text-amber-500 mb-4 mx-auto" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                The Lions Gallery
              </h1>
              <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
                Capturing moments of glory, teamwork, and passion from the Lumbini Lions
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4">
        {/* Gallery Grid - Fixed for proper aspect ratio across devices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className={`group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 
                ${image.isLandscape ? 'sm:col-span-2' : 'row-span-1 sm:row-span-2'}`}
            >
              {/* Use fixed height containers based on orientation */}
              <div className={`relative ${
                image.isLandscape 
                  ? 'h-64 sm:h-72 md:h-80 lg:h-96' 
                  : 'h-80 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]'
              }`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="w-full">
                    <p className="text-white font-medium text-lg">
                      {image.isLandscape ? 'Match Action' : 'Player Spotlight'}
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
    </div>
  );
}