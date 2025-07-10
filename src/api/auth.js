import axios from 'axios';

const API_BASE = 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/api/Pwa_authentication';

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// ⬇️ Login endpoint
export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);

  const res = await API.post('/login', formData);
  return res.data;
};

// ⬇️ Authenticated API instance
export const getAuthAPI = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    baseURL: API_BASE,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Example protected request (optional helper)
export const getProjects = async () => {
  const api = getAuthAPI();
  const res = await api.get('/projects');
  return res.data;
};

// You can add more authenticated actions here like upload, etc.
