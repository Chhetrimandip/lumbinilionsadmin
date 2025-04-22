import React from 'react'

interface NewsType  {
    title: string,
    publishedat: string,
    description: string,
    image: string,
}

type NewsProp = {
    news : NewsType
}


const Newscard = ({news} : {news:NewsType}) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* News Item */}
            <img src={`/${news.image}`} alt="News" className="w-full h-60 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                <p className="text-white-600 mb-3">{news.publishedat}</p>
                <p className="text-white-600">{news.description}</p>
                <a href="/news/2" className="inline-block mt-3 text-blue-600 hover:text-blue-800">Read more</a>
            </div>
        </div>
    );
}
 
export default Newscard;