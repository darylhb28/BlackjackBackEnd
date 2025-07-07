import db from '../../db/client.js'

export async function seedCards({rank, suit, card_value}){
const sql = `INSERT INTO cards (rank, suit, card_value)
VALUES ($1, $2, $3)
RETURNING *
`
const {rows: cards} = await db.query (sql, [rank, suit, card_value])
return cards
}