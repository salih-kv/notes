import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineArchiveBoxXMark,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi2";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FaTrashArrowUp } from "react-icons/fa6";
import { MdOutlineColorLens, MdOutlineFormatColorReset } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import { useNotes } from "../context/NotesContext";
import instance from "../axios/instance";

const bgcolors = [
  { name: "default", color: "#fff" },
  { name: "yellow", color: "#faafa8" },
  { name: "amber", color: "#f39f76" },
  { name: "orange", color: "#fff8b8" },
  { name: "green", color: "#e2f6d3" },
];

export const Note = ({ note }) => {
  const {
    setNotes,
    openModal,
    setIsUpdate,
    setNoteToUpdate,
    showColorOptions,
    setShowColorOptions,
  } = useNotes();
  const { title, content, bgColor, isPinned, isArchive, isDeleted, updatedAt } =
    note;
  const formattedDate = formatDate(updatedAt);

  const editNote = () => {
    setIsUpdate(true);
    setNoteToUpdate(note);
    openModal();
  };

  const updateNote = async (field, value) => {
    const response = await instance.patch(`/notes/${note._id}`, {
      [field]: value,
    });
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  const pinNote = () => updateNote("isPinned", !isPinned);
  const archiveNote = () => updateNote("isArchive", !isArchive);
  const deleteNote = () => updateNote("isDeleted", !isDeleted);
  const setBgColor = (color) => updateNote("bgColor", color);

  const deleteNoteForever = async () => {
    await instance.delete(`/notes/${note._id}`);
    setNotes((notes) => notes.filter((n) => n._id !== note._id));
  };

  const toggleColorOptions = (noteId) => {
    setShowColorOptions((prev) => {
      const updatedState = { [noteId]: !prev[noteId] };
      Object.keys(prev).forEach((key) => {
        if (key !== noteId) {
          updatedState[key] = false;
        }
      });

      return updatedState;
    });
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`group flex flex-col max-h-96 border shadow-sm rounded-xl p-4 select-none`}
    >
      <header className="flex justify-between items-center h-10">
        <div className="w-full">
          <h2 className="font-semibold text-base">{title}</h2>
          {/* <p className=" text-gray-500 text-xs">{formattedDate}</p> */}
        </div>
        <span>
          {!isDeleted && (
            <button onClick={pinNote} className="text-lg btn-small">
              {isPinned ? (
                <BsPinAngleFill className="text-amber-400" />
              ) : (
                <BsPinAngle className="text-gray-800 hidden group-hover:flex" />
              )}
            </button>
          )}
        </span>
      </header>
      <div
        className="flex-1 pb-2 mb-2 cursor-pointer overflow-y-hidden"
        onClick={editNote}
      >
        <p className="text-sm">{content}</p>
      </div>
      <footer className=" group-hover:visible flex justify-between items-center h-6 text-gray-800 lg:text-lg">
        <div className="flex items-center relative">
          <button
            className="btn-small"
            onClick={() => toggleColorOptions(note._id)}
          >
            <MdOutlineColorLens />
          </button>
          {showColorOptions[note._id] && (
            <div className="absolute top-7 h-10 bg-white shadow-lg flex items-center justify-between gap-1 p-2 rounded-2xl">
              {bgcolors?.map(({ name, color }) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => setBgColor(color)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border cursor-pointer`}
                >
                  {color === "#fff" && (
                    <MdOutlineFormatColorReset className="" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex space-x-2 ">
          <div className="hover:text-gray-800">
            {!isDeleted && (
              <button onClick={archiveNote} className="btn-small">
                {isArchive ? (
                  <HiOutlineArchiveBoxXMark />
                ) : (
                  <HiOutlineArchiveBoxArrowDown />
                )}
              </button>
            )}
          </div>
          <div>
            {isDeleted ? (
              <div className="flex items-center space-x-2">
                <button onClick={deleteNote} className="btn-small">
                  <FaTrashArrowUp className="text-sm" />
                </button>
                <button onClick={deleteNoteForever} className="btn-small">
                  <HiTrash />
                </button>
              </div>
            ) : (
              <button onClick={deleteNote} className="btn-small">
                <HiOutlineTrash />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
