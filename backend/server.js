//const express = require('express'); //Commonjs
import express from "express"; //ESmodules

import authRoutes from "./routes/auth.route.js"
import { ENV_VARS } from "./config/envVariables.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT

app.use("/api/v1/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`My server is alive at http://localhost:${PORT}`)
    connectDB();
})