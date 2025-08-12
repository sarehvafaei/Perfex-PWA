import axios from "axios";

const API_BASE = "https://wordpress-946960-5227163.cloudwaysapps.com/client-portal/api/project_files";

export const getProjectFiles = async (projectId) => {
  const res = await axios.get(`${API_BASE}/${projectId}`);
  return res.data;
};

export const uploadProjectFile = async (projectId, file) => {
  const formData = new FormData();
  formData.append("project_id", projectId);
  formData.append("file", file);
  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
