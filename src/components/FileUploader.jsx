import React, { useState } from 'react';
import { uploadFile } from '../api/upload';

export default function FileUploader() {
  const [projectId, setProjectId] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!projectId || !file) {
      setStatus('Select a project ID and a file first.');
      return;
    }

    setStatus('Uploading...');
    try {
      await uploadFile(projectId, file);
      setStatus('Upload successful!');
    } catch (error) {
      console.error(error);
      setStatus('Upload failed.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <input type="text" placeholder="Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full px-2 py-1 border rounded" inputMode="numeric" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full px-2 py-1 border rounded" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
      >
        Upload File
      </button>
      <p className="text-sm text-gray-700">{status}</p>
    </div>
  );
}
