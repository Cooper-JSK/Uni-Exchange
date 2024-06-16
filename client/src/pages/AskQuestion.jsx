import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QAForm from '../components/Form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const AskQuestion = () => {
    const navigate = useNavigate();
    const { userData, token } = useAuth();

    const handleSubmit = async (formData) => {
        const authorId = userData.id;
        const categories = formData.categories ? formData.categories.split(',').map(cat => cat.trim()) : [];
        const questionData = { ...formData, author: authorId, categories, token };

        try {
            const response = await axios.post('http://localhost:5555/api/questions', questionData);
            console.log(response.data);
            toast.success('Question submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit the question.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
            <QAForm onSubmit={handleSubmit} formType="question" />
        </div>
    );
};

export default AskQuestion;
