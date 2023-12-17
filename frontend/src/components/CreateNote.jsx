import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import instance from "../axios/instance";
import { useNotes } from "../context/NotesContext";

export const CreateNote = ({ isUpdate, noteToUpdate }) => {
  const { setNotes, isOpen, closeModal } = useNotes();

  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isUpdate && noteToUpdate) {
      setInputValues({
        title: noteToUpdate.title,
        content: noteToUpdate.content,
      });
    }
  }, [isUpdate, noteToUpdate]);

  const UpdateNote = async () => {
    const response = await instance.patch(
      `/notes/${noteToUpdate.id}`,
      inputValues
    );
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );

    setInputValues({ title: "", content: "" });
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const createNote = async () => {
    const response = await instance.post("/notes", inputValues);
    setNotes((notes) => [...notes, response.data]);
    setInputValues((prev) => ({ ...prev, title: "", content: "" }));
    closeModal();
  };

  const handleSubmit = isUpdate ? UpdateNote : createNote;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <input
                    type="text"
                    className="input"
                    placeholder="Title"
                    name="title"
                    onChange={handleInputChange}
                  />
                  <div className="mt-2">
                    <textarea
                      cols="30"
                      rows="5"
                      className="input resize-none"
                      placeholder="Take a note..."
                      name="content"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <IoClose />
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-black px-4 py-1 rounded-md text-white"
                    >
                      {isUpdate ? "update" : "Add"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
