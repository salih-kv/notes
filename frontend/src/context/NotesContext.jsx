import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsUpdate(false);
    setNoteToUpdate(null);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        modalIsOpen,
        isUpdate,
        setIsUpdate,
        noteToUpdate,
        setNoteToUpdate,
        openModal,
        closeModal,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
