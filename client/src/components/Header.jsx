import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Adjust the path as necessary
import { useState, useEffect, useRef } from 'react';

const Header = () => {
    const { isAuthenticated, userData, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    return (
        <div className='bg-slate-50'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <div className='flex items-center gap-4'>
                    <Link to='/'>
                        <h1 className='font-bold'>UniExchange</h1>
                    </Link>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='border rounded p-2 w-96' // Wider search bar
                    />
                </div>

                <ul className='flex gap-4'>
                    {!isAuthenticated ? (
                        <>
                            <Link to='/sign-in'>
                                <li className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Login</li>
                            </Link>
                            <Link to='/sign-up'>
                                <li className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'>Create Account</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/ask-question'>
                                <li className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Ask Question</li>
                            </Link>
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
                                        style={{ minWidth: '12rem', maxWidth: '18rem' }} // Min and max width
                                    >
                                        <div className='px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <p className='font-semibold overflow-hidden text-ellipsis'>{userData.username}</p>
                                            <p className='text-gray-500 overflow-hidden text-ellipsis'>{userData.email}</p>
                                        </div>
                                        <div className='border-t border-gray-200'></div>
                                        <Link to='/dashboard' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                            Dashboard
                                        </Link>
                                        <Link to='/ask-question' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                            Ask Question
                                        </Link>
                                        <Link to={`/user/${userData.id}`} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                            Settings
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
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
