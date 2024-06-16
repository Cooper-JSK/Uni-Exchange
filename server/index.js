import express from "express"
import { PORT, mongoDB } from "./config.js"
import mongoose from "mongoose"
import userRoute from './routes/userRoute.js'
import questionRoute from './routes/questionRoute.js'
import answerRoute from './routes/answerRoute.js'
import authRoute from './routes/authRoute.js'
import searchRoute from './routes/searchRoute.js'
import cors from 'cors'

// middlewares
const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))


//route
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute);
app.use('/api/questions', questionRoute)
app.use('/api/answer', answerRoute);
app.use('/api/search', searchRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB)
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err.message);

    }
};

connectDB();

//global error handler
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})
