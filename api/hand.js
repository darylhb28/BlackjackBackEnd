import express from "express"
import { verifyToken } from "../app.js"
import { deal } from "../db/queries/hand.js"
const router = express.Router()
export default router


//POST  - deals cards from shoe to players hand
router.route("/player").post(verifyToken, async (req, res, next)=>{
    const playerCard = await deal({is_player: true, user_id: req.user.id})
    res.status(200).json(playerCard)
})

//POST  - deals cards from shoe to dealers hand
router.route("/dealer").post(verifyToken, async (req, res, next)=>{
    const dealerCard = await deal({is_player: false, user_id: 1})
    res.status(200).json(dealerCard)
})