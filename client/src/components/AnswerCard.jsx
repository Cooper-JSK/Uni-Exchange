import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { upvoteAnswer, downvoteAnswer } from "@/api/apiService.js";
import { toast } from 'react-hot-toast';
import RenderJSON from "./RenderJSON.jsx";

const AnswerCard = ({ answer, onVote, isOwnAnswer }) => {
    const { userData, token } = useAuth();

    const handleUpvote = async () => {
        try {
            const res = await upvoteAnswer(answer._id, token);
            toast.success(res.message || 'Upvoted successfully!'); // Ensure it's a string
            onVote();
        } catch (error) {
            // Check if the error is an object and extract a message
            const errorMessage = error?.response?.data?.message || error.message || 'Failed to upvote. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleDownvote = async () => {
        try {
            const res = await downvoteAnswer(answer._id, token);
            toast.success(res.message || 'Downvoted successfully!'); // Ensure it's a string
            onVote();
        } catch (error) {
            // Check if the error is an object and extract a message
            const errorMessage = error?.response?.data?.message || error.message || 'Failed to downvote. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="p-4 my-3 border rounded shadow-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={`/user/${answer.author._id}`}>
                        <img
                            src={answer.author.profileImage}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full mr-2"
                        />
                    </Link>
                    <div>
                        <p className="text-sm font-semibold">{answer.author.username}</p>
                        <p className="text-xs text-gray-500">{new Date(answer.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold">Votes</p>
                    <p className="text-lg font-bold">{answer.votes}</p>
                </div>
            </div>
            <div className="text-gray-700 mb-4"><RenderJSON content={answer.content}/></div>

            {/* Conditionally render voting buttons if it's not the user's own answer */}
            {!isOwnAnswer && (
                <div className="flex justify-end items-center">
                    <button onClick={handleUpvote} disabled={!userData} className="flex items-center mr-2 text-green-500">
                        ⬆️ {answer.upvotes.length}
                    </button>
                    <button onClick={handleDownvote} disabled={!userData} className="flex items-center text-red-500">
                        ⬇️ {answer.downvotes.length}
                    </button>
                </div>
            )}
        </div>
    );
};

AnswerCard.propTypes = {
    answer: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            profileImage: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        upvotes: PropTypes.array.isRequired,
        downvotes: PropTypes.array.isRequired,
        votes: PropTypes.number.isRequired,
    }).isRequired,
    onVote: PropTypes.func, // This can be optional
    isOwnAnswer: PropTypes.bool, // New prop for conditional rendering
};

export default AnswerCard;
