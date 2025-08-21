import React, { useEffect, useState } from "react";
import { getProposals } from "api/projects";
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

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const data = await getProposals();
        setProposals(data.proposals || []);
      } catch (err) {
        console.error("Error fetching proposals:", err);
      }
    }
    fetchProposals();
  }, []);

  return (
    <div>
      {/* Table */}
      <div className="mb-5 mt-8 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Proposals
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
