import "dotenv/config";
import dns from "node:dns/promises";
import express from "express";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const PORT = process.env.PORT || 3000;

await connectDB();

// MIDDLEWARE
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});