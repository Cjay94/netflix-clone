import mongoose from "mongoose";
import { ENV_VARS } from "./envVariables.js";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)// 1 === Failed/Error | 0 === Success
    }
}

