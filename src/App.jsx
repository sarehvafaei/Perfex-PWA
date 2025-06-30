import React from 'react';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Perfex PWA File Uploader</h1>
      <FileUploader />
    </div>
  );
}

export default App;
