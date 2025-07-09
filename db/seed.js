import db from "./client.js"
import { seedCards } from "./queries/cards.js";
import { seedStrategy } from "./queries/strategy.js";
import { createUser } from "./queries/users.js";
import { cards, strategyData } from "./seedData.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(){

await createUser({
    email: "dealer@dealer.com",
    password: "1234"
})

await createUser({
    email: "newuser1@mail.com",
    password: "1234"
})

for (const card of cards){
    await seedCards(card)
}

for (const data of strategyData){
    await seedStrategy(data)
}

}