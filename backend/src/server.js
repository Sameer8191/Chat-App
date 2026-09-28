import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
