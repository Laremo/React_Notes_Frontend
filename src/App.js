import './App.css';
import Note from './components/Note.js';
import { useEffect, useState } from 'react';
import NotesService from './services/notes/NotesService.js';
import { login } from './services/login/login';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(notes);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    NotesService.getAllNotes().then((notesJSON) => {
      if (notesJSON?.error) {
        console.log(notesJSON);
        console.error(notesJSON.error, new Date().toISOString());
        return;
      }
      const { notes } = notesJSON;
      setNotes(notes);
      console.log('initial info', notes);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const userJson = JSON.parse(loggedUser);
      setUser(userJson);
      NotesService.setToken(userJson.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password });
      setUser(result);
      setUsername('');
      setPassword('');
      NotesService.setToken(result.token);
      localStorage.setItem('loggedUser', JSON.stringify(result));
    } catch (error) {
      setErrorMessage(error.response.data);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    NotesService.setToken('');
    localStorage.removeItem('loggedUser');
  };
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCrateNote = (noteToAdd) => {
    //pero solo accederemos a ella cuando demos cilck
    NotesService.createNewNote(noteToAdd, {
      token: user.token,
      user: user._id,
    }).then((result) => {
      setNotes([...notes, result.response]);
    });
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

      {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
      <div>
        {user ? (
          <NoteForm addNote={handleCrateNote} handleLogout={handleLogout} />
        ) : (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePassChange={(e) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
        )}
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
