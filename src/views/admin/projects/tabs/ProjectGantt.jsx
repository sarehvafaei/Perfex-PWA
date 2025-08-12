import React, { useEffect, useState } from "react";
//import { getProjectGantt } from "api/projects";

export default function ProjectGantt({ projectId }) {
  const [milestones, setGantt] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectGantt(projectId);
      setGantt(data.milestones || []);
    } catch (err) {
      console.error("Error loading milestones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  if (loading) return <p>Loading Gantt...</p>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Gantt</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Gantt</th>
              <th className="px-4 py-2 text-left border border-gray-200">Order</th>
              <th className="px-4 py-2 text-left border border-gray-200">Progress</th>
            </tr>
          </thead>
          <tbody>
            {milestones.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              milestones.map((m) => (
                <tr key={m.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.milestone_order}</td>
                  <td className="px-4 py-2 w-48">
                    <MilestoneProgress value={m.progress} />
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