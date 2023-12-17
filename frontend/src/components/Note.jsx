import { MdModeEdit } from "react-icons/md";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { formatDate } from "../utils/formatDate";
import { useNotes } from "../context/NotesContext";

export const Note = ({ title, content, updatedAt, isStarred }) => {
  const formattedDate = formatDate(updatedAt);
  const { openModal } = useNotes();

  return (
    <div className="flex flex-col min-h-80 bg-green-200 rounded-3xl p-8 text-[#282828] text-lg">
      <header className="flex justify-between items-center">
        <h2 className="mb-4 font-bold">{title}</h2>
        <span
          className={`${
            isStarred ? "bg-black border-black" : "bg-transparent border-black"
          } border-2 p-1.5 rounded-full text-xl ml-4 mb-4`}
        >
          {isStarred ? (
            <IoMdStar className="text-yellow-300" />
          ) : (
            <IoMdStarOutline className="text-black" />
          )}
        </span>
      </header>
      <div className="flex-1">
        <p className="font-medium">{content}</p>
      </div>
      <footer className="flex justify-between items-center mt-4">
        <p className=" text-gray-700">{formattedDate}</p>
        <button
          className="bg-black p-2 rounded-full text-white text-xl"
          onClick={openModal}
        >
          <MdModeEdit />
        </button>
      </footer>
    </div>
  );
};
