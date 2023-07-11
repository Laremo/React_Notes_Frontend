const NotesService = {};
const baseUrl = 'http://localhost:3001';

let token = null;

NotesService.setToken = (newToken) => {
  token = newToken;
};

NotesService.getAllNotes = () => {
  return fetch(baseUrl + '/api/notes', {
    headers: { authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

NotesService.createNewNote = ({ content }, { user }) => {
  return fetch(baseUrl + '/api/notes', {
    method: 'POST',
    body: JSON.stringify({
      note: {
        content: content,
        user: user,
        important: Math.random() > 0.5,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
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
