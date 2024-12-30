import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects({ setView, setSelectedProject }) {
  const [projects, setProjects] = useState([]); // Lista projektów
  const [newProjectName, setNewProjectName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([]); // Nowy stan dla zaznaczonych typów
  const [trainingTypes, setTrainingTypes] = useState([]); // Lista typów szkoleń
  const [user, setUser] = useState(null); // Przechowuj dane użytkownika
   const [showAddForm, setShowAddForm] = useState(false);
   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProjects();
    fetchUser();
    fetchTrainingTypes();
    
  }, []);

  const navigate = useNavigate();

  const handleViewDetails = (project) => {
    setSelectedProject(project); // Ustaw wybrany projekt w stanie
    navigate(`/projects/${project.id}/details`); // Nawiguj do szczegółów projektu
    console.log('projec',project)
  };


  const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        
        if (response.data.success) {
          setProjects(response.data.projects);
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
        const response = await axios.post(`${API_BASE_URL}/projects/addProject`, {
          name: newProjectName,
          trainingTypes: selectedTrainingTypes, // Przekazanie zaznaczonych typów szkoleń
          createdBy: user?.username,
        });

        if (response.data.success) {
          setSuccessMessage("Projekt został dodany!");
          fetchProjects();
          setNewProjectName("");
          setSelectedTrainingTypes([]); // Zresetuj zaznaczone typy
        }
      } catch (error) {
        console.error("Błąd podczas dodawania projektu:", error);
      }
  };
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten projekt?")) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccessMessage("Projekt został usunięty!");
        fetchProjects(); // Odśwież listę projektów
      } else {
        alert(response.data.message || "Nie udało się usunąć projektu.");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania projektu:", error);
      alert("Błąd podczas usuwania projektu.");
    }
  };
    const fetchTrainingTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trainers/Types`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setTrainingTypes(response.data.data);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania typów szkoleń:", error);
      }
    };

    const handleTrainingTypeChange = (typeId) => {
      setSelectedTrainingTypes((prevSelected) =>
        prevSelected.includes(typeId)
          ? prevSelected.filter((id) => id !== typeId) // Usuń typ, jeśli był zaznaczony
          : [...prevSelected, typeId] // Dodaj typ, jeśli nie był zaznaczony
      );
    };
    const fetchUser = async () => {
      try {
        const response = await axios.get( `${API_BASE_URL}/users/session`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(response.data.user);
          console.log("Otrzymane dane użytkownika:", response.data.user); // Ustaw dane użytkownika
        }
      } catch (error) {
        console.error("Błąd podczas pobierania sesji:", error);
      }
    };
    return (
      <div className="p-4 w-full">
        {!showAddForm ? (
            <>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4">Projekty</h2>
                      <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                          Dodaj Projekt
                        </button>
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
                        onClick={() => handleViewDetails(project)}
                      >
                        {project.name}
                      </span>
                      <div className="text-sm text-gray-500">
                        Utworzony przez: {project.created_by} | {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                      onClick={() => handleViewDetails(project)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Szczegóły
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Usuń
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            
            </>
          ) : (

           <div><div className="bg-gray-100 p-4 rounded mb-4">
            {successMessage && (
                  <div className="text-green-500 mt-2">{successMessage}</div>
                )}
           <h3 className="text-xl font-semibold mb-4">Dodaj projekt</h3>
           <input
             type="text"
             placeholder="Nazwa projektu"
             value={newProjectName}
             onChange={(e) => setNewProjectName(e.target.value)}
             className="border border-gray-300 p-2 rounded w-full mb-4"
           />
           <h4 className="text-lg font-semibold mb-2">Typy szkoleń:</h4>
           <div className="flex flex-wrap gap-4">
             {trainingTypes.map((type) => (
               <label key={type.id} className="flex items-center gap-2">
                 <input
                   type="checkbox"
                   checked={selectedTrainingTypes.includes(type.id)}
                   onChange={() => handleTrainingTypeChange(type.id)}
                 />
                 {type.type}
               </label>
             ))}
           </div></div> 

           <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Anuluj
                    </button>
                    <button
                        onClick={addProject}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Zapisz
                    </button>
                </div>
           </div>
           
          )}
          
          </div>
    );
  }
  

export default Projects;
