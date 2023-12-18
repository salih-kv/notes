import { FaPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { Note } from "../components/Note";
import { CreateUpdateNote } from "../components/CreateUpdateNote";
import { useEffect } from "react";
import instance from "../axios/instance";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user } = useAuth();
  const { notes, setNotes, openModal } = useNotes();

  const fetchNotes = async () => {
    const response = await instance.get("/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const latestNotes = notes
    ? notes
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

  // ! store in localstorage
  console.log(user);

  return (
    <div className="min-h-screen flex justify-between">
      <nav className="w-20 min-h-screen md:border-r px-4 py-8">
        <div className="flex flex-col items-center justify-between h-full">
          <button
            onClick={openModal}
            className="bg-black p-2 rounded-full text-white text-2xl"
          >
            <FaPlus />
          </button>
          <button className="text-center rounded-full w-8 h-8">
            {user?.profilePic ? (
              <img src={user?.profilePic} alt="" />
            ) : (
              <FaRegUserCircle className="text-3xl" />
            )}
          </button>
        </div>
      </nav>
      <CreateUpdateNote />
      <main className="w-full py-8 px-12">
        <header className="mb-4">
          <h1 className="text-5xl font-medium mb-4">Notes</h1>
          <input type="text" className="input" placeholder="Search" />
        </header>
        <section className="notes-cont gap-6">
          {latestNotes?.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </section>
      </main>
    </div>
  );
};
