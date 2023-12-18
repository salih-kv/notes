import { MdModeEdit } from "react-icons/md";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatDate } from "../utils/formatDate";
import { useNotes } from "../context/NotesContext";
import instance from "../axios/instance";

export const Note = ({ note }) => {
  const { setNotes, openModal, setIsUpdate, setNoteToUpdate } = useNotes();
  const { title, content, isStarred, updatedAt, bgColor } = note;
  const formattedDate = formatDate(updatedAt);

  const editNote = () => {
    setIsUpdate(true);
    setNoteToUpdate(note);
    openModal();
  };

  const StarNote = async () => {
    const response = await instance.patch(`/notes/${note._id}`, {
      isStarred: !isStarred,
    });
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  return (
    <div
      className={`group flex flex-col min-h-80 bg-amber-300 rounded-3xl p-6 xl:p-8 text-[#282828] text-lg`}
    >
      <header className="flex justify-between items-center h-10 mb-4">
        <h2 className="font-semibold text-sm md:text-xl">{title}</h2>
        <span
          onClick={StarNote}
          className={`${
            isStarred
              ? "bg-black border-black"
              : "bg-transparent border-black hidden"
          } border-2 p-1.5 rounded-full text-xl ml-4 group-hover:block`}
        >
          {isStarred ? (
            <IoMdStar className="text-yellow-300" />
          ) : (
            <IoMdStarOutline className="text-black" />
          )}
        </span>
      </header>
      <div className="flex-1">
        <p className="text-sm md:text-xl">{content}</p>
      </div>
      <footer className="flex justify-between items-center mt-4">
        <p className=" text-gray-700 text-xs md:text-base">{formattedDate}</p>
        <button
          className="bg-black p-2 rounded-full text-white text-xl"
          onClick={editNote}
        >
          <MdModeEdit />
        </button>
        {/* <button>
          <HiOutlineTrash />
        </button> */}
      </footer>
    </div>
  );
};
