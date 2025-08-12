import React, { useState } from "react";
import { uploadTaskFile } from "api/projects";

const TaskStatusBadge = ({ label, color }) => {
  const bg = color ? `${color}22` : "#e5e7eb";
  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: bg, color: color || "#374151" }}
    >
      {label}
    </span>
  );
};

export default function TaskModal({ task, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!task) return null;

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await uploadTaskFile(task.id, selectedFile);
      alert("File uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="fixed inset-0 bg-gray-s bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg min-w-[50vw] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">{task.name}</h2>
        <TaskStatusBadge label={task.status_label} color={task.status_color} />
        <p className="text-sm text-gray-600 mb-4">{task.description || "No description available."}</p>
        <div className="mb-8 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Status:</strong> {task.status_label}
                </p>
                <p>
                  <strong>Start Date:</strong> {task.startdate || "-"}
                </p>
                <p>
                  <strong>Due Date:</strong> {task.duedate || "-"}
                </p>
                <p>
                  <strong>Priority:</strong> {task.priority || "Normal"}
                </p>
                <p>
                  <strong>Milestone:</strong> {task.milestone_name || "-"}
                </p>
                <p>
                  <strong>Billable:</strong> {parseInt(task.billable) === 1 ? "Billable" : "Not Billable"}
                </p>
                <p>
                  <strong>Billed:</strong> {parseInt(task.billed) === 1 ? "Billed" : "Not Billed"}
                </p>
                
                {/* Checklist */}
                <div className="mb-4">
                  <p><strong>Checklist:</strong></p>
                  {task.checklist?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {task.checklist.map((c) => (
                        <li key={c.id}>{c.description}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No checklist items.</p>
                  )}
                </div>
              </div>
            </div>
            <div>

              {/* Assignees */}
              <div>
                <strong>Assignees:</strong>{" "}
                {task.assignees?.length > 0
                  ? task.assignees.map((a) => `${a.firstname} ${a.lastname}`).join(", ")
                  : "None"}
              </div>

              {/* Comments */}
              <div className="mb-4">
                <h3 className="font-semibold">Comments</h3>
                {task.comments?.length > 0 ? (
                  <ul className="space-y-2">
                    {task.comments.map((com) => (
                      <li key={com.id} className="text-sm border-b pb-1">
                        {com.content}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              {/* Time logged */}
              {task?.total_logged_time ? (
                <p className="mb-4">
                  <strong>Total logged time:</strong> {task.total_logged_time.hours}:{task.total_logged_time.minutes}
                </p>
              ) : (
                <p>{'00:00'}</p>
              )}

              {/* Attachments */}
              <div className="mb-4">
                <h3 className="font-semibold">Attachments</h3>
                {task.files?.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {task.files.map((f) => (
                      <li key={f.id}>
                        <a
                          href={`/client-portal/uploads/tasks/${task.id}/${f.file_name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          {f.file_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No attachments yet.</p>
                )}

                <div className="mt-3 flex gap-2">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <button
                    onClick={handleUpload}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
