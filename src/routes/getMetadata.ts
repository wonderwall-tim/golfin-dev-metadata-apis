import express from "express";
/* import { InvalidCoreMetadata } from "../errors"; */
import Token from 'golfin-dev-metadata/build/Token'
import Metadata from 'golfin-dev-metadata/build/Metadata'
import TOKEN_TYPE_LAYOUT from 'golfin-dev-metadata/build/Layout'
import BN from 'bn.js'
import web3 from 'web3'

const getMetadata = express.Router();

/* const layoutsByTypeId = {
    "1": CAR_LAYOUT,
}
 */

getMetadata.get("/:tokenId", async (req, res, next) => {
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