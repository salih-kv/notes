import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const noteSchema = Schema(
  {
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
    isStarred: {
      type: Boolean,
      default: false,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    scheduledForDeletion: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model("Note", noteSchema);
