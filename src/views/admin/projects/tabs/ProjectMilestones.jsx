import React, { useEffect, useState } from "react";
import { getProjectMilestones } from "api/projects";

export default function ProjectMilestones({ projectId }) {
  const [milestones, setMilestones] = useState([]);
  const [loggedTime, setLoggedTime] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectMilestones(projectId);
      setMilestones(data.milestones || []);
      setLoggedTime(data.milestone_logged_time || {});
    } catch (err) {
      console.error("Error loading milestones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  const formatTime = (time) => {
    if (!time || time.hours === undefined || time.minutes === undefined) return "00:00";
    const { hours, minutes } = time;
    return `${hours}:${minutes}`;
  };

  if (loading) return <div className="p-4"><p>Loading Milestones...</p></div>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Milestones</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Name</th>
              <th className="px-4 py-2 text-left border border-gray-200">Description</th>
              <th className="px-4 py-2 text-left border border-gray-200">Start Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Due date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Logged Time</th>
            </tr>
          </thead>
          <tbody>
            {milestones.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              milestones.map((m) => (
                <tr key={m.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.description_visible_to_customer === '1' && m.description ? m.description : ''}</td>
                  <td className="px-4 py-2">{m.start_date}</td>
                  <td className="px-4 py-2">{m.due_date}</td>
                  <td className="px-4 py-2 w-48">{formatTime(loggedTime[m.id])}
                    {/* <MilestoneProgress value={m.progress} /> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MilestoneProgress({ value }) {
  const pct = Number(value) || 0;
  return (
    <div className="w-full bg-gray-200 rounded h-2">
      <div
        className="h-2 rounded bg-green-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}