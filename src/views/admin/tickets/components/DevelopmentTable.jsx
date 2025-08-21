import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "api/projects";

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

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getTickets();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    }
    fetchTickets();
  }, []);

  const columns = [
    columnHelper.accessor("ticketid", {
      header: "Ticket #",
      cell: (info) => (
        <Link
          to={`/admin/ticket/${info.row.original.id}`}
          className="text-sm font-bold text-navy-700 underline hover:text-blue-600 dark:text-white"
        >
          #{info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("contact", {
      header: "Contact",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("department", {
      header: "Department",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("project_name", {
      header: "Project",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("service", {
      header: "Service",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("status_label", {
      header: "Status",
      cell: (info) => (
        <span className="text-xs font-medium px-2 py-1 rounded-full">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("lastreply", {
      header: "Last Reply",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
  ];

  const table = useReactTable({
    data: tickets,
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
