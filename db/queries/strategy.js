import db from "../../db/client.js"

export async function seedStrategy({players_hand, dealers_upcard, recc_action, hand_type}){
const sql = `INSERT INTO strategy (players_hand, dealers_upcard, recc_action, hand_type)
VALUES ($1, $2, $3, $4)
RETURNING *;`
const {rows: strategy} = await db.query(sql, [players_hand, dealers_upcard, recc_action, hand_type])
return strategy
}

//get a reccomended action for a hand
export async function getStrategy({players_hand, dealers_upcard, hand_type}){
const  sql = `
SELECT recc_action FROM strategy WHERE players_hand = $1 AND dealers_upcard = $2 AND hand_type = $3
`
const {rows: recc_action} = await db.query(sql, [players_hand, dealers_upcard, hand_type])
return recc_action
}