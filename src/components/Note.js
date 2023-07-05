const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li className="note">
      <p>{note.content}</p>
      <small>{note.date}</small>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
