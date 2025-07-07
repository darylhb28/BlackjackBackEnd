import db from "../../db/client.js"
import bcrypt from "bcrypt"

export async function createUser({email, password}){
    const securePassword = await bcrypt.hash(password, 10)
    const sql = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *;
    `
    const {rows: [user]} = await db.query(sql, [email, securePassword])
    return user
}

export async function getUser({email}){
    const sql = `
    SELECT * FROM users 
    WHERE email = $1;
    `
    const {rows: [user]} = await db.query(sql, [email])
    return user
}

export async function getUserByID({id}){
    const sql = `
    SELECT * FROM users 
    WHERE id = $1;
    `
    const {rows: [user]} = await db.query(sql, [id])
    return user
}