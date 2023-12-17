import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const noteSchema = Schema({
  _id: {
    type: String,
    default: () => uuidv4().slice(0, 6),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

export const Note = model("Note", noteSchema);
