import express from "express"
import { getMetadata } from "./getMetadata";
import { chainId } from '../config/default.json'

const router = express.Router();

//Response to the health check
router.get("/ping", function (req, res, next) {
    res.json({ response: chainId });
});

//Return the metadata json
router.use("/", getMetadata);

export default router;