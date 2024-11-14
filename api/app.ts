import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index';
import { errorHandler } from './errorHandler';
import "express-async-errors"

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: ['http://localhost:3000', 'https://smart-contract-iota.vercel.app/']
}))

app.use(express.static("public"))

app.use('/api', indexRouter)

app.use(errorHandler)

export default app;