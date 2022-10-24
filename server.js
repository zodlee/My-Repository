import express from "express"; 
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import Path from "path"
import { errorHandler } from "./middlewares/error-handler.js";

import connectDB from "./config/db.js"
import user_router from "./routes/userRoutes.js";
import work_router from "./routes/working_hours_route.js"


dotenv.config({path: "./config/config.env"});
connectDB.call()
const app = express()


app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/user", user_router)
app.use("/api/user", work_router)

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)




