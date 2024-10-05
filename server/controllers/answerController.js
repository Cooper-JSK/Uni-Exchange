import Answer from '../models/answerModel.js';
import { errorHandler } from '../utils/errorHandler.js';

// Create a new answer
export const createAnswer = async (req, res) => {
    try {
        // Check if the user ID from the token matches the ID in the request body
        if (req.body.author !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: User ID does not match.' });
        }

        const { content, question, author } = req.body;

        const newAnswer = new Answer({
            content,
            author,
            question // Ensure the author is set to the user ID from the token
        });

        const savedAnswer = await newAnswer.save();
        res.status(201).json(savedAnswer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


// Get all answers
export const getAllAnswers = async (req, res) => {
    try {
        const answers = await Answer.find();
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an answer by ID
export const getAnswerById = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all answers for a specific question
export const getAnswersByQuestionId = async (req, res) => {
    try {
        const answers = await Answer.find({ question: req.params.questionId });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an answer by ID
export const updateAnswerById = async (req, res) => {
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedAnswer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.status(200).json(updatedAnswer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an answer by ID
export const deleteAnswerById = async (req, res) => {
    try {
        const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
        if (!deletedAnswer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCount = async (req, res) => {
    try {
        const count = await Answer.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const upVoteAnswer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const answer = await Answer.findById(id);

        if (!answer) {
            return next(errorHandler(404, 'Answer not found.'));
        }

        let voteChanged = false;

        if (answer.downvotes.includes(userId)) {
            // Remove the user from downvotes
            answer.downvotes = answer.downvotes.filter(vote => vote.toString() !== userId.toString());
            voteChanged = true;
        }

        if (!answer.upvotes.includes(userId)) {
            answer.upvotes.push(userId);
            if (voteChanged) {
                answer.votes = Math.max(0, answer.votes + 2); // Added upvote (+1) after removing downvote (-1)
            } else {
                answer.votes = Math.max(0, answer.votes + 1); // Only add upvote (+1)
            }
        } else {
            return next(errorHandler(400, 'You have already upvoted this answer.'));
        }

        await answer.save();
        res.status(200).json({ message: 'Successfully upvoted the answer.', answer });
    } catch (error) {
        next(error);
    }
};



export const downVoteAnswer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const answer = await Answer.findById(id);

        if (!answer) {
            return next(errorHandler(404, 'Answer not found.'));
        }

        let voteChanged = false;

        if (answer.upvotes.includes(userId)) {
            // Remove the user from upvotes
            answer.upvotes = answer.upvotes.filter(vote => vote.toString() !== userId.toString());
            voteChanged = true;
        }

        if (!answer.downvotes.includes(userId)) {
            answer.downvotes.push(userId);
            if (voteChanged) {
                // If the user had an upvote before
                // Prevent the votes from going negative
                answer.votes = Math.max(0, answer.votes - 2); // Remove upvote (+1) and add downvote (-1)
            } else {
                answer.votes = Math.max(0, answer.votes - 1); // Only add downvote (-1)
            }
        } else {
            return next(errorHandler(400, 'You have already downvoted this answer.'));
        }

        await answer.save();
        res.status(200).json({ message: 'Successfully downvoted the answer.', answer });
    } catch (error) {
        next(error);
    }
};
