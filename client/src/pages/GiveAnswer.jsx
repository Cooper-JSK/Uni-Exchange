import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitAnswer } from "../api/apiService.js";
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import SidebarLeft from '../components/SidebarLeft.jsx';
import SidebarStats from '../components/SidebarStats.jsx';
import TipTap from '../components/TipTap.jsx';  // Import TipTap editor

const GiveAnswer = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');  // Store rich text content here
    const navigate = useNavigate();
    const { userData, token } = useAuth(); // Get the user data and token from the AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData || !token) {
            toast.error('You must be logged in to submit an answer.');
            return;
        }

        // Ensure content is not empty
        if (!content.trim()) {
            toast.error('Answer content cannot be empty.');
            return;
        }

        const answerData = {
            content,
            question: id,
            author: userData.id, // Use the user ID from the AuthContext
        };

        try {
            await submitAnswer(answerData, token); // Use the service function to submit the answer

            toast.success('Answer submitted successfully');
            navigate(`/question/${id}`);
        } catch (error) {
            console.error('Error submitting answer:', error);
            toast.error('Failed to submit answer. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7xl p-5">
                <div className="w-1/5 hidden md:block">
                    <SidebarLeft />
                </div>
                <div className="w-full md:w-3/5 mx-4">
                    <div className="p-5 my-3 border rounded shadow-md bg-white">
                        <h2 className="text-2xl font-bold mb-4">Give an Answer</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <TipTap content={content} setContent={setContent} />  {/* Use TipTap editor */}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Submit Answer
                            </button>
                        </form>
                    </div>
                </div>
                <div className="w-1/5 hidden md:block">
                    <SidebarStats />
                </div>
            </div>
        </div>
    );
};

export default GiveAnswer;
