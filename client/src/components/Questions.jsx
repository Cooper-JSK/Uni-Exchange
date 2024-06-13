import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import QuestionCard from './QuestionCard';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
                toast.error('Failed to fetch questions. Please try again later.');
            }
        };
        fetchQuestions();
    }, []);

    return (
        <div className="pt-4">
            {questions.map((question) => (
                <QuestionCard
                    key={question._id}
                    id={question._id}
                    title={question.title}
                    content={question.content}
                    author={question.author.username}
                    authorId={question.author._id}
                    category={question.category}
                    createdAt={question.createdAt}
                    profile={question.author.profileImage}
                />
            ))}
        </div>
    );
};

export default Questions;
