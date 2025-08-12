import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getProjectDetails, getProjectTasks } from "api/projects";

export default function ProjectOverview() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getProjectDetails(id);
        setProject(data);

        const taskData = await getProjectTasks(id);
        setTasks(taskData.tasks);
      } catch (err) {
        console.error('Failed to load project', err);
      }
    }
    fetch();
  }, [id]);

  if (project === null) return <div>Loading Overview...</div>;
  if (project?.error) return <div>Error loading project.</div>;

  const deadline = project?.deadline ? new Date(project.deadline) : null;
  const start = project?.start_date ? new Date(project.start_date) : null;

  let daysLeft = 0;
  let totalDays = 0;
  let progress = 0;

  if (deadline && start) {
    daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
    totalDays = Math.ceil((deadline - start) / (1000 * 60 * 60 * 24));
    progress = Math.min(100, Math.max(0, 100 - (daysLeft / totalDays) * 100));
  }

  {!deadline || !start ? (
    <p className="text-red-500">Project dates are incomplete.</p>
  ) : (
    <p>Progress: {progress.toFixed(2)}%</p>
  )}

  return (
    <div className="mt-8 mb-8 overflow-x-auto px-6">
      <h3 className="text-xl font-bold mb-4">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="mb-2"><strong>Project ID:</strong> #{project.id}</p>
          <p className="mb-2"><strong>Billing Type:</strong> {project.billing_type}</p>
          <p className="mb-2"><strong>Status:</strong> {project.status}</p>
          <p className="mb-2"><strong>Start Date:</strong> {project.start_date}</p>
          {project?.deadline && (
            <p className="mb-2"><strong>Deadline:</strong> {project.deadline}</p>
          )}
          {project?.date_finished && (
            <p className="mb-2"><strong>Completed Date:</strong> {project.date_finished}</p>
          )}
          {project?.total_logged_hours ? (
            <p className="mb-2"><strong>Total Logged Hours:</strong> {project.total_logged_hours.hours}:{project.total_logged_hours.minutes}</p>
          ) : (
            <p className="mb-2">'00:00'</p>
          )}
          <p className="mb-2"><strong>Service Type:</strong> {project.service_type}</p>
        </div>
        <div>

          {/* Project Progress */}
          <div className="mb-4 w-full items-center justify-between rounded-2xl bg-white-light p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Project Progress</span>
              <span className="text-sm mt-1">{progress.toFixed(2)}%</span>
            </div>   
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
            </div>    
          </div>
          
          {/* Open Tasks */}
          <div className="mb-4 w-full items-center justify-between rounded-2xl bg-white-light p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="mb-2">
              {tasks.length === 0 ? (
              <h3 className="text-lg font-semibold">0 / {tasks.length} Open Tasks</h3>
            ) : (  
              <h3 className="text-lg font-semibold">0 / {tasks.length} Open Tasks</h3>
            )}
            </div>
            <div className="mb-2">
              <p className="text-sm">{progress.toFixed(2)}%</p>
            </div>   
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
            </div> 
          </div>

          {/* Days Left */}
          <div className="mb-4 w-full items-center justify-between rounded-2xl bg-white-light p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="font-semibold">Days Left</p>
            <p>{daysLeft} / {Math.ceil(totalDays)} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
