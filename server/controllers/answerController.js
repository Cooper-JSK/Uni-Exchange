import Answer from '../models/answerModel.js';

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


export const upVoteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });

        // Check if user already upvoted
        if (answer.upvotes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already upvoted this answer' });
        }

        // Remove downvote if it exists
        answer.downvotes = answer.downvotes.filter(userId => !userId.equals(req.user._id));
        // Add upvote
        answer.upvotes.push(req.user._id);
        answer.votes += 1;

        await answer.save();
        res.status(200).json({ message: 'Answer upvoted successfully', answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const downVoteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });

        // Check if user already downvoted
        if (answer.downvotes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already downvoted this answer' });
        }

        // Remove upvote if it exists
        answer.upvotes = answer.upvotes.filter(userId => !userId.equals(req.user._id));
        // Add downvote
        answer.downvotes.push(req.user._id);
        answer.votes -= 1;

        await answer.save();
        res.status(200).json({ message: 'Answer downvoted successfully', answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}