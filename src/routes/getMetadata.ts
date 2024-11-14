import express from "express";
/* import { InvalidCoreMetadata } from "../errors"; */
import Token from 'golfin-dev-metadata/build/Token'
import Metadata from 'golfin-dev-metadata/build/Metadata'
import TOKEN_TYPE_LAYOUT, { CAR_LAYOUT } from 'golfin-dev-metadata/build/Layout'
import BN from 'bn.js'

const getMetadata = express.Router();

getMetadata.post("/encode", async (req, res, next) => {
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

getMetadata.get("/decode/:tokenId", async (req, res, next) => {
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



export { getMetadata };