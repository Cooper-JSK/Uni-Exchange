import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const { userData, token, updateUserData } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState(userData.username);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmNewPassword) {
            toast.error("New passwords don't match.");
            return;
        }

        const updateData = { username, currentPassword, newPassword };

        try {
            await axios.patch(
                `http://localhost:5555/api/user/${id}`,
                updateData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const newProfileImage = `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`
            const updatedUser = { ...userData, username: username, profileImage: newProfileImage };
            updateUserData(updatedUser);


            toast.success('Profile updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again later.');
        }
    };

    return (
        <div className="bg-white my-2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Current Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
