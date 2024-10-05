import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUserProfile} from "@/api/apiService.js";
import toast from 'react-hot-toast';
import UpdateProfile from '@/components/UpdateProfile.jsx';
import ManageContent from '@/components/ManageContent.jsx';

const Settings = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [deleteContent, setDeleteContent] = useState(false);

    const handleDeleteProfile = async () => {
        try {
            await deleteUserProfile(id, deleteContent, token); // Use the service function
            toast.success('Profile deleted successfully');
            logout();
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile:', error);
            toast.error('Failed to delete profile. Please try again later.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>

            <UpdateProfile />

            <ManageContent />

            <div className="bg-white my-2 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Delete Profile</h2>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={deleteContent}
                            onChange={(e) => setDeleteContent(e.target.checked)}
                        />
                        <span className="ml-2">Delete my questions and answers</span>
                    </label>
                </div>
                <button
                    onClick={handleDeleteProfile}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default Settings;
