import express from "express";
import dotenv from "dotenv";
import Connect from "./database/db.js";
import cookieparser from 'cookie-parser';
import userRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import jobRoutes from './routes/job.js';
import studentRoutes from './routes/student.js';
import  errorHandler from "./middlewares/errorHandler.js"

const app = express();

//configurations
dotenv.config();
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/student', studentRoutes);

//middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    Connect();
    console.log("server running on port 8800");
});