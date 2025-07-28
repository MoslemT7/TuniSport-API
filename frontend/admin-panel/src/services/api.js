import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // change to your backend URL

export const api = axios.create({
  baseURL: API_BASE,
});

// Players API
export const fetchPlayers = () => api.get('/players');
export const fetchPlayerById = (id) => api.get(`/players/${id}`);
export const createPlayer = (data) => api.post('/players', data);
export const updatePlayer = (id, data) => api.put(`/players/${id}`, data);
export const deletePlayer = (id) => api.delete(`/players/${id}`);

// Similarly for teams, competitions, matches...
