import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
    const { isAuthenticated, userData, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div className='bg-slate-50'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <div className='flex items-center gap-4'>
                    <Link to='/'>
                        <img src={logo} alt='UniExchange Logo' className='h-10 w-auto' />
                    </Link>
                </div>

                <div className='flex-1 mx-2'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='border rounded p-2 w-full'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                <div className='flex items-center'>
                    {!isAuthenticated ? (
                        <>
                            <Link to='/sign-in' className='ml-2'>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'>
                                    Sign In
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className='relative' ref={dropdownRef}>
                            <img
                                src={userData.profileImage}
                                alt='User Profile'
                                className='w-10 h-10 rounded-full cursor-pointer'
                                onClick={toggleDropdown}
                            />
                            {isDropdownOpen && (
                                <div
                                    className='absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2'
                                    style={{ minWidth: '12rem', maxWidth: '18rem' }}
                                >
                                    <div className='px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                                        <Link to={`/user/${userData.id}`}>
                                            <p className='font-semibold overflow-hidden text-ellipsis'>{userData.username}</p>
                                            <p className='text-gray-500 overflow-hidden text-ellipsis'>{userData.email}</p>
                                        </Link>
                                    </div>
                                    <div className='border-t border-gray-200'></div>
                                    <Link to='/dashboard' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                        Dashboard
                                    </Link>
                                    <Link to='/ask-question' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                        Ask Question
                                    </Link>
                                    <Link to={`/settings/${userData.id}`} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                        Settings
                                    </Link>
                                    <Link to='/feature-request' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                        Feature Request
                                    </Link>
                                    <div className='border-t border-gray-200'></div>
                                    <button
                                        onClick={logout}
                                        className='w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
