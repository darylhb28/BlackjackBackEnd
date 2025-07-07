import express from "express"
const router = express.Router()
export default router
import { newGame } from "../db/queries/shoe.js"

//POST starts a new game by loading the shoe with a deck
router.route("/").post(async (req, res, next)=>{
        await newGame()
        res.status(200).json("Shoe loaded, hands cleared, ready for new game.")
    }
)
