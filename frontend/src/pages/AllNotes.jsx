import { useNotes } from "../context/NotesContext";
import { Note } from "../components/Note";
export const AllNotes = () => {
  const { notes } = useNotes();

  const latestNotes = notes
    ? notes
        .filter(
          (note) =>
            note.isDeleted === false &&
            note.isArchive === false &&
            note.isPinned === false
        )
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const pinnedNotes = notes
    ? notes
        .filter(
          (note) =>
            note.isPinned === true &&
            note.isDeleted === false &&
            note.isArchive === false
        )
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

  return (
    <div className="mt-16 p-4 md:p-12">
      {pinnedNotes.length > 0 && (
        <>
          <h1 className="mb-4 font-medium text-lg">Pinned</h1>
          <section className="notes-cont gap-6 mb-4">
            {pinnedNotes?.map((note) => (
              <Note key={note._id} note={note} />
            ))}
          </section>
        </>
      )}
      <h1 className="mb-4 font-medium text-lg">All Notes</h1>
      <section className="notes-cont gap-6">
        {latestNotes?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </section>
    </div>
  );
};
