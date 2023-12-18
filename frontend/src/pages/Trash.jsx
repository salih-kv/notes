import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

export const Trash = () => {
  const { notes } = useNotes();
  const scheduledForDeletionNotes = notes
    ? notes
        .filter((note) => note.scheduledForDeletion !== null)
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

  return (
    <>
      {scheduledForDeletionNotes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
};
