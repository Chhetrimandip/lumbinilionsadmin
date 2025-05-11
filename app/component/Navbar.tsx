import Link from 'next/link';
import React from 'react'

const Navbar = () => {
    return ( 
        <nav className='fixed top-0 left-0 right-0 bg-gray-800 shadow-md z-50'>
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center space-x-8'>
                        <Link href="/" className='text-white font-bold text-lg hover:text-blue-300 transition duration-300'>
                            Lumbini Lions
                        </Link>
                        <div className='hidden md:flex space-x-6'>
                            <Link href="/" className='text-gray-200 hover:text-white font-medium transition duration-300 hover:scale-105'>
                                Home
                            </Link>
                            <Link href="/blogs" className='text-gray-200 hover:text-white font-medium transition duration-300 hover:scale-105'>
                                Blogs
                            </Link>
                            <Link href="/fandata" className='text-gray-200 hover:text-white font-medium transition duration-300 hover:scale-105'>
                                Fan Zone
                            </Link>
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className='md:hidden flex items-center'>
                        <button className='mobile-menu-button text-gray-200 hover:text-white'>
                            <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu */}
            <div className='md:hidden hidden mobile-menu'>
                <div className='px-2 pt-2 pb-4 space-y-1 bg-gray-800'>
                    <Link href="/" className='block text-gray-200 hover:text-white font-medium px-3 py-2 rounded-md transition duration-300'>
                        Home
                    </Link>
                    <Link href="/blogs" className='block text-gray-200 hover:text-white font-medium px-3 py-2 rounded-md transition duration-300'>
                        Blogs
                    </Link>
                    <Link href="/fandata" className='block text-gray-200 hover:text-white font-medium px-3 py-2 rounded-md transition duration-300'>
                        Fan Zone
                    </Link>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;