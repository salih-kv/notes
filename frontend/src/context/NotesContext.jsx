import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState({});
  const [gridView, setGridView] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsUpdate(false);
    setIsDirty(false);
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
        isDirty,
        setIsDirty,
        showColorOptions,
        setShowColorOptions,
        gridView,
        setGridView,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
