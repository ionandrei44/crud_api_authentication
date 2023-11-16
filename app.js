import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDatabase();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
