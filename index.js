import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import videoRoutes from "./routes/video.js"
import authRoutes from "./routes/auth.js"
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser"
const app =express()
dotenv.config()

const connect=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connnected to database");
    }).catch((err)=>{
        throw err;
    })
};
app.use(cookieParser())
app.use(express.json())

app.use("/api/user",userRoutes)
app.use("/api/comment",commentRoutes)
app.use("/api/video",videoRoutes)
app.use("/api/auth",authRoutes)


app.use((err,req,res,next)=>{
    const status=err.status||500;
    const message=err.message|| "Something went wrong!";
    return res.status(status).json({
    success:false,
    status,
    message,
    })
})

app.listen(8000,()=>{
    connect()
    console.log("Server running on port 8000");
})