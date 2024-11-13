import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database by email
        const exisitingUser = await User.findOne({ email });

        if (!exisitingUser) {
            // It's better to have a generic error message
            throw new Error("Invalid credentials");
        }

        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, exisitingUser.password);
        if (!isValidPassword) {
            // A generic error message for security
            throw new Error("Invalid credentials");
        }

        // Generate the JWT access token
        const token = generateToken(exisitingUser);

        // Optionally, generate a refresh token (if you're using refresh tokens)
        const refreshToken = generateRefreshToken(exisitingUser);

        // Set the refresh token in an HTTP-only cookie for security
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiry (7 days)
        });

        // Respond with the access token and user info (excluding password)
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: exisitingUser._id,
                username: exisitingUser.username,
                email: exisitingUser.email,
                role: exisitingUser.role,
            },
        });

    } catch (error) {
        // Log the error for internal debugging
        console.error(error);

        // Send a generic error response for unauthorized access
        return res.status(401).json({ message: "Invalid credentials" });
    }
};
