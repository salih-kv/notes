import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

export const Archive = () => {
  const { notes, gridView } = useNotes();
  const archiveNotes = notes
    ? notes
        .filter((note) => note.isArchive === true && note.isDeleted === false)
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

  const view = gridView ? "grid-view" : "notes-cont";

  return (
    <div className="mt-16 p-4 md:p-12">
      <h1 className="mb-4 font-medium text-lg">Archive</h1>
      <section className={`${view} gap-6`}>
        {archiveNotes?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </section>
    </div>
  );
};
