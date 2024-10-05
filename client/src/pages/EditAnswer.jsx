import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnswerById, updateAnswer } from "@/api/apiService.js";
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext.jsx';
import SidebarLeft from '@/components/SidebarLeft.jsx';
import SidebarStats from '@/components/SidebarStats.jsx';
import TipTap from '@/components/TipTap.jsx';  // Import the TipTap editor

const EditAnswer = () => {
    const { id } = useParams(); // This is the answer ID
    const navigate = useNavigate();
    const { token } = useAuth();
    const [content, setContent] = useState('');
    const [questionId, setQuestionId] = useState(''); // Store the question ID

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                const answerData = await getAnswerById(id, token); // Use service function to get answer
                setContent(answerData.content);
                setQuestionId(answerData.question); // Save the question ID
            } catch (error) {
                console.error('Error fetching answer:', error);
                toast.error('Failed to load answer.');
            }
        };

        fetchAnswer();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateAnswer(id, content, token); // Use service function to update answer
            toast.success('Answer updated successfully');
            navigate(`/question/${questionId}`); // Navigate to the related question page
        } catch (error) {
            console.error('Error updating answer:', error);
            toast.error('Failed to update answer. Please try again later.');
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
                        <h2 className="text-2xl font-bold mb-4 text-left">Edit Answer</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Use TipTap editor for content */}
                            <TipTap content={content} setContent={setContent} required />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                            >
                                Update Answer
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

export default EditAnswer;
