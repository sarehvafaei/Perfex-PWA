import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "api/projects";

import Card from "components/card";
import ProjectOverview from "./tabs/ProjectOverview";
import ProjectTasks from "./tabs/ProjectTasks";
import ProjectTimesheets from "./tabs/ProjectTimesheets";
import ProjectMilestones from "./tabs/ProjectMilestones";
import ProjectFiles from "./tabs/ProjectFiles";
import ProjectDiscussions from "./tabs/ProjectDiscussions";
import ProjectGantt from "./tabs/ProjectGantt";

export default function SingleProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getProjectDetails(id);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project', err);
      }
    }
    fetch();
  }, [id]);

  const allTabs = [
    { key: "overview", label: "Overview", component: <ProjectOverview project={project} /> },
    { key: "tasks", label: "Tasks", component: <ProjectTasks projectId={id} />, permission: "view_tasks" },
    { key: "timesheets", label: "Timesheets", component: <ProjectTimesheets projectId={id} />, permission: "view_timesheets" },
    { key: "milestones", label: "Milestones", component: <ProjectMilestones projectId={id} />, permission: "view_milestones" },
    { key: "files", label: "Files", component: <ProjectFiles projectId={id} />, permission: "upload_files" },
    { key: "discussions", label: "Discussions", component: <ProjectDiscussions projectId={id} />, permission: "open_discussions" },
    { key: "gantt", label: "Gantt", component: <ProjectGantt projectId={id} />, permission: "view_gantt" },
  ];

  const visibleTabs = allTabs.filter(tab => {
    if (!tab.permission) return true; // always show if no permission required
    return project?.permissions?.available_features?.[tab.permission] === "1";
  });

  return (
    <Card extra="w-full h-full sm:overflow-auto">
      <header className="relative flex items-center justify-between pt-4 bg-white-light-1 overflow-x-auto">
        <div className="font-bold text-navy-700 dark:text-white">
          <div className="p-4">

            {/* Tabs */}
            <div className="flex space-x-4">
              {visibleTabs.map(tab => (
                <div
                  key={tab.key}
                  className={`pb-2 cursor-pointer ${activeTab === tab.key ? "border-b-2 border-blue-500 font-bold" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <div className="p-4">
        {visibleTabs.find(tab => tab.key === activeTab)?.component}
      </div>
    </Card>
  );
}
