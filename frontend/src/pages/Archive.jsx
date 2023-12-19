import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

export const Archive = () => {
  const { notes } = useNotes();
  const archiveNotes = notes
    ? notes
        .filter((note) => note.isArchive === true && note.isDeleted === false)
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];
  return (
    <div className="mt-16 p-12">
      <h1 className="mb-4 font-medium text-lg">Archive</h1>
      <section className="notes-cont gap-6">
        {archiveNotes?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </section>
    </div>
  );
};
