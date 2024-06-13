import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx'


const GiveAnswer = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { userData, token } = useAuth(); // Get the user data and token from the AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData || !token) {
            toast.error('You must be logged in to submit an answer.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5555/api/answer`, {
                content,
                question: id,
                author: userData.id, // Use the user ID from the AuthContext
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            toast.success('Answer submitted successfully');
            navigate(`/question/${id}`);
        } catch (error) {
            console.error('Error submitting answer:', error);
            toast.error('Failed to submit answer. Please try again later.');
        }
    };

    return (
        <div className="p-5 my-3 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Give an Answer</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows="6"
                    placeholder="Write your answer here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit Answer
                </button>
            </form>
        </div>
    );
};

export default GiveAnswer;
