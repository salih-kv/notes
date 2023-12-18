import { useNotes } from "../context/NotesContext";
import { Note } from "../components/Note";
export const AllNotes = () => {
  const { notes } = useNotes();

  const latestNotes = notes
    ? notes
        .filter((note) => note.scheduledForDeletion === null)
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <>
      {latestNotes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
};
