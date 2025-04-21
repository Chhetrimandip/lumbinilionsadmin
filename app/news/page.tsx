import React from 'react'

const newspage = () => {
    return ( 
        <div className='pt-20'>
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* News Item 1 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/images/news-1.jpg" alt="News" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Club Announces New Training Facility</h2>
                        <p className="text-gray-600 mb-3">March 15, 2023</p>
                        <p className="text-gray-700">Lumbini Lions are proud to announce the opening of our state-of-the-art training facility...</p>
                        <a href="/news/1" className="inline-block mt-3 text-blue-600 hover:text-blue-800">Read more</a>
                    </div>
                </div>
                
                {/* News Item 2 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/images/news-2.jpg" alt="News" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Season Recap: Our Journey to the Finals</h2>
                        <p className="text-gray-600 mb-3">February 28, 2023</p>
                        <p className="text-gray-700">A look back at our incredible season and the road to the championship match...</p>
                        <a href="/news/2" className="inline-block mt-3 text-blue-600 hover:text-blue-800">Read more</a>
                    </div>
                </div>
                
                {/* News Item 3 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/images/news-3.jpg" alt="News" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Player Spotlight: Team Captain Interview</h2>
                        <p className="text-gray-600 mb-3">February 10, 2023</p>
                        <p className="text-gray-700">We sat down with our team captain to discuss leadership, goals, and the upcoming season...</p>
                        <a href="/news/3" className="inline-block mt-3 text-blue-600 hover:text-blue-800">Read more</a>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Load More News</button>
            </div>
        </div>
        </div>
     );
}
 
export default newspage;