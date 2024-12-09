import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectDetails from "./ProjectDetails";

function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects", {
        withCredentials: true, // Włącz przesyłanie ciasteczek
      });
      if (response.data.success) {
        setProjects(response.data.projects);
        console.log(setProjects);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania projektów:", error);
    }
  };

  const addProject = async () => {
    if (!newProjectName) {
      alert("Podaj nazwę projektu!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addProject", {
        name: newProjectName,
        createdBy: user?.name, // Przekazanie nazwy użytkownika
      });

      if (response.data.success) {
        setSuccessMessage("Projekt został dodany!");
        fetchProjects(); // Odśwież listę projektów
        setNewProjectName(""); // Wyczyść pole formularza
      }
    } catch (error) {
      console.error("Błąd podczas dodawania projektu:", error);
    }
  };

  return (
    <div className="p-4 w-full">
    {selectedProject ? (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    ) : (
      <>
        <h2 className="text-2xl font-bold mb-4">Projekty</h2>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="text-xl font-semibold mb-4">Dodaj projekt</h3>
          <input
            type="text"
            placeholder="Nazwa projektu"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            onClick={addProject}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Zapisz projekt
          </button>
          {successMessage && (
            <div className="text-green-500 mt-2">{successMessage}</div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-4">Lista projektów</h3>
        <ul>
          {projects.map((project) => (

            <li
              key={project.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded mb-2 shadow hover:shadow-md"
            >
              <div>
                <span
                  className="text-lg text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </span>
                <div className="text-sm text-gray-500">
                  Utworzony przez: {project.created_by} | {project.created_at}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Edytuj
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
  );
  
}

export default Projects;
