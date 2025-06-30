import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/api/project_files/upload', // Replace with actual Perfex API endpoint
  headers: {
    Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual API key
  },
});

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await API.post('/upload', formData);
};
