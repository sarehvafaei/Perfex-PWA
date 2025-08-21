import React, { useEffect, useState } from "react";
import { getTickets } from "api/projects";
import { columnsDataDevelopment } from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";

const Statuses = [
  { id: 1, label: "Open", color: "#ff2d42", bg: "#f8f8f9" },
  { id: 2, label: "In Progress", color: "#22c55e", bg: "#f6f9fe" },
  { id: 3, label: "Answered", color: "#2563eb", bg: "bg-orange-100" },
  { id: 4, label: "On Hold", color: "#64748b", bg: "#f6fcf8" },
  { id: 5, label: "Closed", color: "#03a9f4", bg: "bg-green-100" },
];

const StatusBadge = ({ label, color }) => {
  const bg = color ? `${color}22` : undefined; // transparent background
  return (
    <span
      className="text-sm font-semibold"
      style={{ color: color || "#374151" }}
    >
      {label}
    </span>
  );
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  //const [statusMap, setStatusMap] = useState({});
  //const [statusColors, setStatusColors] = useState({});

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getTickets();

        // If backend sends the maps along with tickets
        //if (tickets.status_label) {
          //setStatusMap(tickets.status_label);
        //}
        //if (tickets.status_color) {
          //setStatusColors(tickets.status_color);
        //}

        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    }
    fetchTickets();
  }, []);

  // Calculate counts for each status
  const summary = {
    1: tickets.filter((t) => t.status_id === 1).length, // Not Started
    2: tickets.filter((t) => t.status_id === 2).length, // In Progress
    3: tickets.filter((t) => t.status_id === 3).length, // On Hold
    4: tickets.filter((t) => t.status_id === 4).length, // Cancelled
    5: tickets.filter((t) => t.status_id === 5).length, // Finished
  };

  // Calculate counts for each status
  //const summary = Object.keys(statusMap).reduce((acc, id) => {
    //acc[id] = tickets.filter((t) => t.status_id === id).length;
    //return acc;
  //}, {});

  return (
    <div>
      <div className="mb-5 mt-5 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Tickets Summary
        </h4>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">      
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Statuses.map((status) => (
            <div
              key={status.id}
              className={`p-4 rounded-md bg-white shadow-sm flex flex-col items-center`}
            >
              {/* Status badge */}
              <StatusBadge label={status.label} color={status.color} />

              {/* Count */}
              <span className="text-sm font-semibold mt-2">
                {summary[status.id] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="mb-5 mt-8 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Support Tickets
        </h4>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </div>
    </div>
  );
}
