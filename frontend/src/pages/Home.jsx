import { HiMagnifyingGlass } from "react-icons/hi2";
import { Nav } from "../components/Nav";
import { CreateUpdateNote } from "../components/CreateUpdateNote";
import { Outlet } from "react-router-dom";
import instance from "../axios/instance";
import { useEffect } from "react";
import { useNotes } from "../context/NotesContext";

export const Home = () => {
  const { setNotes } = useNotes();

  const fetchNotes = async () => {
    const response = await instance.get("/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen flex justify-between">
      <Nav />
      <CreateUpdateNote />
      <main className="flex-1 sm:ml-14 md:ml-44">
        <header className="fixed w-full h-16 border-b px-12 flex items-center bg-white">
          <input
            type="text"
            className="border rounded-md px-2 pl-10 text-sm py-1.5 w-[300px] md:min-w-[500px] placeholder:text-black/60 placeholder:tracking-wide"
            placeholder="Search notes, dates, keyword..."
          />
          <HiMagnifyingGlass className="absolute left-16" />
        </header>
        <Outlet />
      </main>
    </div>
  );
};
