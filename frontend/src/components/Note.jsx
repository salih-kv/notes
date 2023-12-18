import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlinePencil,
  HiOutlineStar,
  HiOutlineTrash,
  HiStar,
} from "react-icons/hi2";
import { formatDate } from "../utils/formatDate";
import { useNotes } from "../context/NotesContext";
import instance from "../axios/instance";

export const Note = ({ note }) => {
  const { setNotes, openModal, setIsUpdate, setNoteToUpdate } = useNotes();
  const { title, content, isStarred, updatedAt } = note;
  const formattedDate = formatDate(updatedAt);

  const editNote = () => {
    setIsUpdate(true);
    setNoteToUpdate(note);
    openModal();
  };

  const starNote = async () => {
    const response = await instance.patch(`/notes/${note._id}`, {
      isStarred: !isStarred,
    });
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  const deleteNote = async () => {
    const response = await instance.delete(`/notes/${note._id}`);
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  return (
    <div
      className={`group flex flex-col min-h-80 bg-white border shadow-sm rounded-xl p-2 lg:p-3 text-[#282828] text-lg`}
    >
      <header className="flex justify-between items-center h-10">
        <div>
          <h2 className="font-semibold text-base">{title}</h2>
          <p className=" text-gray-500 text-xs">{formattedDate}</p>
        </div>
        <span>
          <button
            onClick={editNote}
            className="text-gray-400 text-sm hidden group-hover:flex"
          >
            <HiOutlinePencil />
          </button>
        </span>
      </header>
      <div className="flex-1 py-4" onClick={editNote}>
        <p className="text-sm">{content}</p>
      </div>
      <footer className="flex justify-between items-center">
        <div>
          <button onClick={starNote} className="text-sm lg:text-base">
            {isStarred ? (
              <HiStar className="text-yellow-400" />
            ) : (
              <HiOutlineStar className="text-gray-400" />
            )}
          </button>
        </div>
        <div className="hidden group-hover:flex space-x-4 lg:space-x-6 text-gray-400 text-sm lg:text-base">
          <button>
            <HiOutlineArchiveBoxArrowDown />
          </button>
          <button onClick={deleteNote}>
            <HiOutlineTrash />
          </button>
        </div>
      </footer>
    </div>
  );
};
