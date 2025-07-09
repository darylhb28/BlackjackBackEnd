import db from "../../db/client.js"

//start a new game, load the shoe, clear the shoe table, clear the hand?
export async function newGame(deck_num =1){
    const clearShoe = `DELETE FROM shoe`;
    await db.query(clearShoe);

    const clearHand = `DELETE FROM hand`
    await db.query(clearHand)

    const sql = `SELECT * FROM cards`
    const {rows:cards} = await db.query(sql)

    const load = `
    INSERT INTO shoe (card_id, deck_num)
    VALUES ($1, $2)
    RETURNING *
    `
    for (const card of cards){
        await db.query(load, [card.id, deck_num])
    }
}

//returns all cards undrawn in shoe
export async function checkShoe(){
    const sql = `SELECT * FROM shoe WHERE drawn = false`

    const {rows:shoe} = await db.query(sql)
    return shoe
}