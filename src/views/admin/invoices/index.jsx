import React, { useEffect, useState } from "react";
import { getInvoices } from "api/projects";
import { columnsDataDevelopment } from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";

const Statuses = [
  { id: 1, label: "Unpaid", color: "#ef4444", bg: "#f8f8f9" },
  { id: 2, label: "Paid", color: "#16a34a", bg: "#f6f9fe" },
  { id: 3, label: "Partially Paid", color: "#ca8a04", bg: "bg-orange-100" },
  { id: 4, label: "Overdue", color: "#ca8a04", bg: "#f6fcf8" },
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

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  //const [statusMap, setStatusMap] = useState({});
  //const [statusColors, setStatusColors] = useState({});

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const data = await getInvoices();

        // If backend sends the maps along with invoices
        //if (invoices.status_label) {
          //setStatusMap(invoices.status_label);
        //}
        //if (invoices.status_color) {
          //setStatusColors(invoices.status_color);
        //}

        setInvoices(data.invoices || []);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    }
    fetchInvoices();
  }, []);

  // Calculate counts for each status
  const summary = {
    1: invoices.filter((i) => i.status_id === 1).length, // Unpaid
    2: invoices.filter((i) => i.status_id === 2).length, // Paid
    3: invoices.filter((i) => i.status_id === 3).length, // Partially Paid
    4: invoices.filter((i) => i.status_id === 4).length, // Overdue
  };

  // Calculate counts for each status
  //const summary = Object.keys(statusMap).reduce((acc, id) => {
    //acc[id] = projects.filter((p) => p.status_id === id).length;
    //return acc;
  //}, {});

  return (
    <div>
      <div className="mb-5 mt-5 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Invoices Summary
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
          Invoices
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
