import axios from 'axios';

const API_BASE = 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/project_files';

export const getProjects = async () => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.projects; // adjust based on your actual API response
};
