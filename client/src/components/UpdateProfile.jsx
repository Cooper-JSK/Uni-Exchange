import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProfile } from "../api/apiService.js";
import { RiEyeLine, RiEyeCloseFill } from "react-icons/ri";

const UpdateProfile = () => {
    const { userData, token, updateUserData } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [username, setUsername] = useState(userData.username);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // State variables to handle password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmNewPassword) {
            toast.error("New passwords don't match.");
            return;
        }

        const updateData = { username, currentPassword, newPassword };

        try {
            // Use the service function for the API request
            await updateProfile(id, updateData, token);

            // Update the profile image based on the new username
            const newProfileImage = `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`;
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
                <div className="mb-4 relative"> {/* Position relative for the icon */}
                    <label className="block mb-2 text-gray-700">Current Password</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="w-full p-2 border rounded pr-10" // Add padding to right for icon
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 cursor-pointer" // Position the icon
                    >
                        {showCurrentPassword ? <RiEyeLine /> : <RiEyeCloseFill />}
                    </span>
                </div>
                <div className="mb-4 relative">
                    <label className="block mb-2 text-gray-700">New Password</label>
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="w-full p-2 border rounded pr-10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 cursor-pointer"
                    >
                        {showNewPassword ? <RiEyeLine /> : <RiEyeCloseFill />}
                    </span>
                </div>
                <div className="mb-4 relative">
                    <label className="block mb-2 text-gray-700">Confirm New Password</label>
                    <input
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        className="w-full p-2 border rounded pr-10"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-3 top-3 cursor-pointer"
                    >
                        {showConfirmNewPassword ? <RiEyeLine /> : <RiEyeCloseFill />}
                    </span>
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
