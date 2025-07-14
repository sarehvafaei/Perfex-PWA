import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "api/projects";

import Card from "components/card";
import CardMenu from "components/card/CardMenu";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
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
    <Card extra="w-full h-full sm:overflow-auto px-6">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Projects
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-auto">
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
