import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { ChakraProvider, Spinner } from "@chakra-ui/react";



function ProjectTrainers() {
  const [projectTypes, setProjectTypes] = useState([]); // Typy projektu
  //const [projectGroups, setProjectGroups] = useState([]); // Grupy projektu
  const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  const [trainersByGroup, setTrainersByGroup] = useState({}); // Szkoleniowcy przypisani do grup
  const [searchQueries, setSearchQueries] = useState({}); // Oddzielne inputy dla typów
  const [groupSearchQueries, setGroupSearchQueries] = useState({}); // Wyszukiwanie dla grup
  const [typeSearchQueries, setTypeSearchQueries] = useState({}); // Wyszukiwanie dla typów
  const [filteredGroupTrainers, setFilteredGroupTrainers] = useState({}); // Wyniki wyszukiwania dla grup
  const [filteredTypeTrainers, setFilteredTypeTrainers] = useState({});   // Wyniki wyszukiwania dla typów
  const [filteredTrainers, setFilteredTrainers] = useState({}); // Filtrowana lista szkoleniowców
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProjectTypes();
    fetchProjectGroups();
    console.log("useEffect() - finished");
  }, [projectId]);


   const fetchProjectGroups = async (projectId) => {
   const response = await axios.get(`${API_BASE_URL}/group/group-trainings/${projectId}`);
      if (!response.data.success) {
        throw new Error("Błąd podczas pobierania grup szkoleniowców projektu");
      }
      else {
        console.log("@1fetchProjectGroups are:", response.data.trainings);
      }
         
      return response.data.trainings;
  }; 

