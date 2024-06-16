import User from '../models/userModel.js';
import Question from '../models/questionModel.js';
import Answer from '../models/answerModel.js';
import bcryptjs from 'bcryptjs'
import generateAvatarUrl from '../utils/avatarGenerator.js';

// Create a new user
export const createUser = async (req, res) => {
    const { username, email, password, profileImage } = req.body;
    try {
        // Validation of the request
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Username, email, and password are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).send({ message: 'Email or Username already exists.' });
        }

        // Create a new user
        const user = new User({ username, email, password, profileImage });
        await user.save();
        return res.status(201).send({ message: 'User created successfully.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
export const updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const { username, currentPassword, newPassword } = req.body;

    if (req.user.id != req.params.id) {
        return next(errorHandler(401, "You can only update your profile"))
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password if new password is provided
        if (newPassword) {
            const isMatch = bcryptjs.compareSync(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            const salt = bcryptjs.hashSync(newPassword, 10)
            user.password = salt
        }

        // Update username if provided
        if (username) {
            user.username = username;
            const profileImage = generateAvatarUrl(username);
            user.profileImage = profileImage;
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    const { deleteContent } = req.body; // This flag determines whether to delete questions and answers

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (deleteContent) {
            // Delete the user's questions and answers
            await Question.deleteMany({ author: userId });
            await Answer.deleteMany({ author: userId });
        } else {
            // Optionally, you could update the author field to 'Deleted User' or similar instead of deleting
            await Question.updateMany({ author: userId }, { author: null });
            await Answer.updateMany({ author: userId }, { author: null });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User and content deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user questions
export const getUserQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ author: req.params.id });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get user answers
export const getUserAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({ author: req.params.id }).populate('question');
        res.json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}