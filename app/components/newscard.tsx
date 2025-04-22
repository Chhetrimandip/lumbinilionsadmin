import React from 'react'
import Image from 'next/image'

interface NewsType {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    date: string;
    content: string;
}

type NewsProp = {
    news: NewsType
}

const Newscard: React.FC<NewsProp> = ({ news }) => {
    return (
        <div className="bg-neutral-800 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow duration-300">
            <div className="relative h-48">
                <Image 
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className="p-5">
                <span className="text-amber-500 text-sm">{news.date}</span>
                <h3 className="text-xl text-white font-semibold mt-2 mb-2">{news.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{news.subtitle}</p>
                <p className="text-gray-300 mb-4 line-clamp-3">{news.content}</p>
                <button className="text-amber-500 hover:text-amber-400 font-semibold transition-colors">
                    Read More →
                </button>
            </div>
        </div>
    );
}

export default Newscard;