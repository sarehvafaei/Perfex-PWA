import React, { useEffect, useState } from "react";
import { getProjects } from "api/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <ul className="mt-2">
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <strong>{project.name}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
