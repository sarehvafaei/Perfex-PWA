import React, { useEffect, useState } from "react";
import { getProjectTickets } from "api/projects";

export default function ProjectTickets({ projectId }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectTickets(projectId);
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  if (loading) return <div className="p-4"><p>Loading Tickets...</p></div>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Tickets</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Ticket #</th>
              <th className="px-4 py-2 text-left border border-gray-200">Subject</th>
              <th className="px-4 py-2 text-left border border-gray-200">Contact</th>
              <th className="px-4 py-2 text-left border border-gray-200">Department</th>
              <th className="px-4 py-2 text-left border border-gray-200">Project</th>
              <th className="px-4 py-2 text-left border border-gray-200">Service</th>
              <th className="px-4 py-2 text-left border border-gray-200">Priority</th>
              <th className="px-4 py-2 text-left border border-gray-200">Status</th>
              <th className="px-4 py-2 text-left border border-gray-200">Last Reply</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.ticketid} className="border-t border-gray-200">
                  <td className="px-4 py-2">#{t.ticketid}</td>
                  <td className="px-4 py-2">{t.subject}</td>
                  <td className="px-4 py-2">{t.contact}</td>
                  <td className="px-4 py-2">{t.department}</td>
                  <td className="px-4 py-2">{t.project_name}</td>
                  <td className="px-4 py-2">{t.service}</td>
                  <td className="px-4 py-2">{t.priority}</td>
                  <td className="px-4 py-2">{t.status_label}</td>
                  <td className="px-4 py-2">{t.lastreply}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}