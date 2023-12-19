import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

export const Trash = () => {
  const { notes } = useNotes();
  const deletedNotes = notes
    ? notes
        .filter((note) => note.isDeleted === true)
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

  return (
    <div className="mt-16 p-12">
      <h1 className="mb-4 font-medium text-lg">Trash</h1>
      <section className="notes-cont gap-6">
        {deletedNotes?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </section>
    </div>
  );
};
