import React from "react";

const STEPS = [
  { id: 1, label: "Not Started", color: "text-gray-700", bg: "bg-gray-100" },
  { id: 2, label: "In Progress", color: "text-blue-700", bg: "bg-blue-100" },
  { id: 3, label: "On Hold", color: "text-orange-700", bg: "bg-orange-100" },
  { id: 4, label: "Cancelled", color: "text-red-700", bg: "bg-red-100" },
  { id: 5, label: "Finished", color: "text-green-700", bg: "bg-green-100" },
];

export default function StatusSteps({ summary }) {
  return (
    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {STEPS.map((status) => (
        <div
          key={status.id}
          className={`p-4 rounded-xl shadow-sm flex flex-col items-center`}
        >
          <span className={`text-sm font-semibold ${status.color}`}>
            {status.label}
          </span>
          <span className="text-xl font-bold mt-1">
            {summary[status.id] || 0}
          </span>
        </div>
      ))}
    </div>
  );
}  