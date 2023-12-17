import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsUpdate(false);
    setNoteToUpdate(null);
  };

  const editNote = (note) => {
    setIsUpdate(true);
    setNoteToUpdate(note);
    openModal();
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        isOpen,
        isUpdate,
        setIsUpdate,
        noteToUpdate,
        setNoteToUpdate,
        openModal,
        closeModal,
        editNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
