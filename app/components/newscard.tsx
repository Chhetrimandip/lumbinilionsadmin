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

const Newscard: React.FC<NewsProp> = ({ news }) => {
    // Get image from content if not directly provided
    console.log("the content recieved : " , news)
    const imageUrl = news.image || getFirstImageFromContent(news.content) || '/news.jpg';
    
    // Get excerpt from content if no subtitle
    const subtitle = news.subtitle || getExcerptFromContent(news.content, 200);
    
    // Create link to full article
    const articleUrl = news.slug ? `/news/${news.slug}` : `/news/article/${news.id}`;
    
    return (
        <div className="overflow-hidden hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow duration-300">
        <Link href={articleUrl} className="text-amber-500 hover:text-amber-400 font-semibold transition-colors inline-block">
            <div className="relative h-[369px] w-[454px]">
                {/* Image covers the entire card */}
                <Image 
                    src={imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                        // Fallback image if the main one fails to load
                        (e.target as HTMLImageElement).src = '/news.jpg';
                    }}
                />
                
                {/* Dark gradient overlay at the bottom only */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent h-[60%] p-4">
                    <div className="flex flex-col justify-end h-full">
                        <h3 className="text-xl text-white font-semibold mt-1 mb-1 line-clamp-2">{news.title}</h3>
                        <p className='text-white opacity-70 text-[13px]'>{subtitle}</p>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}

export default Newscard;