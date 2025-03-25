import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVariables.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
        }

        const decodeToken = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decodeToken) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decodeToken.userId).select("-password");

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" })
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}