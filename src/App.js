import './App.css';
import Note from './components/Note.js';
import { useEffect, useState } from 'react';
import NotesService from './services/notes/NotesService.js';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(notes);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    //En cada cambio seteamos la variable newNote
    setNewNote(e.target.value);
    //setNewNOte retorna el valor del target
  };

  useEffect(() => {
    setLoading(true);
    NotesService.getAllNotes().then((notesJSON) => {
      if (notesJSON?.error) {
        console.error(notesJSON.error);
        return;
      }
      const { notes } = notesJSON;
      setNotes(notes);
      console.log('initial info', notes);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit!');
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleClick = (e) => {
    //pero solo accederemos a ella cuando demos cilck
    e.preventDefault();
    const noteToAdd = {
      content: newNote,
    };
    NotesService.createNewNote(noteToAdd).then((result) => {
      setNotes([...notes, result]);
      console.log(result);
    });
    setNewNote('');
  };

  const toogleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log('this is what we changed!', note, changedNote);
    const res = NotesService.updateNote(changedNote);
    res.then((res) => {
      setNotes(
        notes.map((note) => {
          if (note.id === res.id) return res;
          return note;
        })
      );
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {/* Formulario temporal para login */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input type="submit" value={'login'} />
        </form>
        <form onSubmit={handleClick}>
          <input type="text" onChange={handleChange} value={newNote}></input>
          <button>Crear Nota</button>
        </form>
      </div>
      <div>
        <button onClick={handleShowAll}>
          {showAll ? 'Show Only Important' : 'Show All'}
        </button>
      </div>
      {loading ? 'Cargando...' : ''}
      <ol>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toogleImportanceOf(note.id)}
          ></Note>
        ))}
      </ol>
    </div>
  );
}

export default App;
