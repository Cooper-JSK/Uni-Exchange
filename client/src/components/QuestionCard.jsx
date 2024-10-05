import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import RenderJSON from "./RenderJSON.jsx";

const QuestionCard = ({
    id,
    title = 'Default Title',
    content = 'Default Content',
    author = 'Default Author',
    authorId = '',
    createdAt = 'Default Date',
    category = [],
    profile = ''
}) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-2xl">
            <div className="flex items-center mb-4">
                {authorId &&
                    (<Link to={`/user/${authorId}`}>
                        <img
                            src={profile}
                            alt="User Profile"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                    </Link>)}
                <div>
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="mb-4">
                <Link to={`/question/${id}`} className="text-2xl font-bold text-blue-500 hover:underline">
                    {title}
                </Link>
            </div>
            <div className="mb-4">
                <div className="text-gray-700"><RenderJSON content={content}/></div>
            </div>
            <div className="mt-auto flex justify-between">
                <div className="flex flex-wrap">
                    {category.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
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
    category: PropTypes.arrayOf(PropTypes.string), // Updated to accept an array of strings
    profile: PropTypes.string
};

export default QuestionCard;
