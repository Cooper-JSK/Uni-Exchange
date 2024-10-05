import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserAnswers, getUserQuestions } from "../api/apiService.js";
import QuestionCard from '../components/QuestionCard.jsx';
import AnswerCard from '../components/AnswerCard.jsx';
import DashSideBar from "../components/DashSideBar.jsx";

const Dashboard = () => {
    const { userData } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [view, setView] = useState('questions');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const questionsRes = await getUserQuestions(userData.id)
                const answersRes = await getUserAnswers(userData.id)
                setQuestions(questionsRes.data);
                setAnswers(answersRes.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [userData]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Questions Asked</h2>
                    <p className="text-2xl">{questions.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Answers Given</h2>
                    <p className="text-2xl">{answers.length}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <DashSideBar setView={setView} />
                <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                    {view === 'questions' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Your Questions</h2>
                            {questions.map((question) => (
                                <QuestionCard
                                    key={question._id}
                                    id={question._id}
                                    title={question.title}
                                    content={question.content}
                                    author={userData.username}
                                    authorId={userData.id}
                                    createdAt={question.createdAt}
                                    category={question.category}
                                    profile={userData.profileImage}
                                />
                            ))}
                        </div>
                    )}
                    {view === 'answers' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
                            {answers.map((answer) => (
                                <AnswerCard
                                    key={answer._id}
                                    id={answer._id}
                                    answer={{
                                        ...answer,
                                        author: {
                                            _id: userData.id,           // Use the logged-in user's ID
                                            username: userData.username, // Use the logged-in user's username
                                            profileImage: userData.profileImage // Use the logged-in user's profile image
                                        }
                                    }}
                                    onVote={null} // You don't need the voting functionality here
                                    isOwnAnswer={true} // Passing true to hide voting buttons
                                />
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
