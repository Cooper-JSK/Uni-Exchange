import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const QuestionDetailCard = ({ id, title, content, author, createdAt, profile, category }) => {
    const navigate = useNavigate();

    const handleGiveAnswer = () => {
        navigate(`/question/${id}/give-answer`);
    };

    return (
        <div className="p-5 my-3 border rounded shadow-md bg-white">
            <div className="flex items-center mb-4">
                <img
                    src={profile}
                    alt="User Profile"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 mb-4">{content}</p>
            <p className="text-gray-500 text-sm">Category: {category}</p>
            <button
                onClick={handleGiveAnswer}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Give Answer
            </button>
        </div>
    );
};

QuestionDetailCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default QuestionDetailCard;
