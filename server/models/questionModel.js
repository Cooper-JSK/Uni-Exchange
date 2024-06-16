import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true,
})


questionSchema.pre('remove', async function (next) {
    try {
        await mongoose.model('Answer').deleteMany({ question: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;