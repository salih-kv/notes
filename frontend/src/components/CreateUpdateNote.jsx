import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import instance from "../axios/instance";
import { useNotes } from "../context/NotesContext";

export const CreateUpdateNote = () => {
  const { setNotes, modalIsOpen, closeModal, isUpdate, noteToUpdate } =
    useNotes();

  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const createNote = async () => {
    const response = await instance.post("/notes", inputValues);
    setNotes((notes) => [...notes, response.data]);
    setInputValues((prev) => ({ ...prev, title: "", content: "" }));
    closeModal();
  };

  const UpdateNote = async () => {
    const response = await instance.patch(
      `/notes/${noteToUpdate._id}`,
      inputValues
    );
    const updatedNote = response.data;

    setNotes((notes) =>
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );

    setInputValues({ title: "", content: "" });
    closeModal();
  };

  useEffect(() => {
    if (isUpdate && noteToUpdate) {
      setInputValues({
        title: noteToUpdate.title,
        content: noteToUpdate.content,
      });
    } else {
      setInputValues({ title: "", content: "" });
    }
  }, [isUpdate, noteToUpdate]);

  const handleSubmit = isUpdate ? UpdateNote : createNote;

  return (
    <>
      <Transition appear show={modalIsOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <input
                    type="text"
                    className="input !mb-0"
                    placeholder="Title"
                    value={inputValues.title}
                    name="title"
                    onChange={handleInputChange}
                  />
                  <textarea
                    rows="5"
                    className="input !mt-0 resize-none"
                    placeholder="Take a note..."
                    name="content"
                    value={inputValues.content}
                    onChange={handleInputChange}
                  ></textarea>

                  <div className="mt-4 flex justify-end items-center ">
                    <button
                      onClick={handleSubmit}
                      className="bg-black p-3 rounded-full text-white disabled:bg-black/60"
                      disabled={isDirty ? false : true}
                    >
                      <FaCheck />
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
