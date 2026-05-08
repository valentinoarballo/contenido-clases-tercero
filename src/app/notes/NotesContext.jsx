import { createContext, useContext, useState, useEffect } from "react";
import { notes as defaultNotes, categories } from "@/lib/notes";

const NotesContext = createContext();

export function NotesProvider({ children }) {

  const [notes, setNotes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const saved = window.localStorage.getItem("my_notes");

    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      window.localStorage.setItem("my_notes", JSON.stringify(defaultNotes));
    }

  }, [])

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("my_notes", JSON.stringify(newNotes));
    }
  }

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    const newNotes = [...notes, newNote];
    saveNotes(newNotes);
  }

  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    saveNotes(filteredNotes);
  }

  const getNoteById = (id) => notes.find(note => String(note.id) === String(id))

  const getDynamicCategories = () => {
    return categories.map(category => ({
      ...category,
      notes: notes.filter(note => String(note.category_id) === String(category.id))
    }))
  }


  if (!isMounted) return null;

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, getNoteById, getDynamicCategories }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)
  