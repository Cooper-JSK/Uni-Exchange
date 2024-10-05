// src/pages/AskQuestion.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postQuestion } from '../api/apiService';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import TipTap from '../components/TipTap.jsx';  // Import the new editor

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');  // Store the rich text content here
    const [categories, setCategories] = useState('');
    const navigate = useNavigate();
    const { userData, token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure title and content are not empty
        if (!title.trim() || !content.trim()) {
            toast.error('Title and content cannot be empty.');
            return;
        }

        const authorId = userData.id;
        const categoriesArray = categories.split(',').map(cat => cat.trim());
        const questionData = { title, content, categories: categoriesArray, author: authorId, token };

        try {
            const response = await postQuestion(questionData);
            toast.success('Question submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit the question.');
        }
    };

    return (
        <div className="flex justify-center p-4">
            <div className="flex flex-col w-full max-w-7xl">
                <div className="w-full mx-0 md:mx-4">
                    <div className="p-5 my-3 border rounded shadow-md bg-white">
                        <h1 className="text-2xl font-bold mb-6 text-left">Ask a Question</h1>  {/* Left-aligned title */}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    placeholder="Enter the title of your question"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <TipTap content={content} setContent={setContent} />  {/* Render the editor */}
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
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full md:w-auto"
                            >
                                Submit Question
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;
