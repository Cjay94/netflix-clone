//Package Imports
import express from "express"; //ESmodules
import cookieParser from "cookie-parser";

//Routes Imports
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"

//Config Imports
import { ENV_VARS } from "./config/envVariables.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const PORT = ENV_VARS.PORT


app.use(express.json()); // will alow us to parse req.body
app.use(cookieParser()); // will alow us to parse req.cookies

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);


app.listen(PORT, () => {
    console.log(`My server is alive at http://localhost:${PORT}`)
    connectDB();
})