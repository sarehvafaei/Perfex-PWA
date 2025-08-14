import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInvoices } from "api/projects";

import Card from "components/card";
//import CardMenu from "components/card/CardMenu";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TaskStatusBadge = ({ label, color }) => {
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
  const [invoices, setInvoices] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getInvoices();
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    }
    fetchProjects();
  }, []);

  const columns = [
    columnHelper.accessor("formatted_number", {
      header: "Invoice #",
      cell: (info) => (
        <Link
          to={`/admin/invoice/${info.row.original.id}`}
          className="text-sm font-bold text-navy-700 underline hover:text-blue-600 dark:text-white"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("duedate", {
      header: "Due Date",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("total", {
      header: "Amount",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: invoices,
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
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-xs text-gray-600 font-semibold pb-2 pr-4 cursor-pointer"
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
