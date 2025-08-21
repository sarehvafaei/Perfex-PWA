import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "api/projects";

import Card from "components/card";
//import CardMenu from "components/card/CardMenu";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const StatusBadge = ({ label, color }) => {
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

const columnHelper = createColumnHelper();

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: "Project",
      cell: (info) => (
        <Link
          to={`/admin/project/${info.row.original.id}`}
          className="text-sm font-bold text-navy-700 underline hover:text-blue-600 dark:text-white"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("start_date", {
      header: "Start Date",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("deadline", {
      header: "Deadline",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("billing_type", {
      header: "Billing Type",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("service_type", {
      header: "Service Type",
      cell: (info) => <p className="text-sm">{info.getValue() || "-"}</p>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className="text-xs font-medium px-2 py-1 rounded-full">
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  

  return (
    <Card extra="w-full h-full sm:overflow-auto">
      <div className="mt-8 mb-8 overflow-x-auto px-6">
        <table className="w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm border border-gray-200 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 pr-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
