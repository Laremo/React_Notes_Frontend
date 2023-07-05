const NotesService = {};
const baseUrl = 'http://localhost:3001';

NotesService.getAllNotes = () => {
  return fetch(baseUrl + '/api/notes')
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

NotesService.createNewNote = ({ content }) => {
  return fetch(baseUrl + '/api/notes', {
    method: 'POST',
    body: JSON.stringify({
      note: {
        content: content,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

NotesService.updateNote = ({ id, content, date, important }) => {
  return fetch(`${baseUrl}/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      note: {
        id: id,
        content: content,
        date: date,
        important: important,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export default NotesService;
