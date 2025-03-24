import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

//Sign Up
export async function signup(req, res) {
    try {

        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        //check for existing users
        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const existingUserByUserName = await User.findOne({ username: username })

        if (existingUserByUserName) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }

        //password hashing | encrypting password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const userImage = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        //create new user in DB 
        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            image: userImage
        })

        //save to DB
        await newUser.save()

        //remove password from the response
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            }
        })

    } catch (error) {
        console.log("Error in sign up controller", error.message)
        res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

//Log In 
export async function login(req, res) {
    res.send("Login Route");
}

//Log Out 
export async function logout(req, res) {
    res.send("Logout Route");
}