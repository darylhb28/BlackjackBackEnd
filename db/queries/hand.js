import db from "../../db/client.js"

//adds card from shoe to hand
export async function deal({is_player, user_id, hand_num = 1}){
const sql = `SELECT * FROM shoe WHERE drawn = false`
const {rows: shoe} = await db.query(sql);
const randomCardIndex = Math.floor(Math.random() * shoe.length);
const randomCard = shoe[randomCardIndex];
      
const insert = `INSERT INTO hand (card_id, is_player, user_id, hand_num)
VALUES ($1, $2, $3, $4)
RETURNING *`
const {rows:[card]} = await db.query(insert, [randomCard.card_id, is_player, user_id, hand_num])

const update = `UPDATE shoe SET drawn = true WHERE id = $1`
await db.query(update, [randomCard.id])

const convert = `SELECT * FROM cards WHERE id = $1 `
const {rows: [dealt]} = await db.query(convert, [card.card_id])

return dealt
}

// splits hand
export async function splitHand({is_player, user_id, hand_num}){
const sql = `SELECT * FROM hand WHERE user_id = $1 AND hand_num = $2`
const {rows: [card]} = await db.query(sql, [user_id, hand_num])

const update = `UPDATE hand SET hand_num = $1 WHERE user_id = $2 AND card_id = $3
RETURNING *`
const handInt = Number(hand_num) + 1
const {rows: splitHand} = await db.query(update, [handInt, user_id, card.card_id])
return splitHand

}

