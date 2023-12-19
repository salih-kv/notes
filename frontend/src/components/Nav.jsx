import { FaPlus } from "react-icons/fa6";
import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

const NavItems = [
  { to: "", label: "All Notes", icon: <HiOutlineSquare2Stack /> },
  { to: "/archive", label: "Archive", icon: <HiOutlineArchiveBoxArrowDown /> },
  { to: "/trash", label: "Trash", icon: <HiOutlineTrash /> },
];

export const Nav = () => {
  const { openModal } = useNotes();
  return (
    <nav className="w-14 hidden sm:block md:w-44 fixed left-0 top-0 h-screen border-r bg-white">
      <div className="flex flex-col items-center justify-center h-16 border-b">
        <h1 className="font-bold">Notes</h1>
      </div>
      <div className="flex items-center justify-center h-20">
        <button
          onClick={openModal}
          className="bg-black p-1 md:p-2 rounded-full text-white text-xl md:text-2xl"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col items-center md:items-start gap-4">
        {NavItems?.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={label}
            className="flex items-center gap-4 md:border-l-[6px] font-medium text-gray-500 text-sm border-white md:px-6 py-2"
          >
            <span className="text-xl md:text-xl">{icon}</span>
            <span className="hidden md:block">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
