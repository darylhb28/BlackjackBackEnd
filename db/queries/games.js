import db from "../../db/client.js";

// Game stats by user id
export async function getGameStatsByUserId(user_id) {
  const result = await db.query(
    `SELECT *
     FROM games
     WHERE user_id = $1`,
    [user_id]
  );
  return result.rows
};


// Adds 1 to the number of hands played, lost, won, or pushed (depending on what was done)
export async function addToStat(user_id, statColumn) {
  if (!['hands_won', 'hands_lost', 'hands_pushed'].includes(statColumn)) {
    throw new Error("Invalid stat column");
  }

  // Insert a new row with statColumn set to 1; others default to 0
 const insert = 
    `INSERT INTO games (user_id, ${statColumn}) 
     VALUES ($1, 1);`
  await db.query(insert, [user_id])

  const sql = `SELECT * FROM games WHERE user_id = $1;`

  const {rows:stats} = await db.query(sql, [user_id])
  return stats
  
};