import express from 'express'
import jwt from "jsonwebtoken"
import cors from "cors"
const app = express()
export default app
import usersRouter from "./api/users.js"
import strategyRouter from "./api/strategy.js"
import handRouter from "./api/hand.js"
import shoeRouter from "./api/shoe.js"
import gamesRouter from "./api/games.js";


app.use(cors());

app.use(express.json())

app.use("/users", usersRouter)

app.use("/strategy", strategyRouter )

app.use("/hand", handRouter)

app.use("/shoe", shoeRouter)

app.use("/api/games", gamesRouter);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export function verifyToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send("Missing authorization token")
  }

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJWT;

  if (!req.user) {
      return res.status(401).send("Invalid token");
  }

 next();

}