import dotenv from 'dotenv'

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index';
import { errorHandler } from './errorHandler';
import "express-async-errors"

dotenv.config()

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"))

app.use(cors({
    origin: ['http://localhost:3000', 'https://smart-contract-iota.vercel.app/']
}))

app.use('/', indexRouter)

app.use(errorHandler)


app.listen(3001, () => {
    console.log('app is listening to 3001')
});


module.exports = app;