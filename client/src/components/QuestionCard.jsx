import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({
    id,
    title = 'Default Title',
    content = 'Default Content',
    author = 'Default Author',
    authorId = '',
    createdAt = 'Default Date',
    category = 'Default Category',
    profile = ''
}) => {
    return (
        <div className="p-5 my-3 border rounded shadow-md bg-white flex flex-col">
            <div className="flex items-center mb-4">
                <Link to={`/user/${authorId}`}>
                    <img
                        src={profile}
                        alt="User Profile"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                </Link>

                <div>
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-xs text-gray-500">{createdAt}</p>
                </div>
            </div>
            <div className="mb-4">
                <Link to={`/question/${id}`} className="text-2xl font-bold text-blue-500 hover:underline">
                    {title}
                </Link>
            </div>
            <div className="mb-4">
                <p className="text-gray-700">{content}</p>
            </div>
            <div className="mt-auto flex justify-between">
                <p className="text-blue-500 font-semibold">{category}</p>
                <Link
                    to={`/question/${id}`}
                    className="font-bold text-blue-500 hover:underline"
                >
                    View Question
                </Link>
            </div>

        </div>
    );
};

QuestionCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.string,
    profile: PropTypes.string
};

export default QuestionCard;
