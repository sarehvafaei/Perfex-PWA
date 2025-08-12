import Widget from "components/widget/Widget";
import React, { useEffect, useState } from "react";
import { getProjects} from "api/projects";
import { columnsDataDevelopment } from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [statusColors, setStatusColors] = useState({});

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();

        // If backend sends the maps along with projects
        if (projects.status_label) {
          setStatusMap(projects.status_label);
        }
        if (projects.status_color) {
          setStatusColors(projects.status_color);
        }

        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  // Calculate counts for each status
  //const summary = {
    //1: projects.filter((p) => p.status_id === 1).length, // Not Started
    //2: projects.filter((p) => p.status_id === 2).length, // In Progress
    //3: projects.filter((p) => p.status_id === 3).length, // On Hold
    //4: projects.filter((p) => p.status_id === 4).length, // Cancelled
    //5: projects.filter((p) => p.status_id === 5).length, // Finished
  //};

  // Calculate counts for each status
  const summary = Object.keys(statusMap).reduce((acc, id) => {
    acc[id] = projects.filter((p) => p.status_id === id).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-5 mt-5 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Projects Summary
        </h4>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">      
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(statusMap).map((id) => (
            <div
              key={id}
              className={`p-4 rounded-xl shadow-sm flex flex-col items-center`}
            >
              {/* Status badge */}
              <StatusBadge label={statusMap[id]} color={statusColors[id]} />

              {/* Count */}
              <span className="text-xl font-bold mt-1">
                {summary[id] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="mb-5 mt-8 flex items-center justify-between px-2">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Projects
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
