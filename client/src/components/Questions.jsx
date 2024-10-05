import { useState, useEffect } from 'react';
import {fetchQuestions} from "@/api/apiService.js";
import toast from 'react-hot-toast';
import QuestionCard from './QuestionCard';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const questionsData = await fetchQuestions(); // Call the service function
                setQuestions(questionsData);
            } catch (error) {
                console.error('Error fetching questions:', error);
                toast.error('Failed to fetch questions. Please try again later.');
            }
        };
        getQuestions();
    }, []);

    return (
        <div className="pt-4">
            {questions.map((question) => (
                <QuestionCard
                    key={question._id}
                    id={question._id}
                    title={question.title}
                    content={question.content}
                    author={question.author ? question.author.username : 'Deleted User'} // Handle deleted author gracefully
                    authorId={question.author ? question.author._id : null} // Assuming you need authorId even if author is null
                    category={question.category}
                    createdAt={question.createdAt}
                    profile={question.author ? question.author.profileImage : null} // Assuming profileImage is optional
                />
            ))}
        </div>
    );
};

export default Questions;
