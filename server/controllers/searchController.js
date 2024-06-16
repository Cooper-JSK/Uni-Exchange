import Question from '../models/questionModel.js';
import Answer from '../models/answerModel.js';

export const search = async (req, res) => {
    try {
        const { query } = req.query;

        const questions = await Question.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { content: new RegExp(query, 'i') },
                { category: new RegExp(query, 'i') }
            ]
        }).populate('author', '_id username profileImage');

        const answers = await Answer.find({
            content: new RegExp(query, 'i')
        }).populate('author', '_id username profileImage')
            .populate('question', 'title');

        res.json({ questions, answers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
