import React from 'react'
import Newscard from '../components/newscard';

const newspage = () => {
    const newsArray = [
        {
          id: 1,
          title: "Lumbini Lions Secure Dramatic Win Against Kathmandu Gurkhas",
          publishedat: "April 15, 2025",
          image : "news2.webp",
          description: "In a thrilling match that went down to the final over, the Lumbini Lions secured a crucial victory against the Kathmandu Gurkhas by 18 runs, keeping their playoff hopes alive."
        },
        {
          id: 2,
          title: "Team Captain Named Player of the Month",
          publishedat: "April 10, 2025",
          image : "news.jpg",
          description: "Lumbini Lions' captain has been recognized as the Player of the Month after leading the team to three consecutive victories with outstanding all-round performances."
        },
        {
          id: 3,
          title: "New Training Facility Opens in Lumbini",
          publishedat: "April 5, 2025",
          image : "news3.jpg",
          description: "The Lumbini Lions are proud to announce the opening of their state-of-the-art training facility, designed to nurture local talent and provide the team with world-class training resources."
        }
      ];
    return ( 
        <div className='pt-20 bg-black'>
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* News Item 1 */}
                {newsArray.map((element: {
                    id: number;
                    title: string;
                    publishedat: string;
                    description: string;
                    image: string;
                }) => {
                    console.log(element.image);
                    return <Newscard key={element.id} news={element}/>;
                })}

            </div>

            
            <div className="mt-8 text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Load More News</button>
            </div>
        </div>
        </div>
     );
}
 
export default newspage;