import { Note } from "../model/note.model.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const userId = req.user.id;
    const note = await Note.create({ title, content, user: userId });
    // await note.populate("user", "name").execPopulate();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getNotesByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const note = await Note.findById({ _id: id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const userId = req.user.id;
    const updatedNote = await Note.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const noteToTrash = async (req, res) => {
  const { id } = req.params;
  try {
    // Update the note to mark it for deletion after 30 days
    const scheduledDeletionDate = new Date();
    scheduledDeletionDate.setDate(scheduledDeletionDate.getDate() + 30);

    const updatedNote = await Note.findByIdAndUpdate(
      { _id: id },
      { scheduledForDeletion: scheduledDeletionDate },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
