import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import SidebarLeft from "../components/SidebarLeft.jsx";
import SidebarStats from "../components/SidebarStats.jsx";

const ViewQuestion = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/questions/${id}`);
                setQuestion(response.data.question);
                setAnswers(response.data.answers);
            } catch (error) {
                console.error('Error fetching question data:', error);
                toast.error('Failed to fetch question data. Please try again later.');
            }
        };

        fetchQuestionData();
    }, [id]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center p-4">
            <div className="flex flex-col md:flex-row w-full max-w-7xl">
                <div className="w-full md:w-1/5 hidden md:block">
                    <SidebarLeft />
                </div>
                <div className="w-full md:w-3/5 mx-0 md:mx-4">
                    <div className="p-5 my-3 border rounded shadow-md bg-white">
                        <div className="flex items-center mb-4">
                            {question.author && (
                                <Link to={`/user/${question.author._id}`}>
                                    <img
                                        src={question.author.profileImage}
                                        alt="User Profile"
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                </Link>
                            )}

                            <div>
                                <p className="text-sm font-semibold">{question.author ? question.author.username : 'Unknown'}</p>
                                <p className="text-xs text-gray-500">{new Date(question.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold">{question.title}</h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700">{question.content}</p>
                        </div>
                        <div className="mt-auto">
                            <p className="text-blue-500 font-semibold">{question.category}</p>
                        </div>
                        <button
                            onClick={() => navigate(`/question/${id}/give-answer`)}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4"
                        >
                            Give Answer
                        </button>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Answers</h3>
                        {answers.map((answer) => (
                            <div key={answer._id} className="p-5 my-3 border rounded shadow-md bg-white">
                                <div className="flex items-center mb-4">
                                    {answer.author && (
                                        <Link to={`/user/${answer.author._id}`}>
                                            <img
                                                src={answer.author.profileImage}
                                                alt="User Profile"
                                                className="w-12 h-12 rounded-full mr-4"
                                            />
                                        </Link>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold">{answer.author ? answer.author.username : 'Unknown'}</p>
                                        <p className="text-xs text-gray-500">{new Date(answer.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700">{answer.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/5 mx-0 md:mx-4 hidden md:block">
                    <SidebarStats />
                </div>
            </div>
        </div>
    );
};

export default ViewQuestion;
