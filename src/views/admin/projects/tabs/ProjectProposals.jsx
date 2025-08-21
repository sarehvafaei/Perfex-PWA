import React, { useEffect, useState } from "react";
import { getProjectProposals } from "api/projects";

export default function ProjectProposals({ projectId }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectProposals(projectId);
      setProposals(data.proposals || []);
    } catch (err) {
      console.error("Error loading proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  if (loading) return <div className="p-4"><p>Loading Proposals...</p></div>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Proposals</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Proposal #</th>
              <th className="px-4 py-2 text-left border border-gray-200">Subject</th>
              <th className="px-4 py-2 text-left border border-gray-200">Total</th>
              <th className="px-4 py-2 text-left border border-gray-200">Open Till</th>
              <th className="px-4 py-2 text-left border border-gray-200">Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              proposals.map((p) => (
                <tr key={p.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.subject}</td>
                  <td className="px-4 py-2">{p.total}</td>
                  <td className="px-4 py-2">{p.open_till}</td>
                  <td className="px-4 py-2">{p.date}</td>
                  <td className="px-4 py-2">{p.status_label}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}