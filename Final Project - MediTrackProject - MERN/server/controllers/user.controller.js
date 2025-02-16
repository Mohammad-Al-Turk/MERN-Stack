const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY
    );
}

module.exports = {
    // Register user (registration)
    register: async (request, response) => {
        const { email } = request.body; // Extract email from request body

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        User.create(request.body)
        .then((user) => {
            response.status(200).json(user);
        })
        .catch((error) => {
            response.status(400).json({ message: error.message });
        })
    },

    login: async (request, response) => {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return response.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        response
            .cookie('usertoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only set secure in production
                sameSite: 'strict'
            })
            .status(200)
            .json({ message: 'Login successful', user, token });
    },
    // Logout user
    logout: async (request, response) => {
        response.clearCookie('usertoken');
        response.sendStatus(200);
    },

    // Get all users (modified to handle role filtering)
    getAllUsers: async (request, response) => {
        const users = await User.find();
        response.status(200).json({ users });
    },

    // Function to retrieve all users with role 'patient'
    getAllPatients: async (request, response) => {
        const patients = await User.find({ role: 'patient' });
        response.status(200).json({ patients });
    },

    // Get user by ID
    getUserById: async (request, response) => {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        response.status(200).json({ user });
    },

    // Update user by ID
    updateUserById: async (request, response) => {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        response.status(200).json({ message: 'User updated successfully', user });
    },

    // Delete user by ID
    deleteUserById: async (request, response) => {
        const user = await User.findByIdAndDelete(request.params.id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        response.status(200).json({ message: 'User deleted successfully' });
    }
};