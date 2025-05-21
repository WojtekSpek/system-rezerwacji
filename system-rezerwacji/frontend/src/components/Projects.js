import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProgressCircle, Button, Dialog, Toast } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";
import { useUpdateData } from "../hooks/useUpdateData";

import urlProvider from "../urlProvider";


function Projects({ setView, setSelectedProject }) {
  
  const [newProjectName, setNewProjectName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([]); // Nowy stan dla zaznaczonych typów
  
   const [showAddForm, setShowAddForm] = useState(false);
   //@1 const [isLoading, setIsLoading] = useState(true); // Dodaj isLoading do stanu
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();
  // const API_BASE_URL = "https://system-rezerwacji-1.onrender.com";
 /*  @1, @2 useEffect(() => {
    setIsLoading(true);
    fetchProjects();
    fetchUser();
    fetchTrainingTypes();
    setIsLoading(false)
  }, []); */

  const Skeleton = () => (
    <div>
      <div className="skeleton w-3/4"></div>
      <div className="skeleton w-1/2"></div>
      <div className="skeleton w-full"></div>
    </div>
  );
  


  const navigate = useNavigate();

  const handleViewDetails = (project) => {
    setSelectedProject(project); // Ustaw wybrany projekt w stanie
    navigate(`/projects/${project.id}/details`); // Nawiguj do szczegółów projektu
    console.log('projec',project)
  };


  // Pobiera lista projektów
const fetchProjects = async () => {   
  const response = await axios.get(`${API_BASE_URL}/projects`);
  if (!response.data.success) {
    throw(new Error("Błąd podczas pobierania projektów:"));
  }
  
  return response.data.projects;
};

const { data: projects = [], 
  isLoading: isLoadingProjects, 
  isError: isErrorLoadingProjects,
  error: errorLoadingProjects } = useQuery({
  queryKey: ["projects"], 
  queryFn: () => fetchProjects(),
});

if (isErrorLoadingProjects) {
  console.log("Błąd podczas pobierania projektów:", errorLoadingProjects);
}


  /*
   @1 const addProject = async () => {
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
   */

  let toasterState = useRef('');
        
  const addProject = async () => {
    if (!newProjectName) {
      throw new Error("Podaj nazwę projektu!");
    }      
      
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/addProject`, {
        name: newProjectName,
        trainingTypes: selectedTrainingTypes, // Przekazanie zaznaczonych typów szkoleń
        createdBy: user?.username,
      });

      if (response.data.success) {
        setSuccessMessage("Projekt został dodany!");
        setNewProjectName("");
        setSelectedTrainingTypes([]); // Zresetuj zaznaczone typy
      }
    } 
    catch (error) {
      console.error("Błąd podczas dodawania projektu:", error);
      throw new Error("Błąd podczas dodawania projektu:", error.response.data);
    }
    
  };
    
  const addProjectOptimistic = (oldData, values, queryKey) => {
    const newProject = {
      name: values?.name, 
      trainingTypes: [...values?.trainingTypes],
      createdBy: user?.username,
    };
    console.log("Optimistic addProjectOptimistic", {oldData, values, newProject});
    if (values === undefined) {
      console.warn("addProjectOptimistic values are: undefined");
      return oldData;
    }
    
    return [...oldData, {...newProject}];
  };

  const addProjectMutation = useUpdateData(
    ["projects"], // klucz stanu 
    async ({name, trainingTypes}) => await addProject({name, trainingTypes}), // funkcja aktualizująca dane w bazie   
    addProjectOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa zapisywanie Projektu..." },
      success: { description: "Dane Projektu zostały zaktualizowane!" },
      error: { description: "Błąd podczas zapisywania danych projektu." } 
    },
    toasterState,
  );
 // KONIEC @1
 /* @2
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
  }; */

  const removeProject = async ({projectId}) => {  
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
        withCredentials: true,
      });
      
      if (!response.data.success) {
        throw (new Error("Błąd podczas usuwania projektu: ", response.error));
      }

      return response;
    } 
    catch (error) {
      console.error("Błąd podczas usuwania projektu:", error);
      throw (new Error("Błąd podczas usuwania projektu:", error.message));
    }

  };

  const removeProjectOptimistic = (oldData, values, queryKey) => {
    const projectId = values?.projectId;
    console.log("Optimistic removeProjectOptimistic", {oldData, values, projectId});
    if (values === undefined) {
      console.warn("removeProjectOptimistic values are: undefined");
      return oldData;
    }
  
    const newProjektList = oldData?.filter( item => item.id !== projectId );
    
    return newProjektList;
  };

  const removeProjektMutation = useUpdateData(
    ["projects"], // klucz stanu 
    async (projectId) => await removeProject(projectId), // funkcja aktualizująca dane w bazie   
    removeProjectOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa usuwanie prjektu..." },
      success: { description: "Projekt zostały usunięty!" },
      error: { description: "Błąd podczas usuwania projektu." } 
    },
    toasterState,
  );

  // koniec @2
  // Pobiera listę typów szkoleń
    const fetchTrainingTypes = async () => {   
      const response = await axios.get(`${API_BASE_URL}/trainers/Types`, {
        withCredentials: true,
      });
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania typów szkoleń"));
      }
      
      return response.data.data;
    };
    
    const { data: trainingTypes = [],
        isLoading: isLoadingTrainingTypes,
        isError: isErrorLoadingTrainingTypes,
        error: errorLoadingTrainingTypes } = useQuery({
      queryKey: ["trainingTypes"], 
      queryFn: () => fetchTrainingTypes(),
    });
        
    if (isErrorLoadingTrainingTypes) {
      console.log("Błąd podczas pobierania typów szkoleń:", errorLoadingTrainingTypes)
    }

    const handleTrainingTypeChange = (typeId) => {
      setSelectedTrainingTypes((prevSelected) =>
        prevSelected.includes(typeId)
          ? prevSelected.filter((id) => id !== typeId) // Usuń typ, jeśli był zaznaczony
          : [...prevSelected, typeId] // Dodaj typ, jeśli nie był zaznaczony
      );
    };

   // Przechowuj dane użytkownika
const fetchUser = async () => {   
  const response = await axios.get(`${API_BASE_URL}/users/session`, {
    withCredentials: true,
  });
  if (!response.data.success) {
    throw(new Error("Błąd podczas pobierania sesji"));
  }
  
  console.log("Otrzymane dane użytkownika:", response.data.user); // Ustaw dane użytkownika
  return response.data.user;
};

const { data: user = null,
    isLoading: isLoadingUser,
    isError: isErrorLoadingUser,
    error: errorLoadingUser } = useQuery({
  queryKey: ["user"], 
  queryFn: () => fetchUser(),
});
    
if (isErrorLoadingUser) {
  console.log("Błąd podczas pobierania sesji:", errorLoadingUser)
}

    if ( isLoadingUser 
      || isLoadingTrainingTypes 
      || isLoadingProjects ) { 
      return (<div className="flex items-center justify-center h-screen">
          <ProgressCircle.Root value={null} size="sm">
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        </div>);
    }

    return (
      <div className="p-4 w-full">
        <Toaster />
        {isLoadingProjects ? (
          <Skeleton />
        ) : !showAddForm ? (
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
                      Utworzony przez: {project.created_by} |{" "}
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Szczegóły
                    </button>
                    {/* <button
                      
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Usuń
                    </button> */
                    <Dialog.Root role="alertdialog" size="sm">
                    <Dialog.Trigger asChild>
                      <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Usuń
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title size="sm">Usuwanie Projektu</Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body size="sm">
                            <p>
                            Czy na pewno chcesz usunąć projekt: {project.name}?
                            </p>
                          </Dialog.Body>
                          <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                              <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              > Anuluj</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild >
                              <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => {                                  
                                  removeProjektMutation.mutate({
                                    toasterSuffix: ['remove', 'project'], 
                                    projectId: project.id,
                                  });
                                }}
                                > Usuń</Button>
                            </Dialog.ActionTrigger>    
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Dialog.Root>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>
            <div className="bg-gray-100 p-4 rounded mb-4">
              {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
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
              </div>
            </div>
    
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Anuluj
              </button>
              {/* <button
                onClick={addProject}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Zapisz
              </button> */
              <button
                onClick={() => { 
                  addProjectMutation.mutate({
                    toasterSuffix: ['add', 'project'],
                    trainingTypes: selectedTrainingTypes,
                    name: newProjectName,                    
                  });
                  }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Zapisz
            </button>}
            </div>
          </div>
        )}
      </div>
    );
    
  }
  

export default Projects;
