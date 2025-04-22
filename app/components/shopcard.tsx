import React from 'react'

const shoppage = () => {
    return ( 
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Our Shop</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder product cards */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border rounded-lg p-4 shadow-md">
                <div className="bg-gray-200 h-48 mb-4 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">Product {item}</h2>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold">${(item * 10).toFixed(2)}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add to Cart
                    </button>
                </div>
                </div>
            ))}
            </div>
            
            <div className="mt-12 text-center">
            <p className="text-gray-500">More products coming soon...</p>
            </div>
        </div>
     );
}
 
export default shoppage;