import { FaPlus } from "react-icons/fa6";
import { Note } from "../components/Note";

export const Home = () => {
  return (
    <div className="min-h-screen flex justify-between">
      <nav className="w-28 min-h-screen flex justify-center border-r px-4 py-16">
        <div>
          <button className="bg-black p-3 rounded-full text-white text-2xl">
            <FaPlus />
          </button>
        </div>
      </nav>
      <main className="w-full p-16">
        <header className="mb-12">
          <h1 className="text-5xl font-medium">Notes</h1>
        </header>
        <section className="grid grid-cols-4 gap-6">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </section>
      </main>
    </div>
  );
};
