import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRoutes);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoDB"));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);