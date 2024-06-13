import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Profile = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // to get the user id from URL
    const [profileData, setProfileData] = useState(null);
    const [recentQuestions, setRecentQuestions] = useState([]);
    const [recentAnswers, setRecentAnswers] = useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/user/${id}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        const fetchRecentQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/user/${id}/questions`);
                setRecentQuestions(response.data);
            } catch (error) {
                console.error('Error fetching recent questions:', error);
            }
        };

        const fetchRecentAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/user/${id}/answers`);
                setRecentAnswers(response.data);
            } catch (error) {
                console.error('Error fetching recent answers:', error);
            }
        };

        fetchProfileData();
        fetchRecentQuestions();
        fetchRecentAnswers();
    }, [id]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
            {profileData ? (
                <>
                    <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={profileData.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mr-6"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{profileData.username}</h2>
                            <p className="text-gray-600">{profileData.email}</p>
                            <p className="text-gray-600">Joined on {new Date(profileData.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="w-2/3 mr-6">
                            <h3 className="text-xl font-semibold mb-4">Recent Questions</h3>
                            {recentQuestions.length > 0 ? (
                                recentQuestions.map((question) => (
                                    <div key={question._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                                        <Link to={`/question/${question._id}`}>
                                            <h4 className="text-lg font-semibold">{question.title}</h4>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No recent questions found.</p>
                            )}
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-xl font-semibold mb-4">Recent Answers</h3>
                            {recentAnswers.length > 0 ? (
                                recentAnswers.map((answer) => (
                                    <div key={answer._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                                        <Link to={`/question/${answer.question}`}>
                                            <p>{answer.content}</p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No recent answers found.</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
