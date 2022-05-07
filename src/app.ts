// Import the express in typescript file
import express, { json } from "express";
import "dotenv/config";
import { sequelize } from "./config/mysql";
import { loadDB } from "./utils/model-loader";
import { UserRouter } from "./routes/user-router"
import { ClassRouter } from "./routes/class-router";

const port = process.env.APP_PORT || 5000;

// Initialize the express engine
const app: express.Application = express();
app.use(json());
loadDB(sequelize);

// Handling '/' Request
app.get("/", (_req, res) => {
  res.send({ message: "Live and running typescript, baby" });
});

app.use("/users", UserRouter);
app.use("/classes", ClassRouter);

app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express \n\t running on port: ${port}`);
});
