// Import the express in typescript file
import express from "express";
import 'dotenv/config'
import { sequelize } from "./config/mysql";
import { loadDB } from "./models/model-loader";

const port = process.env.APP_PORT || 5000;

// Initialize the express engine
const app: express.Application = express();

loadDB(sequelize);

// Handling '/' Request
app.get("/", (_req, res) => {
  res.send({ message: "Live and running typescript, baby" });
});

app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         Running on port: ${port}`);
});
