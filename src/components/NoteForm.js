import React, { useState } from 'react';

export default function NoteForm({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('');

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAdd = {
      content: newNote,
    };

    addNote(noteToAdd);
    setNewNote('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}></input>
        <button>Crear Nota</button>
      </form>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
