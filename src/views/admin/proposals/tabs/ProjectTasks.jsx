import React, { useEffect, useState } from "react";
import { getProjectTasks, getTaskDetails } from "api/projects";
import TaskModal from "./TaskModal";

const TaskStatusBadge = ({ label, color }) => {
  const bg = color ? `${color}22` : undefined; // add transparency
  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: bg, color: color || "#374151", border: `1px solid ${color || "#d1d5db"}` }}
    >
      {label}
    </span>
  );
};

export default function ProjectTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectTasks(projectId);
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const openTaskModal = async (taskId) => {
    try {
      const data = await getTaskDetails(taskId);
      setSelectedTask(data.task);
    } catch (err) {
      console.error("Error fetching task details:", err);
    }
  };

  const closeTaskModal = () => setSelectedTask(null);

  useEffect(() => {
    load();
  }, [projectId]);

  if (loading) return <p>Loading Tasks...</p>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Tasks ({tasks.length})</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Name</th>
              <th className="px-4 py-2 text-left border border-gray-200">Start Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Due Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Status</th>
              <th className="px-4 py-2 text-left border border-gray-200">Milestone</th>
              <th className="px-4 py-2 text-left border border-gray-200">Billable</th>
              <th className="px-4 py-2 text-left border border-gray-200">Billed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t.id} className="border-t border-gray-200">
                  <td className="px-4 py-2 cursor-pointer" onClick={() => openTaskModal(t.id)}>{t.name}</td>
                  <td className="px-4 py-2">{t.startdate || "-"}</td>
                  <td className="px-4 py-2">{t.duedate || "-"}</td>
                  <td className="px-4 py-2">
                    <TaskStatusBadge label={t.status_label} color={t.status_color} />
                  </td>
                  <td className="px-4 py-2">
                    {t.milestone_name || "-"}
                  </td>
                  <td className="px-4 py-2">
                    {parseInt(t.billable) === 1 ? "Billable" : "Not Billable"}
                  </td>
                  <td className="px-4 py-2">
                    {parseInt(t.billed) === 1 ? "Billed" : "Not Billed"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Task Modal */}
      {selectedTask && <TaskModal task={selectedTask} onClose={closeTaskModal} />}
    </div>
  );
}
