import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChakraProvider, Spinner } from "@chakra-ui/react";

function ProjectDetails({ onUpdate }) {
  const { id } = useParams(); // Pobiera ID projektu z URL
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(""); // Edytowana nazwa projektu
  const [editingHours, setEditingHours] = useState({}); // Bieżące edytowane godziny
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [editingGroupHours, setEditingGroupHours] = useState({}); // Bieżące edytowane godziny zajęć grupowych




  useEffect(() => {
    fetchAllTypes();
    fetchProject();
    
    fetchProjectTypes();
    fetchTrainingHours();
    fetchGroupHours(); // Dodano pobieranie godzin zajęć grupowych
    console.log('groupHours',groupHours)
    setShouldRefresh(false); // Resetuj flagę po odświeżeniu
  }, [id, shouldRefresh]);

  // Pobiera czas zajęć grupowych
  const fetchGroupHours = async (id) => {
    const response = await axios.get(`/group/${id}/group-training/hours`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania godzin zajęć grupowych"));        
      }
      
      console.log("Pobrane godziny zajęć grupowych:", response.data.groupHours);

      return response.data.groupHours;
  }; 


  const { data: groupHours = [],
    isLoading: isLoadingGroupHours, 
    isError: isErrorLoadingGroupHours,
    error: errorGroupHours } = useQuery({
    queryKey: ["groupHours", id, shouldRefresh],
    queryFn: () => fetchGroupHours(id),
  });

  if (isErrorLoadingGroupHours) {
    console.log("Błąd podczas pobierania godzin zajęć grupowych:", errorGroupHours);
  }
  

  const handleUpdateGroupHours = async (groupId, newHours) => {
    try {
      await axios.put(`/group/${id}/group-training/${groupId}`, {
        plannedHours: newHours,
      });
      fetchGroupHours(); // Odśwież dane
      alert("Godziny zajęć grupowych zostały zaktualizowane!");
    } catch (error) {
      console.error("Błąd podczas aktualizacji godzin zajęć grupowych:", error);
      alert("Nie udało się zaktualizować godzin zajęć grupowych.");
    }
  };

  
  // Pobiera pełną listę typów
  const fetchAllTypes = async () => {
    const url = "/projects/trainingTypes";
    console.log("Wysyłanie żądania do:", url);
    const response = await axios.get(url);
      if (!response.data.success) {
        
        throw(new Error("Błąd podczas pobierania godzin zajęć grupowych"));        
      }

      console.log("Pobrane wszystkie typy:", response.data.data);
      return response.data.data;
  }; 


  const { data: allTypes = [],
    isLoading: isLoadingAllTypes, 
    isError: isErrorLoadingAllTypes,
    error: errorAllTypes } = useQuery({
    queryKey: ["allTypes", id, shouldRefresh],
    queryFn: () => fetchAllTypes(),
  });

  if (isErrorLoadingAllTypes) {
    console.log("Błąd podczas pobierania godzin zajęć grupowych:", errorAllTypes);
  }


// Pobierz szczegóły projektu
const fetchProject = async () => { 
  const response = await axios.get(`/projects/${id}`);
    if (!response.data.success) {
      
      throw (new Error("Błąd podczas pobierania projektu"));        
    }

    console.log("Pobrane projekt:", response.data);
    return response.data.project;
}; 


const { data: project = {},
  isLoading: isLoadingProject, 
  isError: isErrorLoadingProject,
  error: errorProject } = useQuery({
  queryKey: ["project", id, shouldRefresh],
  queryFn: () => fetchProject(),
});

if (isErrorLoadingProject) {
  console.log("Błąd podczas pobierania projektu:", errorProject);
}

useEffect(() => {
  if (!project && project?.project_name) {
    setEditedName(() => project.project_name);
    console.log("editedName set:", project.project_name);
  }
}, [project, id, shouldRefresh]);


  console.log('project', project)

 
  // ID typów przypisanych do projektu 
  const fetchProjectTypes = async (id) => {
    const response = await axios.get(`/projects/project_training_types/${id}`);
      if (!response.data.success) {
        
        throw(new Error("Błąd podczas pobierania typów projektu"));        
      }

      console.log("Pobrane typy projektu:", response.data.types);
      return response.data.types.map((type) => ( type.id ));
  }; 


  const { data: editedTypes = [],
    isLoading: isLoadingEditedTypes, 
    isError: isErrorLoadinEditedTypes,
    error: errorEditedTypes } = useQuery({
    queryKey: ["editedTypes"],
    queryFn: () => fetchProjectTypes(id),
    initialData: [],
  });

  
  if (isErrorLoadinEditedTypes) {
    console.log("Błąd podczas pobierania typów projecktów:", errorEditedTypes);
  }

  const handleSave = async () => {
    try {
        const response = await axios.put(`/projects/updateProject/${id}`, {
            name: editedName,
            types: editedTypes,
        });

        if (response.data?.success) {
            alert("Zapisano zmiany!");
            await fetchProject(); // Pobierz aktualne dane projektu
            setIsEditing(false);
        } else {
            throw new Error("Odpowiedź serwera wskazuje na niepowodzenie");
        }
    } catch (error) {
        console.error("Błąd podczas zapisywania projektu:", error);
        alert("Nie udało się zapisać zmian.");
    }
};



// Pobierz planned_hours
const fetchTrainingHours = async (id) => {
  const response = await axios.get(`/projects/${id}/training-types/hours`);
    if (!response.data.success) {
      
      throw(new Error("Błąd podczas pobierania godzin zajęć"));        
    }

    return response.data.trainingHours;
}; 


const { data: trainingHours = [],
  isLoading: isLoadingTrainingHours, 
  isError: isErrorLoadinTrainingHours,
  error: errorTrainingHours } = useQuery({
  queryKey: ["trainingHours", id, shouldRefresh],
  queryFn: () => fetchTrainingHours(id),
});



if (isErrorLoadinTrainingHours) {
  console.log("Błąd podczas pobierania godzin zajęć:", errorTrainingHours);
}


// Aktualizuj planned_hours
const handleUpdateHours = async (typeId, newHours) => {
  console.log('(typeId, newHours)',(typeId, newHours))
  try {
    await axios.put(`/projects/${id}/training-types/${typeId}`, {
      plannedHours: newHours,
    });
    fetchTrainingHours(); // Odśwież dane
    alert("Godziny zostały zaktualizowane!");
  } catch (error) {
    console.error("Błąd podczas aktualizacji godzin:", error);
    alert("Nie udało się zaktualizować godzin.");
  }
};

const queryClient = useQueryClient();

const handleCheckboxChange = (typeId) => {
  queryClient.setQueryData(['editedTypes'], (oldTypes = []) =>
      oldTypes.includes(typeId)
        ? oldTypes.filter((id) => id !== typeId)
        : [...oldTypes, typeId]
    );    
  };


  if (isLoadingProject
      || isLoadingGroupHours 
      || isLoadingAllTypes 
      || isLoadingEditedTypes
      || isLoadingTrainingHours) {
   
    return <div className="flex items-center justify-center h-screen">
      <ChakraProvider>
        <Spinner
          size="lg"
          color="colorPalette.600"          
        />
      </ChakraProvider>
    </div>;
  }


  if (!project) {
    return <div>Brak danych projektu</div>;
  }

  return (
    <div>
      {/* Szczegóły projektu */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-2 shadow hover:shadow-md">
      {/* Sekcja po lewej */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Szczegóły projektu</h2>
        {isEditing ? (
          <div className="mb-4 w-3/4">
            <label className="block text-sm font-medium text-gray-700">
              Nazwa projektu:
            </label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ) : (
          <p className="mb-4">
            <strong className="block text-lg font-semibold">Nazwa:</strong> {project.project_name
            }
          </p>
        )}
        <div className="text-sm text-gray-500 mb-6">
          <p>
            <strong>Utworzony przez:</strong> {project.created_by || "Nieznany"}
          </p>
          <p>
            <strong>Data utworzenia:</strong> {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Sekcja po prawej */}
      <div className="lg:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Formy wsparcia</h3>
        {isEditing ? (
          <div className="flex flex-wrap gap-2">
            {allTypes.map((type) => (
              <label key={type.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editedTypes.includes(type.id)} // Sprawdza obecność w editedTypes
                  onChange={() => handleCheckboxChange(type.id)} // Zmienia stan
                  className="w-4 h-4"
                />
                {type.type}
              </label>
            ))}
          </div>
        ) : (
          <ul className="list-inside">
            {editedTypes.length > 0 ? (
              editedTypes.map((typeId) => {
                const typeObj = allTypes.find((type) => type.id === typeId); // Znajdź pełny obiekt
                return (
                  <li key={typeId} className="text-gray-700">
                    {typeObj?.type || "Nieznany typ"}
                  </li>
                );
              })
            ) : (
              <p className="text-gray-500">Brak przypisanych typów</p>
            )}
          </ul>
        )}
      </div>

      {/* Przycisk Edytuj/Zapisz */}
      <div className="mt-4 lg:col-span-2 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              Anuluj
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Zapisz
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edytuj
          </button>
        )}
      </div>
    </div>

      {/* Sekcja Czas szkoleń */}
      <div className="mt-6 p-4 bg-white shadow rounded">
        <h3 className="text-xl font-semibold mb-4">Czas szkoleń</h3>
        {trainingHours.map((training) => (
          <div key={training.training_type_id} className="flex justify-between items-center mb-2">
            <div className="w-1/3">
              <span className="font-medium">{training.typeName}</span>
            </div>
            {editingHours[training.training_type_id] !== undefined ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editingHours[training.training_type_id]}
                  onChange={(e) =>
                    setEditingHours({
                      ...editingHours,
                      [training.training_type_id]: parseInt(e.target.value, 10) || 0, // Upewnij się, że wartość to liczba
                    })
                  }
                  className="border p-1 rounded w-16"
                />
                <button
                  onClick={() => {
                    handleUpdateHours(training.training_type_id, editingHours[training.training_type_id]);
                    setEditingHours({ ...editingHours, [training.training_type_id]: undefined });
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Zapisz
                </button>
                {/* Przycisk Anuluj */}
                <button
                  onClick={() =>
                    setEditingHours({
                      ...editingHours,
                      [training.training_type_id]: undefined, // Wyjście z trybu edycji
                    })
                  }
                  className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                >
                  Anuluj
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <span>{training.planned_hours || 0} godzin</span>
                </div>
                <div className="w-1/3 text-right">
                  <button
                    onClick={() =>{
                      console.log("Kliknięto Edytuj dla type_id:", training.training_type_id);
                      setEditingHours({
                        ...editingHours,
                        [training.training_type_id]: training.planned_hours || 0, // Ustaw domyślną wartość, jeśli nie istnieje
                      })
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edytuj
                  </button>
                 </div>     
              </>
            )}
          </div>
        ))}
      </div>
        {/* Sekcja Czas zajęć grupowych */}
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Czas zajęć grupowych</h3>
          {groupHours.map((group) => (
            <div key={group.groupId} className="flex justify-between items-center mb-2">
              <div className="w-1/3">
                <span className="font-medium">{group.groupName}</span>
              </div>
              {editingGroupHours[group.groupId] !== undefined ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={editingGroupHours[group.groupId]}
                    onChange={(e) =>
                      setEditingGroupHours({
                        ...editingGroupHours,
                        [group.groupId]: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="border p-1 rounded w-16"
                  />
                  <button
                    onClick={() => {
                      handleUpdateGroupHours(group.groupId, editingGroupHours[group.groupId]);
                      setEditingGroupHours({ ...editingGroupHours, [group.groupId]: undefined });
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Zapisz
                  </button>
                  <button
                    onClick={() =>
                      setEditingGroupHours({
                        ...editingGroupHours,
                        [group.groupId]: undefined,
                      })
                    }
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Anuluj
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <span>{group.hours || 0} godzin</span>
                  </div>
                  <div className="w-1/3 text-right">
                    <button
                      onClick={() => {
                        setEditingGroupHours({
                          ...editingGroupHours,
                          [group.groupId]: group.hours || 0,
                        });
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edytuj
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>



    </div>
  );
}

export default ProjectDetails;
