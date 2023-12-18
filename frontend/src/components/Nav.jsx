import { FaPlus } from "react-icons/fa6";
import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineSquare2Stack,
  HiOutlineStar,
  HiOutlineTrash,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

const NavItems = [
  { to: "", label: "All Notes", icon: <HiOutlineSquare2Stack /> },
  { to: "/starred", label: "Starred", icon: <HiOutlineStar /> },
  { to: "/archive", label: "Archive", icon: <HiOutlineArchiveBoxArrowDown /> },
  { to: "/trash", label: "Trash", icon: <HiOutlineTrash /> },
];

export const Nav = () => {
  const { openModal } = useNotes();
  return (
    <nav className="w-14 md:w-44 fixed left-0 top-0 h-screen border-r bg-white">
      <div className="flex flex-col items-center justify-center h-16">
        <button
          onClick={openModal}
          className="bg-black p-1 md:p-2 rounded-full text-white text-xl md:text-2xl"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col items-center md:items-start mt-16 gap-4">
        {NavItems?.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={label}
            className="flex items-center gap-4 md:border-l-[6px] font-medium text-gray-500 text-sm border-white md:px-6 py-2"
          >
            <span className="text-xl md:text-lg">{icon}</span>
            <span className="hidden md:block">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
