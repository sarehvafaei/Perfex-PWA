import axios from 'axios';

const API_BASE = 'https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/project_files';

export const getProjects = async () => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.projects;
};

export const getProjectDetails = async (id) => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/project_details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.project;
};

export const getProjectTasks = async (id) => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTaskDetails = async (taskId) => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/task_details/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const uploadTaskFile = async (taskId, file) => {
  const formData = new FormData();
  formData.append("task_id", taskId);
  formData.append("file", file);
  const res = await axios.post(`${API_BASE}/task_upload/${taskId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
  return res.data;
};

export const getProjectMilestones = async (id) => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`${API_BASE}/milestones/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};