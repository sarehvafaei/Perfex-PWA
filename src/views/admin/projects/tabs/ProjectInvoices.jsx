import React, { useEffect, useState } from "react";
import { getProjectInvoices } from "api/projects";

export default function ProjectInvoices({ projectId }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProjectInvoices(projectId);
      setInvoices(data.invoices || []);
    } catch (err) {
      console.error("Error loading invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  if (loading) return <div className="p-4"><p>Loading Invoices...</p></div>;

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Invoices</h3>
      <div className="">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">Invoice #</th>
              <th className="px-4 py-2 text-left border border-gray-200">Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Due Date</th>
              <th className="px-4 py-2 text-left border border-gray-200">Amount</th>
              <th className="px-4 py-2 text-left border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              invoices.map((i) => (
                <tr key={i.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{i.formatted_number}</td>
                  <td className="px-4 py-2">{i.date}</td>
                  <td className="px-4 py-2">{i.duedate}</td>
                  <td className="px-4 py-2">{i.total}</td>
                  <td className="px-4 py-2">{i.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}