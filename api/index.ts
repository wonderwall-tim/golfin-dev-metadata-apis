import dotenv from 'dotenv'

import express from 'express';
import cookieParser from 'cookie-parser';
/* import cors from 'cors'; */
import { errorHandler } from './errorHandler';
import { chainId } from './config/default.json'
import "express-async-errors"
/* import { InvalidCoreMetadata } from "../errors"; */
import Token from 'golfin-dev-metadata/build/Token'
import Metadata from 'golfin-dev-metadata/build/Metadata'
import TOKEN_TYPE_LAYOUT, { CAR_LAYOUT } from 'golfin-dev-metadata/build/Layout'
import BN from 'bn.js'
import path from 'path'

dotenv.config()

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"))

// FIXME: cors
/* 
const corsOptions = {
    origin: ['http://localhost:3000', 'https://smart-contract-iota.vercel.app/'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); */

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get("/ping", (req, res, next) => {
    res.status(200).send({ response: chainId });
});


app.post("/encode", async (req, res, next) => {
    try {
        console.log('on post');


        const coreData = req.body
        console.log(coreData);

        const token = Token.fromMetadata(coreData, CAR_LAYOUT);
        const metadata = new Metadata(token).toJSON();
        res.json({
            metadata: metadata,
            token: token.getTokenID().toString(10)
        })

    } catch (e) {
        const errorMsg = (e as any).message
        console.log(errorMsg)
        return next(errorMsg)
    }
});

app.get("/decode/:tokenId", async (req, res, next) => {
    const tokenIdInput = req.params.tokenId
    try {
        const bnToken = new BN(tokenIdInput)
        const newToken = new Token({ id: bnToken });
        const metadata = new Metadata(newToken);
        const fullMetadata = metadata.toJSON('11155111'); // This is chain id, default to 11155111.
        // image from Type_Material_Item_Appearance
        res.json(fullMetadata)

    } catch (e) {
        if (typeof (e) == 'string') {
            next(new Error(e));
        } else {
            next(e);
        }
    }
});


app.use(errorHandler)


app.listen(3000, () => {
    console.log('app is listening to 3001')
});


module.exports = app;