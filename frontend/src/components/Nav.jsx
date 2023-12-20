import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const NavItems = [
  { to: "", label: "All Notes", icon: <HiOutlineSquare2Stack /> },
  { to: "/archive", label: "Archive", icon: <HiOutlineArchiveBoxArrowDown /> },
  { to: "/trash", label: "Trash", icon: <HiOutlineTrash /> },
];

export const Nav = ({ isOpen, toggleNav }) => {
  return (
    <nav className={`nav ${isOpen ? "open" : "closed"} mt-16`}>
      <div className="flex items-center justify-center h-20"></div>
      <div className="flex flex-col items-start gap-4">
        {NavItems?.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={label}
            onClick={toggleNav}
            className="flex items-center gap-4 border-l-[6px] font-medium text-gray-500 text-sm border-white px-6 py-2"
          >
            <span className="text-xl md:text-xl">{icon}</span>
            <span className="">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
