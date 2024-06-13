import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AnswerCard = ({ content, author, createdAt, profile }) => {
    return (
        <div className="p-5 my-3 border rounded shadow-md bg-white">
            <div className="flex items-center mb-4">
                <Link to={`/user/${author}`}>
                    <img
                        src={profile}
                        alt="User Profile"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                </Link>

                <div>
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

AnswerCard.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
};

export default AnswerCard;
