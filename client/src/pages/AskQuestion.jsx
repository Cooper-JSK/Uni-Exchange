import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QAForm from '../components/Form';
import toast from 'react-hot-toast';

const AskQuestion = () => {
    const navigate = useNavigate();
    const handleSubmit = async (formData) => {
        const authorId = '665d800bb7f3cbe1628e6b7a'; // Hardcoded author ID for testing
        const questionData = { ...formData, author: authorId };

        try {
            const response = await axios.post('http://localhost:5555/api/question', questionData);
            console.log(response.data);
            toast.success('Question submitted successfully!');
            navigate('/')
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
