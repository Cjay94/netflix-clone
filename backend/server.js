//const express = require('express'); //Commonjs
import express from 'express'; //ESmodules

import authRoutes from "./routes/auth.route.js"

const app = express();

app.use("/api/v1/auth", authRoutes);


app.listen(5000, () => {
    console.log('My server is alive at http://localhost:5000')
})