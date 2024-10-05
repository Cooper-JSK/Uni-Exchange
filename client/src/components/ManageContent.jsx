import React, { useState, useEffect } from 'react';
import { fetchUserAnswers, fetchUserQuestions, deleteAnswer, deleteQuestion } from "../api/apiService.js";
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useParams, Link } from 'react-router-dom';
import RenderJSON from "./RenderJSON.jsx";

const ManageContent = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                const questionsResponse = await fetchUserQuestions(id, token);
                setQuestions(questionsResponse);

                const answersResponse = await fetchUserAnswers(id, token);
                setAnswers(answersResponse);
            } catch (error) {
                console.error('Error fetching content:', error);
                toast.error('Failed to load content. Please try again later.');
            }
        };

        fetchQuestionsAndAnswers();
    }, [id, token]);

    const handleDeleteQuestion = async (questionId) => {
        try {
            await deleteQuestion(questionId, token);

            // Remove the question and its related answers from the state
            setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== questionId));
            setAnswers(prevAnswers => prevAnswers.filter(answer => answer.question !== questionId));

            toast.success('Question and related answers deleted successfully');
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error('Failed to delete question. Please try again later.');
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        try {
            await deleteAnswer(answerId, token);
            setAnswers(prevAnswers => prevAnswers.filter(answer => answer._id !== answerId));
            toast.success('Answer deleted successfully');
        } catch (error) {
            console.error('Error deleting answer:', error);
            toast.error('Failed to delete answer. Please try again later.');
        }
    };

    return (
        <div className="bg-white my-2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Manage Content</h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Questions</h3>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div key={question._id} className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center">
                            <Link to={`/question/${question._id}`} className="text-blue-500 flex-1">
                                {question.title}
                            </Link>
                            <div className="ml-4 flex-shrink-0">
                                <button
                                    onClick={() => handleDeleteQuestion(question._id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <Link to={`/edit-question/${question._id}`} className="bg-yellow-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-yellow-600">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Answers</h3>
                {answers.length > 0 ? (
                    answers.map((answer) => (
                        <div key={answer._id} className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center">
                            <Link to={`/question/${answer.question}`} className="text-blue-500 flex-1">
                                <RenderJSON content={answer.content} />
                            </Link>
                            <div className="ml-4 flex-shrink-0">
                                <button
                                    onClick={() => handleDeleteAnswer(answer._id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <Link to={`/edit-answer/${answer._id}`} className="bg-yellow-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-yellow-600">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No answers found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageContent;
