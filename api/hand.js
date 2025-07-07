import express from "express"
import { verifyToken } from "../app.js"
import { deal, splitHand } from "../db/queries/hand.js"
const router = express.Router()
router.use(express.json())
export default router



//POST  - deals 1 card from shoe to players hand. also works as the hit function
router.route("/player").post(verifyToken, async (req, res, next)=>{
    
    let hand_num
    if (!req.body){
        hand_num = 1
    } else {
        hand_num = req.body.hand_num
    }

    const playerCard = await deal({is_player: true, user_id: req.user.id, hand_num})
    res.status(200).json(playerCard)
})

//POST  - deals 1 card from shoe to dealers hand
router.route("/dealer").post(verifyToken, async (req, res, next)=>{
    const dealerCard = await deal({is_player: false, user_id: 1})
    res.status(200).json(dealerCard)
})

//POST - splits players hand into two, send hand num
router.route("/split").post(verifyToken, async (req, res, next)=> {
    let {hand_num} = req.body

    if (!hand_num){
        return res.status(400).json("Please indicate hand number")
    }

    const newHand = await splitHand({is_player: true, user_id: req.user.id, hand_num})
    res.status(200).json(newHand)
})

