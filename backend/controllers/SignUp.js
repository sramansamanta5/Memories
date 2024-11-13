import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'



export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation: Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please provide username, email, and password." });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email is already in use." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const createdUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'customer'
        });

        // Save the new user to the database
        const savedUser = await createdUser.save();
        res.status(200).send({ msg: "New user created successfully", user: savedUser });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message });
    }
};
