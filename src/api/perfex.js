//import axios from 'axios';

//const API = axios.create({
  //baseURL: 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/api/project_files', // Replace with actual Perfex API endpoint
  //headers: {
    //Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual API key
  //},
//});

//export const uploadFile = async (projectId, file) => {
  //const formData = new FormData();
  //formData.append('project_id', projectId);
  //formData.append('file', file);
  //return await API.post('/upload', formData);
//};


import axios from 'axios';

const API_BASE = 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/controllers'; // update this with your real path

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ⬇️ Login endpoint
export const login = async (email, password) => {
  const res = await API.post('/Authentication', {
    email,
    password,
  });
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
