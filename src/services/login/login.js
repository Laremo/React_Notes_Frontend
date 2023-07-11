import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

export const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, { user: credentials });
  return data;
};
