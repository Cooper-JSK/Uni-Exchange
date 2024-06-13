import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, {
    timestamps: true,
})

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;