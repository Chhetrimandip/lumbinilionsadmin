"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Add proper TypeScript typing
interface FeaturedNewsProps {
  displayFeatured: {
    id: string | number;
    title: string;
    slug?: string;
    image?: string;
    subtitle?: string;
    content: string;
  };
  ExcerptFromContent: string;
}

function MergedFeaturedNews({
  displayFeatured,
  ExcerptFromContent,
}: FeaturedNewsProps) {
  return (
    <div className="w-full relative  backdrop-blur-sm   mt-10 overflow-hidden  ">
      {/* Background Image */}
      <div className="w-full h-[300px] md:h-[595px] relative">
        <Image
          src={displayFeatured.image || "/news.jpg"}
          alt="Featured News"
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/news.jpg";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 text-center">
          <span className="inline-block bg-amber-500 text-black px-3 py-1 rounded text-sm font-semibold mb-3">
            FEATURED
          </span>
          <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white mb-2">
            {displayFeatured.title}
          </h2>
          <p className="text-gray-200 mb-4 max-w-3xl mx-auto">
            {ExcerptFromContent}
          </p>
          <Link
            href={`/news/${displayFeatured.slug || displayFeatured.id}`}
            className="bg-white hover:bg-amber-500 text-black text-xl font-['Bebas_Neue'] px-6 py-2 rounded-lg transition-colors inline-block"
          >
            READ FULL STORY
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MergedFeaturedNews;