
import { Link } from 'react-router-dom';

const SearchCard = ({ title, content, tags, author, isAnswer, questionTitle }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-2xl">
            {isAnswer && <h4 className="text-sm text-gray-500">Answer to: {questionTitle}</h4>}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-2">{content}</p>
            {tags && (
                <div className="flex flex-wrap mb-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="text-sm text-gray-500">By: <Link to={`/user/${author._id}`} className="text-blue-600">{author.username}</Link></div>
        </div>
    );
};

export default SearchCard;
