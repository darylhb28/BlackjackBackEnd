import express from "express";
import { getGameStatsByUserId, addToStat } from "../db/queries/games.js";
import { verifyToken } from "../app.js";
import jwt from "jsonwebtoken";
const { verify } = jwt

const router = express.Router();

// Gets game stats by user from the database
router.get("/", verifyToken, async (req, res, next) => {
    try {
        const stats = await getGameStatsByUserId(req.user.id);
        res.json(stats);
    } catch (err) {
        next(err);
    }
});

// Adds to the stat via the addToStat function in the db
// Stat refers to which statistic is being changed (hands played, won, etc.)
router.post("/increment", verifyToken, async (req, res, next) => {
    const {stat} = req.body;
    try {
        const response = await addToStat(req.user.id, stat);
        console.log(response)
        res.status(200).json({response});
    } catch (err) {
        next(err);
    }
});


export default router;