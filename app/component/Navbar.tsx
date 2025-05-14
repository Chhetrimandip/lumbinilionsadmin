import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

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
                    
                    <div className='flex items-center'>
                        <button 
                            onClick={handleLogout}
                            className='text-gray-200 hover:text-white font-medium px-3 py-2 rounded-md transition duration-300 bg-red-600 hover:bg-red-700 hidden md:block'
                        >
                            Logout
                        </button>                        {/* Mobile menu button */}
                        <div className='md:hidden flex items-center'>
                            <button 
                                onClick={toggleMobileMenu} 
                                className='mobile-menu-button text-gray-200 hover:text-white'
                            >
                                <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>            {/* Mobile menu */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
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
                    <button 
                        onClick={handleLogout}
                        className='block w-full text-left text-gray-200 hover:text-white font-medium px-3 py-2 rounded-md transition duration-300 bg-red-600 hover:bg-red-700'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;