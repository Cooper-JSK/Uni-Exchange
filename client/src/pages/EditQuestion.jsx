import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionById, updateQuestion } from "@/api/apiService.js";
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import SidebarLeft from '@/components/SidebarLeft.jsx';
import SidebarStats from '@/components/SidebarStats.jsx';
import TipTap from '@/components/TipTap.jsx';  // Import the TipTap editor

const EditQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState('');
    const [questionData, setQuestionData] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const question = await getQuestionById(id, token); // Use service function to get question
                setQuestionData(question);
                setTitle(question.title);
                setContent(question.content);
                setCategories(question.category.join(', ')); // Convert categories to string
            } catch (error) {
                console.error('Error fetching question:', error);
                toast.error('Failed to load question.');
            }
        };

        fetchQuestion();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoriesArray = categories.split(',').map(cat => cat.trim());
        const updatedData = { title, content, categories: categoriesArray };

        try {
            await updateQuestion(id, updatedData, token); // Use service function to update question
            toast.success('Question updated successfully!');
            navigate('/'); // Navigate to home or any other page
        } catch (error) {
            console.error('Error updating question:', error);
            toast.error('Failed to update question.');
        }
    };

    if (!questionData) {
        return <div>Loading...</div>; // Show loading while fetching the question data
    }

    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7xl p-5">
                <div className="w-1/5 hidden md:block">
                    <SidebarLeft />
                </div>
                <div className="w-full md:w-3/5 mx-4">
                    <h1 className="text-2xl font-bold mb-4 text-left">Edit Question</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-2 border rounded-md w-full"
                                placeholder="Enter the title of your question"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <TipTap content={content} setContent={setContent} />  {/* Use TipTap editor for content */}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
                            <input
                                type="text"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                className="mt-1 p-2 border rounded-md w-full"
                                placeholder="e.g., JavaScript, React"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Update Question
                        </button>
                    </form>
                </div>
                <div className="w-1/5 hidden md:block">
                    <SidebarStats />
                </div>
            </div>
        </div>
    );
};

export default EditQuestion;
