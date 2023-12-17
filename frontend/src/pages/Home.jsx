import { FaPlus } from "react-icons/fa6";
import { Note } from "../components/Note";
import { CreateNote } from "../components/CreateNote";
import { useEffect } from "react";
import instance from "../axios/instance";
import { useNotes } from "../context/NotesContext";

export const Home = () => {
  const { notes, setNotes, openModal } = useNotes();

  const fetchNotes = async () => {
    const response = await instance.get("/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen flex justify-between">
      <nav className="w-20 h-20 hidden md:min-h-screen md:flex justify-center md:border-r px-4 py-12">
        <div className="fixed">
          <button
            onClick={openModal}
            className="bg-black p-2 rounded-full text-white text-2xl"
          >
            <FaPlus />
          </button>
        </div>
      </nav>
      <CreateNote />
      <main className="w-full p-12">
        <header className="mb-4">
          <h1 className="text-5xl font-medium mb-8">Notes</h1>
          <input type="text" className="input" placeholder="Search" />
        </header>
        <section className="notes-cont gap-6">
          {notes?.map((note) => (
            <Note key={note._id} {...note} />
          ))}
        </section>
      </main>
    </div>
  );
};
