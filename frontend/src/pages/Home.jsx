import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { TfiViewList, TfiViewGrid } from "react-icons/tfi";
import { CgMenuLeft } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Nav } from "../components/Nav";
import { CreateUpdateNote } from "../components/CreateUpdateNote";
import { Outlet } from "react-router-dom";
import instance from "../axios/instance";
import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Note } from "../components/Note";

export const Home = () => {
  const { setNotes, openModal, gridView, setGridView } = useNotes();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [query, setQuery] = useState();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    setQuery(() => query);
    try {
      const response = await instance.post("notes/search", {
        query,
      });
      setResults(response.data);
    } catch (err) {
      console.log("Error fetching query", err);
    }
  };

  const closeSearch = () => {
    setResults([]);
    setQuery("");
  };

  const fetchNotes = async () => {
    const response = await instance.get("/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (query === "") {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex justify-between">
      <header className="fixed z-50 gap-2 md:gap-6 w-full h-16 border-b px-4 md:px-0 flex items-center bg-white dark:bg-p-dark">
        <div className="flex items-center justify-center md:w-44">
          {/* <h1 className="font-bold text-2xl">Notes</h1> */}
        </div>
        <button
          onClick={openModal}
          className="bg-black p-1 rounded-full text-white text-xl md:text-2xl hidden sm:block"
        >
          <FaPlus />
        </button>
        <button onClick={toggleNav} className="sm:hidden">
          <CgMenuLeft className="text-2xl" />
        </button>
        <div className="relative w-full md:w-fit">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="border rounded-md px-10 text-sm py-2 w-full md:min-w-[500px] placeholder:text-black/60 placeholder:tracking-wide"
            placeholder="Search notes, keyword..."
          />
          {query?.length > 0 && (
            <button
              onClick={closeSearch}
              className="absolute right-4 top-1.5 text-xl cursor-pointer btn-small !p-1"
            >
              <IoClose />
            </button>
          )}
          <HiMagnifyingGlass className="absolute left-4 top-2.5 text-xl font-bold" />
        </div>
        <button
          onClick={() => setGridView((prev) => !prev)}
          className="sm:hidden text-xl"
        >
          {gridView ? <TfiViewGrid /> : <TfiViewList />}
        </button>
      </header>
      <main className={`w-full md:ml-44`}>
        <Nav isOpen={isNavOpen} toggleNav={toggleNav} />
        <CreateUpdateNote />

        {results?.length > 0 ? (
          <div className="mt-16 p-4 md:p-12">
            <section className={`notes-cont gap-6`}>
              {results?.map((note) => (
                <Note key={note._id} note={note} searchQuery={query} />
              ))}
            </section>
          </div>
        ) : (
          <Outlet />
        )}
        <button
          onClick={openModal}
          className="bg-black p-2 rounded-full text-white text-xl md:text-2xl absolute right-4 bottom-4 sm:hidden"
        >
          <FaPlus />
        </button>
      </main>
    </div>
  );
};
