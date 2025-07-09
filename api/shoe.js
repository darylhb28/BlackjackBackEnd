import express from "express"
const router = express.Router()
export default router
import { checkShoe, newGame } from "../db/queries/shoe.js"

//POST starts a new game by loading the shoe with a deck
router.route("/").post(async (req, res, next)=>{
        await newGame()
        res.status(200).json("Shoe loaded, hands cleared, ready for new game.")
    }
)

//GET returns the remaining cards in the shoe
router.route("/").get(async(req, res, next)=>{
    const shoe = await checkShoe()
    res.status(200).json(shoe)
})
