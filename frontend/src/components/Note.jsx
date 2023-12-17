import { MdModeEdit } from "react-icons/md";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useState } from "react";

export const Note = () => {
  const [isStarred, setIsStarred] = useState(true);
  return (
    <div className="w-80 min-h-80 bg-green-200 rounded-3xl p-8 text-[#282828] text-lg">
      <header className="flex justify-between items-center">
        <h2 className="mb-4 font-bold">Lorem Ipsum</h2>
        <span
          className={`${
            isStarred ? "bg-black border-black" : "bg-transparent border-white"
          } border p-1.5 rounded-full text-xl ml-4 mb-4`}
        >
          {isStarred ? (
            <IoMdStar className="text-yellow-300" />
          ) : (
            <IoMdStarOutline className="text-white" />
          )}
        </span>
      </header>
      <p className="font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        placeat ut animi quasi, dolor porro autem! Et architecto maiores
        aliquam?
      </p>
      <footer className="flex justify-between items-center mt-4">
        <p className=" text-gray-700">May 21, 2023</p>
        <button className="bg-black p-2 rounded-full text-white text-xl">
          <MdModeEdit />
        </button>
      </footer>
    </div>
  );
};