/// Użyj React Query do pobrania grup projektu
   const { data: projectGroups = [], isLoading: isLoadingGroup, isError: isErrorLoadingGroup } = useQuery({
    queryKey: ["projectGroups", projectId], // ✅ Klucz zapytania
    queryFn: () => fetchProjectGroups(projectId), // ✅ Funkcja pobierająca dane
  });


  const fetchAllTrainersForGroups = async (projectId, groupId) => {
   
        const response = await axios.get(`${API_BASE_URL}/group/${projectId}/group-trainers/${groupId}`);
        if (!response.data.success) {
      
          throw new Error("Błąd podczas pobierania szkoleniowców dla grup:");
        }
              
        return { data: response.data, idOfGroup: groupId };
              
    };
  
    

    // Pobranie postów dla każdego użytkownika (gdy 'projectGroups'' są już dostępne)
    const allTrainersForGroupsQueryResult = useQueries({
      queries: (projectGroups || []).map((group) => ({
        queryKey: ['trainersByGroup', projectId, group.id],
        queryFn: () => fetchAllTrainersForGroups(projectId, group.id),
        enabled: !!projectGroups, // Wykonuje się tylko, jeśli 'projectGroups' są dostępne
      })),
    });

    const isLoadingTrainersGroups = allTrainersForGroupsQueryResult.map((query) => (query.isLoading))
      .every((query) => (query));
    

    const allSuccessWithData = Array.isArray(allTrainersForGroupsQueryResult) &&
      allTrainersForGroupsQueryResult.length > 0 &&
      allTrainersForGroupsQueryResult.every((query) => query && query.isSuccess && query.data);
    // filtrujemy dane szkoleniowców z grup przypisanych do projektu gdy się już pobiorą
     useEffect(() => {  
      if (allSuccessWithData) {   
          const trainersData = allTrainersForGroupsQueryResult.reduce((acc, group) => {
            acc[String(group.data?.idOfGroup)] = group.data?.data.trainers; // 🔹 Przypisujemy tablicę trenerów do grupy
            return acc;
          }, {}); 

          console.log("@3Loaded trainerGroups:",trainersData );
          setTrainersByGroup(trainersData); // Aktualizujemy stan//trainerGroups?.filter(([group]) => group.success);
        
      }}, [allSuccessWithData, projectGroups]);   // Uruchamiamy, gdy 'allSuccessWithData', 'projectGroups' się zmienią
      
  /// koniec


  const addTrainerToGroup = async (trainerId, groupId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/group/${projectId}/group-trainers`, {
        trainerId,
        groupId,
      });
      if (response.data.success) {
        fetchAllTrainersForGroups(projectGroups);
        alert("Szkoleniowiec został przypisany do grupy!");
      }
    } catch (error) {
      console.error("Błąd podczas przypisywania szkoleniowca do grupy:", error);
    }
  };

  const removeTrainerFromGroup = async (trainerId, groupId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/group/projects/${projectId}/group-trainers/${groupId}/${trainerId}`);
      if (response.data.success) {
        fetchAllTrainersForGroups(projectGroups);
        alert("Szkoleniowiec został usunięty z grupy!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca z grupy:", error);
    }
  };

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/project_training_types/${projectId}`);
      if (response.data.success) {
        setProjectTypes(response.data.types);
        fetchAllTrainersForTypes(response.data.types);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów projektu:", error);
    }
  };

  const fetchAllTrainersForTypes = async (types) => {
    const trainersData = {};
    try {
      for (const type of types) {
        const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/trainers/${type.id}`);
        if (response.data.success) {
          trainersData[type.id] = response.data.trainers;
        }
      }
      setTrainersByType(trainersData);
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };

  const addTrainerToType = async (trainerId, typeId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/trainers`, { trainerId, typeId });
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został dodany!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
    }
  };

  const removeTrainerFromType = async (trainerId, typeId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}/${trainerId}`);
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został usunięty!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
    }
  };

  const searchAvailableTrainers = async (id, query, context) => {
    try {
      const params = { query: query.trim() };
  
      // Dodanie odpowiednich parametrów w zależności od kontekstu
      if (context === "group") {
        params.groupId = id;
      } else if (context === "type") {
        params.typeId = id;
      }
  
      // Wysłanie zapytania
      const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
      console.log('response.data',response.data)
      if (response.data.success) {
        const filtered = response.data.trainers; // Bez dodatkowego filtrowania
        console.log("Przefiltrowani trenerzy:", filtered);
        // Obsługa wyników w zależności od kontekstu
        if (context === "group") {
          setFilteredGroupTrainers((prev) => ({ ...prev, [id]: filtered }));
          console.log("Stan filteredGroupTrainers:", filteredGroupTrainers);
        } else if (context === "type") {
          setFilteredTypeTrainers((prev) => ({ ...prev, [id]: filtered }));
        }
      } else {
        console.warn(
          "Wynik zapytania do backendu wskazuje niepowodzenie:",
          response.data
        );
      }
    } catch (error) {
      console.error(
        "Błąd podczas wyszukiwania szkoleniowców:",
        error.response?.data || error.message
      );
    }
  };
  
  

  if ( isLoadingGroup || isLoadingTrainersGroups || !allSuccessWithData ) { 
    return <div className="flex items-center justify-center h-screen">
      <ChakraProvider>
        <Spinner
          size="lg"
          color="colorPalette.600"          
        />
      </ChakraProvider>
    </div>;
  }

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Szkoleniowcy projektu</h2>
      <ul className="space-y-4">
        {projectTypes.map((type) => (
          <li key={type.id} className="bg-white p-4 rounded  shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">{type.type}</h3>

            {/* Lista przypisanych szkoleniowców */}
            
            <ul>
              {trainersByType[type.id]?.map((trainer) => (
                <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    onClick={() => removeTrainerFromType(trainer.id, type.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </li>
              )) || <p>Brak przypisanych szkoleniowców</p>}
            </ul>

            {/* Sekcja Dodawania szkoleniowców */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Dodaj szkoleniowca:</h4>
              <input
                type="text"
                placeholder="Wyszukaj szkoleniowca dla typu..."
                value={typeSearchQueries[type.id] || ""} // Korzystaj z typowego stanu
                onChange={(e) => {
                  const query = e.target.value;
                  setTypeSearchQueries((prev) => ({ ...prev, [type.id]: query })); // Aktualizuj typowy stan
                  searchAvailableTrainers(type.id, query, "type");
                }}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <ul>
                {filteredTypeTrainers[type.id]?.map((trainer) => (
                  <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
                    <span>{trainer.name}</span>
                    <button
                      onClick={() => addTrainerToType(trainer.id, type.id)}
                      className={`${
                        trainersByType[type.id]?.some((t) => t.id === trainer.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-3 py-1 rounded`}
                      disabled={trainersByType[type.id]?.some((t) => t.id === trainer.id)}
                    >
                      {trainersByType[type.id]?.some((t) => t.id === trainer.id)
                        ? "Dodano"
                        : "Dodaj"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {/* Sekcja dla grup */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Zajęcia grupowe</h3>
      <ul className="space-y-4">
        {projectGroups.map((group) => (
          <li key={group.id} className="bg-slate-100 p-4 rounded shadow hover:shadow-md">
            <h4 className="text-lg font-semibold mb-2">{group.name}</h4>

            <ul>
              {trainersByGroup[group.id]?.map((trainer) => (
                <li key={trainer.id + '_' + group.id} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    onClick={() => removeTrainerFromGroup(trainer.id, group.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </li>
              )) || <p>Brak przypisanych szkoleniowców # {group.id}</p>}
            </ul>

            <div className="mt-4">
            <input
              type="text"
              placeholder="Wyszukaj szkoleniowca (po imieniu lub umiejętnościach)..."
              value={groupSearchQueries[group.id] || ""}
              onChange={(e) => {
                const query = e.target.value;
                setGroupSearchQueries((prev) => ({ ...prev, [group.id]: query }));
                searchAvailableTrainers(group.id, query, "group");
              }}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <ul>
              {filteredGroupTrainers[group.id]?.map((trainer) => (
                <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    onClick={() => addTrainerToGroup(trainer.id, group.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Dodaj
                  </button>
                </li>
              ))}
            </ul>
          </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectTrainers;
