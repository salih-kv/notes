import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

export const Starred = () => {
  const { notes } = useNotes();
  const starredNotes = notes
    ? notes
        .filter(
          (note) =>
            note.isStarred === true && note.scheduledForDeletion === null
        )
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];
  return (
    <>
      {starredNotes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
};
