import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use('/', indexRouter)

app.use((req, res, next) => {
    next(new Error(`cannot handle ${req.path}`));
})

export default app;