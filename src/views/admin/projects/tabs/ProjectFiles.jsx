import React, { useEffect, useState } from "react";
import { getProjectFiles, uploadProjectFile } from "api/files";

export default function ProjectFiles({ projectId }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const data = await getProjectFiles(projectId);
      setFiles(data.files || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadProjectFile(projectId, file);
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
        <h3 className="text-xl font-bold mb-4">Files</h3>
        <div className="">
            <div className="border border-dashed p-4 mb-4 text-center text-blue-600">
                <label className="cursor-pointer">
                Drop files here or click to upload
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                />
                </label>
            </div>
            <table className="w-full text-sm">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-3 py-2 text-left border border-gray-200">Filename</th>
                    <th className="px-3 py-2 text-left border border-gray-200">File Type</th>
                    <th className="px-3 py-2 text-left border border-gray-200">Date Uploaded</th>
                </tr>
                </thead>
                <tbody>
                {files.length === 0 ? (
                    <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                        No entries found
                    </td>
                    </tr>
                ) : (
                    files.map((file) => (
                    <tr key={file.id} className="border-t border-gray-200">
                        <td className="px-3 py-2">{file.file_name}</td>
                        <td className="px-3 py-2">{file.filetype}</td>
                        <td className="px-3 py-2">{file.dateadded}</td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
