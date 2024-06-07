// controllers/authController.js
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler.js';
import generateUsername from '../utils/usernameGenerator.js';

// Register a new user
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'User already exists'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const username = await generateUsername(name);

        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();

        // Generate token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage
            }
        });

    } catch (error) {
        next(error);
    }
};


export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(400, 'Invalid credentials'));
        }

        //check password
        const isValidPass = bcryptjs.compareSync(password, user.password);
        if (!isValidPass) {
            return next(errorHandler(400, 'Invalid credentials'));
        }

        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        next(error)

    }

}