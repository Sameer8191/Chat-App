import "dotenv/config";
import dns from "node:dns/promises";
import express from "express";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

await connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
