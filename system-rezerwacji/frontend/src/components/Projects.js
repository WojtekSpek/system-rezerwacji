import React, { useState, useEffect } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const supportLabels = ["Psycholog", "Doradca zawodowy", "Szkolenie zawodowe"];
  const [newProject, setNewProject] = useState({
    name: "",
    supports: supportLabels.map(() => ({ type: "", hours: 0 })), // Inicjalizacja z pustymi obiektami
  });
  const [projectName, setProjectName] = useState(""); // Nazwa projektu
  const [supportTypes, setSupportTypes] = useState([]); // Typy wsparcia
  const [trainers, setTrainers] = useState([]); // Lista kadry
  const [participants, setParticipants] = useState([]); // Lista uczestników
  


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania projektów:", error);
    }
  };

  const addProject = async () => {
    console.log("Dane projektu przed walidacją:", newProject);
    console.log("Zawartość supports1:", !newProject.name);
    console.log("Zawartość supports2:", !Array.isArray(newProject.supportTypes));
    console.log("Zawartość supports3:", newProject.supports);

    if (!newProject.name ||  !newProject.supports.some((hours) => hours > 0)) {
      alert("Wypełnij nazwę projektu i dodaj co najmniej jeden typ wsparcia!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/AddProject", newProject);
  
      if (response.data.success) {
        alert("Projekt zapisany!");
        setNewProject({
          name: "",
          supportTypes: [],
          trainers: [],
          participants: [],
        });
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania projektu:", error);
    }
  };
  
  const handleSupportChange = (index, value) => {
    const updatedSupports = [...newProject.supports];
    updatedSupports[index] = value;
    setNewProject({ ...newProject, supports: updatedSupports });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projekty</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          Dodaj nowy
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="text-xl font-bold mb-2">Dodaj nowy projekt</h3>
          <input
            type="text"
            placeholder="Nazwa projektu"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <h4 className="text-lg font-bold mb-2">Typy wsparcia:</h4>
          {supportLabels.map((label, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
                <span>{label}</span>
                <input
                type="number"
                placeholder="Liczba godzin"
                className="border border-gray-300 p-2 rounded w-20"
                value={newProject.supports[index]?.hours || ""}
                onChange={(e) => {
                    const updatedSupports = [...newProject.supports];
                    updatedSupports[index] = {
                      ...(updatedSupports[index] || { type: label }), // Tworzenie nowego obiektu, jeśli nie istnieje
                      hours: parseInt(e.target.value, 10) || 0,
                    };
                    setNewProject({ ...newProject, supports: updatedSupports });
                  }}
                />
            </div>
            ))}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addProject}
          >
            Zapisz
          </button>
        </div>
      )}

      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex justify-between items-center p-2 bg-gray-200 mb-2 rounded"
          >
            <span>{project.name}</span>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              onClick={() => console.log("Edytuj projekt", project.id)}
            >
              ⚙️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
