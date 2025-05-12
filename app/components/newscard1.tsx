// app/components/newscard.tsx
"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFirstImageFromContent, getExcerptFromContent } from '@/lib/editorjs-parser'

interface NewsType {
    id: number | string;
    title: string;
    subtitle?: string;
    slug?: string;
    image?: string;
    content: string;
    date: string;
    author?: string;
}

type NewsProp = {
    news: NewsType
}

const Newscard1: React.FC<NewsProp> = ({ news }) => {
    // Get image from content if not directly provided
    const imageUrl = news.image || getFirstImageFromContent(news.content) || '/news.jpg';
    
    // Get excerpt from content if no subtitle
    const subtitle = news.subtitle || getExcerptFromContent(news.content, 120);
    
    // Create link to full article
    const articleUrl = news.slug ? `/news/${news.slug}` : `/news/article/${news.id}`;
    
    // Format date
    const formattedDate = news.date ? new Date(news.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : '';
    
    return (
        <div className="overflow-hidden rounded-lg bg-[#091B2F] shadow-md hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-300 h-full flex flex-col">
            <Link href={articleUrl} className="flex flex-col h-full">
                <div className="relative h-[200px] w-full">
                    <Image 
                        src={imageUrl}
                        alt={news.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/news.jpg';
                        }}
                    />
                    
                    {/* Date badge */}
                    {formattedDate && (
                        <div className="absolute bottom-3 left-3 bg-amber-500 text-black text-xs font-medium px-2 py-1 rounded">
                            {formattedDate}
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-xl text-white font-semibold mb-2 line-clamp-2 hover:text-amber-400 transition-colors">
                        {news.title}
                    </h3>
                    
                    <p className='text-gray-300 text-sm line-clamp-3'>
                        {subtitle}
                    </p>

                </div>
            </Link>
        </div>
    );
}

export default Newscard1;