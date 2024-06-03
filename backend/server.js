import express from 'express';
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import CreateError from './utils/error.js';
import AuthRouter from './routes/authRoute.js';
import UserRouter from './routes/userRoute.js';
import ChatRouter from './routes/chatRoute.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
    process.exit(1);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api/auth",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api/chat",ChatRouter);


app.use((err, req, res, next) => {
    if (err instanceof CreateError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        next(err);
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on address http://localhost:${process.env.PORT}`);
})