import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import QuestionCard from "./QuestionCard.jsx"


const Questions = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/question')
                setQuestions(response.data);

            } catch (error) {
                console.error('Error fetching questions:', error);
                toast.error('Failed to fetch questions. Please try again later.');
            }
        }
        fetchQuestions();
    }, [])

    return (
        <div className="pt-4">
            {questions.map((question) => (
                <QuestionCard
                    key={question._id}
                    title={question.title}
                    content={question.content}
                    author={question.author.name}
                    category={question.category}
                />
            ))}
        </div>
    )
}

export default Questions