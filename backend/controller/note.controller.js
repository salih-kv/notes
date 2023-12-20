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
    if ("isDeleted" in updateData) {
      // Update the note to mark it for deletion after 7 days
      const scheduledDeletionDate = new Date();
      scheduledDeletionDate.setDate(scheduledDeletionDate.getDate() + 7);

      const update = updateData.isDeleted
        ? { scheduledForDeletion: scheduledDeletionDate }
        : { scheduledForDeletion: null };

      await Note.findByIdAndUpdate({ _id: id }, update, {
        new: true,
      });
    }

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

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(deletedNote);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const searchNote = async (req, res) => {
  const { query } = req.body;
  const userId = req.user.id;

  try {
    const results = await Note.find({
      $and: [
        { user: userId },
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
