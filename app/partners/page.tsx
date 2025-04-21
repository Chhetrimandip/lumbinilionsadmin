import React from 'react'

const partnerpage = () => {
    return ( 
        <div className="py-12 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Our Partners
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Coming soon! We're currently building our partners page.
                    </p>
                </div>
                
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder partner cards */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center justify-center h-32 bg-gray-200 rounded">
                                    <span className="text-gray-500">Partner Logo</span>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Partner {item}</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Description for partner {item} will be added here.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default partnerpage;