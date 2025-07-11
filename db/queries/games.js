import db from "../../db/client.js";

// Game stats by user id
export async function getGameStatsByUserId(user_id) {
  const result = await db.query(
    `SELECT hands_played, hands_won, hands_lost, hands_pushed, current_streak, max_streak 
     FROM gamesPlayed 
     WHERE user_id = $1`,
    [user_id]
  );
  return result.rows[0];
}

// Adds 1 to the number of hands played, lost, won, or pushed (depending on what was done)
export async function addToStat(user_id, statColumn) {
    // if () makes it so only these stats can be changed, otherwise there's an error
  if (!['hands_played', 'hands_won', 'hands_lost', 'hands_pushed'].includes(statColumn)) {
    throw new Error("Invalid stat column");
  }

  await db.query(
    `INSERT INTO gamesPlayed (user_id, ${statColumn}) 
     VALUES ($1, 1)
     ON CONFLICT (user_id) 
     DO UPDATE SET ${statColumn} = gamesPlayed.${statColumn} + 1`,
    [user_id]
  );
}

// Updates your winning streak. if () part makes it so if you win, then the streak is increased by one. else if () part makes it so if you lose OR if you push, your winning streak is set back to 0.
export async function updateStreak(user_id, outcome) {
  if (outcome === "You Win") {
    await db.query(`
      INSERT INTO gamesPlayed (user_id, current_streak, max_streak)
      VALUES ($1, 1, 1)
      ON CONFLICT (user_id)
      DO UPDATE SET
        current_streak = gamesPlayed.current_streak + 1,
        max_streak = GREATEST(gamesPlayed.max_streak, gamesPlayed.current_streak + 1)
    `, [user_id]);
  } else if (["You Lose", "You Push"].includes(outcome)) {
    await db.query(`
      UPDATE gamesPlayed
      SET current_streak = 0
      WHERE user_id = $1
    `, [user_id]);
  }
};