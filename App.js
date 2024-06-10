import React, { useState } from "react";
import Home from "./src/screens/home";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
      category: "General",
    },
  ]);
  const [categories, setCategories] = useState(["General", "Work", "Personal"]);

  const addNote = (title, desc, category) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
    setNoteList([...noteList, { id, title, desc, category }]);
  };

  const editNote = (id, newTitle, newDesc, newCategory) => {
    const updatedNotes = noteList.map((note) =>
      note.id === id
        ? { ...note, title: newTitle, desc: newDesc, category: newCategory }
        : note
    );
    setNoteList(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = noteList.filter((note) => note.id !== id);
    setNoteList(updatedNotes);
  };

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      noteList={noteList}
      addNote={addNote}
      editNote={editNote}
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      deleteNote={deleteNote}
      categories={categories}
    />
  );
};

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  editNote,
  selectedNote,
  setSelectedNote,
  deleteNote,
  categories,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          setSelectedNote={setSelectedNote}
          deleteNote={deleteNote}
        />
      );
    case "add":
      return (
        <AddNote
          setCurrentPage={setCurrentPage}
          addNote={addNote}
          categories={categories}
        />
      );
    case "edit":
      return (
        <EditNote
          note={selectedNote}
          setCurrentPage={setCurrentPage}
          editNote={editNote}
          categories={categories}
        />
      );
    default:
      return <Home />;
  }
};

export default App;
