import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yourperfexcrm.com/api';
const API_KEY = 'YOUR_API_KEY'; // Store securely in env for production!

function App() {
  const [projectId, setProjectId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const uploadFile = async () => {
    if (!projectId || !file) {
      setMessage('Select a project ID and a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'Uploaded from React PWA');

    try {
      const res = await axios.post(
        `${API_BASE}/projects/${projectId}/upload_file`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Upload failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Perfex Project File Upload</h1>

      <input
        type="text"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        style={styles.input}
        inputMode="numeric"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />

      <button onClick={uploadFile} style={styles.button}>Upload File</button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    fontSize: 18,
    borderRadius: 4,
    cursor: 'pointer',
  },
  message: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
};

export default App;
