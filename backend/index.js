import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {
  createNote,
  getNoteById,
  getNotesByUserId,
  noteToTrash,
  updateNote,
} from "./controller/note.controller.js";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "./controller/user.controller.js";
import { verifyToken } from "./middleware/verifyToken.js";

dotenv.config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Mongodb
(async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED @", connection.host);
  } catch (error) {
    console.error(error.message);
  }
})();

// Auth
app.post("/signup", signupUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);

// Notes
app.post("/notes", verifyToken, createNote);
app.get("/notes", verifyToken, getNotesByUserId);
app.get("/notes/:id", verifyToken, getNoteById);
app.patch("/notes/:id", verifyToken, updateNote);
app.delete("/notes/:id", verifyToken, noteToTrash);

// Connect Server
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT:${PORT}`));
