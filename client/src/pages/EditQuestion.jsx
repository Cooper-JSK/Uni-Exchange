import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QAForm from '../components/Form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import SidebarLeft from '../components/SidebarLeft.jsx';
import SidebarStats from '../components/SidebarStats.jsx';

const EditQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [questionData, setQuestionData] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/questions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const question = response.data.question;
                setQuestionData({
                    ...question,
                    category: question.category.join(', ')
                });
            } catch (error) {
                console.error('Error fetching question:', error);
                toast.error('Failed to load question.');
            }
        };

        fetchQuestion();
    }, [id, token]);

    const handleSubmit = async (formData) => {
        const categories = formData.category ? formData.category.split(',').map(cat => cat.trim()) : [];
        const updatedData = { ...formData, categories, token };

        try {
            await axios.patch(`http://localhost:5555/api/questions/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Question updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating question:', error);
            toast.error('Failed to update question.');
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7xl p-5">
                <div className="w-1/5 hidden md:block">
                    <SidebarLeft />
                </div>
                <div className="w-full md:w-3/5 mx-4">
                    <h1 className="text-2xl font-bold mb-4">Edit Question</h1>
                    {questionData && <QAForm onSubmit={handleSubmit} formType="question" initialData={questionData} />}
                </div>
                <div className="w-1/5 hidden md:block">
                    <SidebarStats />
                </div>
            </div>
        </div>
    );
};

export default EditQuestion;
