import Question from '../models/questionModel.js';
import Answer from '../models/answerModel.js'; // Assuming you have an Answer model

// Create a new question
export const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('author', '_id username profileImage');
        if (!questions) {
            return res.status(404).json({ message: 'No questions at the moment' });
        }
        res.status(200).json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate('author', '_id username profileImage');
        const answers = await Answer.find({ question: id }).populate('author', ' _id username profileImage');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });

        }

        res.status(200).json({ question, answers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a question by id
export const updateQuestionById = async (req, res) => {
    try {
        const updateQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateQuestion) {
            return res.status(404).json({ message: 'Question is not found' });
        }
        res.status(200).json(updateQuestion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a question by id
export const deleteQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete related answers first
        await Answer.deleteMany({ question: id });

        // Then delete the question
        await Question.findByIdAndDelete(id);

        res.status(200).json({ message: 'Question and related answers deleted successfully' });
    } catch (error) {
        console.error('Error deleting question and related answers:', error);
        res.status(500).json({ message: 'Failed to delete question and related answers' });
    }
};


// Get all unique categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Question.distinct('category');
        // Flatten the categories array and remove duplicates
        const uniqueCategories = [...new Set(categories.flatMap(cat => cat.split(',').map(c => c.trim())))];
        res.json(uniqueCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get questions by category
export const getQuestionsByCategory = async (req, res) => {
    try {
        const questions = await Question.find({ categories: req.params.category });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCount = async (req, res) => {
    try {
        const count = await Question.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}