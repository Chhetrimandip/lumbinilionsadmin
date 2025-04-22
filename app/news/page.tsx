"use client"
import React from 'react'
import Newscard from '../components/newscard'
import Image from 'next/image'

const newspage = () => {
    // Sample news data array
    const newsArray = [
        {
            id: 1,
            title: "Lumbini Lions Sign Star Batsman Rajesh Kumar",
            subtitle: "The 28-year-old joins from Chitwan Rhinos on a two-year deal",
            image: "/news2.webp",
            date: "April 15, 2023",
            content: "The Lumbini Lions have completed the signing of star batsman Rajesh Kumar from rivals Chitwan Rhinos for an undisclosed fee. Kumar, who scored 412 runs in last season's tournament, has signed a two-year contract with the Lions. This acquisition is expected to significantly strengthen the Lions' batting lineup for the upcoming season."
        },
        {
            id: 2,
            title: "Lions Triumph in Season Opener Against Kathmandu Gurkhas",
            subtitle: "A dominant bowling performance secured an 18-run victory",
            image: "/news.jpg",
            date: "March 22, 2023",
            content: "The Lumbini Lions kicked off their 2023 season with an impressive 18-run victory over the Kathmandu Gurkhas. After posting a competitive total of 165-7, the Lions' bowling attack, led by team captain Anil Sharma who took 3 wickets for just 24 runs, restricted the Gurkhas to 147-9. The win puts the Lions at the top of the table after the first round of matches."
        },
        {
            id: 3,
            title: "Lions Announce Partnership with Local Cricket Academy",
            subtitle: "The partnership aims to develop young talent in the Lumbini region",
            image: "/news3.jpg",
            date: "February 10, 2023",
            content: "The Lumbini Lions have announced a strategic partnership with the Lumbini Cricket Academy to help develop young cricket talent in the region. The partnership will include coaching sessions from Lions players, talent identification programs, and pathways for promising young cricketers to join the Lions' development squad. This initiative underscores the team's commitment to grassroots cricket development."
        },
        {
            id: 4,
            title: "New Stadium Construction on Track for Completion",
            subtitle: "The 15,000-capacity venue will be ready for next season",
            image: "/news4.jpg",
            date: "January 28, 2023",
            content: "Construction of the new Lumbini Lions Stadium is on schedule and expected to be completed before the start of next season. The 15,000-capacity stadium will feature state-of-the-art facilities, including improved seating, modern player amenities, and enhanced spectator experiences. The new venue represents a significant investment in the team's infrastructure and will serve as their home ground for the foreseeable future."
        },
        {
            id: 5,
            title: "Lions Announce Pre-Season Tournament Schedule",
            subtitle: "Four matches against regional teams will prepare the squad for the upcoming season",
            image: "/news5.jpg",
            date: "January 15, 2023",
            content: "The Lumbini Lions have announced their pre-season tournament schedule, featuring four matches against regional teams. The tournament will be held from February 15-28 and will serve as crucial preparation for the upcoming season. Coach Deepak Patel emphasized the importance of these matches for team cohesion and tactical development, especially with several new players joining the squad this year."
        },
        {
            id: 6,
            title: "Lions Launch New Home and Away Kits for 2023 Season",
            subtitle: "The new designs pay homage to Lumbini's rich cultural heritage",
            image: "/news6.jpg",
            date: "December 12, 2022",
            content: "The Lumbini Lions have unveiled their new home and away kits for the 2023 season. The home kit features the traditional amber and black colors, while the away kit introduces a bold blue design inspired by the region's rivers. Both kits incorporate subtle patterns representing Lumbini's cultural heritage. Team captain Anil Sharma expressed his enthusiasm for the new designs, noting that they connect the team to its roots while looking toward the future."
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500 mb-8 text-center">
                    <span className="text-amber-500">|</span> LATEST NEWS
                </h1>
                
                {/* Featured News */}
                <div className="bg-amber-500/10 backdrop-blur-sm rounded-xl mb-16 overflow-hidden border border-amber-500/40">
                    <div className="relative h-96">
                        <Image 
                            src="/news.jpg"
                            alt="Featured News"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="inline-block bg-amber-500 text-black px-3 py-1 rounded text-sm font-semibold mb-3">BREAKING NEWS</span>
                            <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white mb-2">Lions Secure Historic Sponsorship Deal</h2>
                            <p className="text-gray-200 mb-4 max-w-3xl">The Lumbini Lions have signed a record-breaking sponsorship deal with GlobeTech Industries, marking the largest partnership in the history of Nepali cricket.</p>
                            <button className="bg-white hover:bg-amber-500 text-black text-xl font-['Bebas_Neue'] px-6 py-2 rounded-lg transition-colors">
                                READ FULL STORY
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {newsArray.map(news => (
                        <Newscard key={news.id} news={news} />
                    ))}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-10">
                    <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-xl font-['Bebas_Neue'] px-8 py-3 rounded-lg transition-colors">
                        LOAD MORE NEWS
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default newspage;