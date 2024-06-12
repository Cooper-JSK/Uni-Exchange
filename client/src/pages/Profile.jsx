import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {userData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <div className="flex flex-col items-center">
                        <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2">{userData.username}</h2>
                        <p className="text-gray-600 mb-4">{userData.email}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
