// utils/usernameGenerator.js
import User from '../models/userModel.js';

const generateUsername = async (name) => {
    // Basic transformation to create a base username
    let username = name.trim().toLowerCase().replace(/\s+/g, '.');

    // Check if the username already exists
    let user = await User.findOne({ username });
    let suffix = 1;

    // If username exists, add a number suffix and check again
    while (user) {
        username = `${name.trim().toLowerCase().replace(/\s+/g, '.')}.${suffix}`;
        user = await User.findOne({ username });
        suffix++;
    }

    return username;
};

export default generateUsername;
