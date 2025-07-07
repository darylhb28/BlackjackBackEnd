import app from "./app.js"
import db from "./db/client.js"

const PORT = process.env.PORT ?? 3000;

try {
  await db.connect();
  console.log("✅ Database connected");
} catch (err) {
  console.error("❌ Error connecting to database:", err);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}...`);
});