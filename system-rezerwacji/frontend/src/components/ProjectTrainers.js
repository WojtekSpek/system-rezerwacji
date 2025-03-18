import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { ProgressCircle, Input, InputGroup } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";

import { useUpdateData } from "../hooks/useUpdateData";


function ProjectTrainers() {
  const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  const [trainersByGroup, setTrainersByGroup] = useState({}); // Szkoleniowcy przypisani do grup
  
  const [shouldRefreshGroups, setShouldRefreshGroups] = useState(false); // flaga aktualizująca trenerów zajęć grupowych
  const [shouldRefreshTypes, setShouldRefreshTypes] = useState(false); // flaga aktualizująca trenerów zajęć
  

  const [searchQueries, setSearchQueries] = useState({}); // Oddzielne inputy dla typów
  const [groupSearchQueries, setGroupSearchQueries] = useState({}); // Wyszukiwanie dla grup
  const [typeSearchQueries, setTypeSearchQueries] = useState({}); // Wyszukiwanie dla typów
  const [filteredGroupTrainers, setFilteredGroupTrainers] = useState({}); // Wyniki wyszukiwania dla grup
  ///#5 const [filteredTypeTrainers, setFilteredTypeTrainers] = useState({});   // Wyniki wyszukiwania dla typów
  const [filteredTrainers, setFilteredTrainers] = useState({}); // Filtrowana lista szkoleniowców
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  
  // Użyty do unieważnienia zapytań zastosowanych przez 'useQueries'
  const queryClient = useQueryClient();

  useEffect(() => { 
   
    fetchProjectTypes(projectId); 
    fetchProjectGroups(projectId);
  }, [projectId]);


  /// #1 zmina na useQuery mutation

  /* const addTrainerToGroup = async (trainerId, groupId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/group/${projectId}/group-trainers`, {
        trainerId,
        groupId,
      });
      if (response.data.success) {
        alert("Szkoleniowiec został przypisany do grupy!");
      }
    } catch (error) {
      console.error("Błąd podczas przypisywania szkoleniowca do grupy:", error);
    }
  }; */

  const addTrainerToGroup = async ({trainerId, groupId}) => {
    return await axios.post(`${API_BASE_URL}/group/${projectId}/group-trainers`, {
        trainerId,
        groupId,
      });
  };

  /* const optimisticAddTrainerToGroup = (old, values, mutiKey) => {
    console.warn({old, values, mutiKey});
    return undefined;
  }; */

  const addTrainerToGroupMutation = useUpdateData(
    ['trainersByGroupQueries'], // klucz stanu 
    addTrainerToGroup, // funkcja aktualizująca dane w bazie   
    undefined,//optimisticAddTrainerToGroup, // funkcja ustawiająca wartość 'optymistyczną'
    {
      loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany do grupy!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca do grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    true
  );



  /// #1 koniec 

  /// Użyj React Query do pobrania grup projektu
   const fetchProjectGroups = async (projectId) => {
    const response = await axios.get(`${API_BASE_URL}/group/group-trainings/${projectId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania grup szkoleniowców projektu"));
      }
      
      return response.data.trainings;
  }; 

  
   const { data: projectGroups = [],
      isLoading: isLoadingGroup, 
      isError: isErrorLoadingGroup,
      error: errorLoadingGroup,
      } = useQuery({
    queryKey: ['projectGroups'],
    queryFn: () => fetchProjectGroups(projectId),
  });

  if (isErrorLoadingGroup) {
    console.log("Błąd errorLoadingGroup:", errorLoadingGroup);
  }

  /* const fetchAllTrainersForGroups = async (groups) => {   
    console.log("!@ fetchAllTrainersForGroups:", groups);
    console.log("@ allTrainersForTypesQueryResult:", allTrainersForGroupsQueryResult);
    queryClient.invalidateQueries(['trainersByGroupQueries']);
  }; */

  // pobiera trenerów dla grupy
  const fetchAllTrainersForGroup = async (projectId, groupId) => {   
        const response = await axios.get(`${API_BASE_URL}/group/${projectId}/group-trainers/${groupId}`);
        if (!response.data.success) {      
          throw(new Error("Błąd podczas pobierania szkoleniowców dla grup:"));
        }
              
        return { data: response.data, idOfGroup: groupId };              
    };
  
  // Pobranie grup dla projektu (gdy 'projectGroups'' są już dostępne)
  const allTrainersForGroupsQueryResult = useQueries({
    queries: (projectGroups || []).map((group) => ({
      queryKey: ['trainersByGroupQueries', group.id],
      queryFn: () => fetchAllTrainersForGroup(projectId, group.id),
      enabled: !!projectGroups, // Wykonuje się tylko, jeśli 'projectGroups' są dostępne
    })),
  });

  // flaga oznaczająca czy grupy są pobrane
  const isLoadingTrainersGroups = allTrainersForGroupsQueryResult.map((query) => (query.isLoading))
    .every((query) => (query));
  
  // flaga sygnalizująca, że dane trenerów grup są pobrane
  const allSuccessWithGroupsData = Array.isArray(allTrainersForGroupsQueryResult) &&
    allTrainersForGroupsQueryResult.length > 0 &&
    allTrainersForGroupsQueryResult.every((query) => query && query.isSuccess && query.data);

  // filtrujemy i zapisuje dane szkoleniowców z grup przypisanych do projektu gdy się już pobiorą
  useEffect(() => {  
    if (allSuccessWithGroupsData) {   
      const trainersData = allTrainersForGroupsQueryResult.reduce((acc, group) => {
        acc[String(group.data?.idOfGroup)] = group.data?.data.trainers;
        return acc;
      }, {}); 

      console.log("Loaded trainerGroups:", trainersData);
      
      if (shouldRefreshGroups) {
        setShouldRefreshGroups(false);
        //trainerGroups?.filter(([group]) => group.success);
        console.log("useEffect() - finished");
      }

      setTrainersByGroup(trainersData); // Aktualizujemy stan
    }
  }, [allSuccessWithGroupsData, projectGroups, shouldRefreshGroups]);   // Uruchamiamy, gdy 'allSuccessWithData', 'projectGroups' się zmienią
    
/// koniec pobierania grup


  /// #3 zmiana na query mutation

  /* const removeTrainerFromGroup = async (trainerId, groupId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/group/projects/${projectId}/group-trainers/${groupId}/${trainerId}`);
      if (response.data.success) {
       
        setShouldRefreshGroups(true);
        alert("Szkoleniowiec został usunięty z grupy!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca z grupy:", error);
    }
  }; */
  
  const removeTrainerFromGroup = async ({trainerId, groupId}) => {
    return await axios.delete(`${API_BASE_URL}/group/projects/${projectId}/group-trainers/${groupId}/${trainerId}`);
  };

  const removeTrainerFromGroupMutation = useUpdateData(
    ['trainersByGroupQueries'], // klucz stanu 
    removeTrainerFromGroup, // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { 
      loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty z grupy!" },
      error: { description: "Błąd podczas usuwania szkoleniowca z grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    true
  );


  /// #3 koniec 

  /// Użyj React Query do pobrania typów projektu
  const fetchProjectTypes = async (projectId) => {   
      const response = await axios.get(`${API_BASE_URL}/projects/project_training_types/${projectId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania typów projektu:"));
      }
      
      return response.data.types;
  };

  const { data: projectTypes = [], 
    isLoading: isLoadingType, 
    isError: isErrorLoadingType,
    error: errorLodingType
   } = useQuery({
    queryKey: ["projectTypes", projectId], 
    queryFn: () => fetchProjectTypes(projectId),
  });

  if (isErrorLoadingType) {
    console.log("Błąd errorLodingType:", errorLodingType);
  }


  

  const fetchAllTrainersForTypes = async (types) => {    
    console.log("@ fetchAllTrainersForTypes:", types);
    console.log("@ allTrainersForTypesQueryResult:", allTrainersForTypesQueryResult);
    queryClient.invalidateQueries(['projectTypes']);
  };

  const fetchAllTrainersForType = async (projectId, typeId) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania szkoleniowców:"));
      }

      return { data: response.data, idOfType: typeId };
   };

   const allTrainersForTypesQueryResult = useQueries({
    queries: (projectTypes || []).map((type) => ({
      queryKey: ['trainersByTypeQueries', projectId, type.id],
      queryFn: () => fetchAllTrainersForType(projectId, type.id),
      enabled: !!projectTypes, // Wykonuje się tylko, jeśli 'projectGroups' są dostępne
    })),
  });

  const isLoadingTrainersTypes = allTrainersForTypesQueryResult.map((query) => (query.isLoading))
    .every((query) => (query));
  
  // flaga sygnalizująca, że dane typu są pobrane
  const allSuccessWithTypeData = Array.isArray(allTrainersForTypesQueryResult) &&
    allTrainersForTypesQueryResult.length > 0 &&
    allTrainersForTypesQueryResult.every((query) => query && query.isSuccess && query.data);

  // filtrujemy dane szkoleniowców z typów przypisanych do projektu gdy się już pobiorą
  /* useEffect(() => {  
  if (allSuccessWithTypeData) {   
      const trainersData = allTrainersForTypesQueryResult.reduce((acc, type) => {
        acc[String(type.data?.idOfType)] = type.data?.data.trainers;
        return acc;
      }, {}); 

      console.log("Loaded trainerTypes:", trainersData );
      
      if (shouldRefreshTypes) {
        setShouldRefreshTypes(false);
        console.log("useEffect() - finished");
      }
      
      setTrainersByType(trainersData);
    }
  }, [allSuccessWithTypeData, projectTypes, shouldRefreshTypes]); */
        
  /// koniec pobierania typów
  /// #2 zmiana na useQuery mutation
  /* const addTrainerToType = async (trainerId, typeId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/trainers`, { trainerId, typeId });
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został dodany!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
    }
  }; */

  const addTrainerToType = async ({trainerId, typeId}) => {
    return await axios.post(`${API_BASE_URL}/projects/${projectId}/trainers`, { trainerId, typeId });
  };

  const addTrainerToTypeMutation = useUpdateData(
    ['trainersByTypeQueries'], // klucz stanu 
    addTrainerToType, // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany do grupy!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca do grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    true
  );

  /// #2 koniec

  /// #4 
 /*  const removeTrainerFromType = async (trainerId, typeId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}/${trainerId}`);
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został usunięty!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
    }
  }; */

  const removeTrainerFromType = async ({trainerId, typeId}) => {
    return await axios.delete(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}/${trainerId}`);
  };

  const removeTrainerFromTypeMutation = useUpdateData(
    ['trainersByTypeQueries'], // klucz stanu 
    removeTrainerFromType, // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty!" },
      error: { description: "Błąd podczas usuwania szkoleniowca." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    true
  );


  /// #4 koniec

  /// #5 fałszywy test na ładowanie, do zmiany
  const isSearchingTrainersQuery = (searched, found, key, isLoadingSearch) => {    
    return (Object.keys(searched).includes(key.toString()) 
      && Object.keys(searched).length > 0 
      && found !== undefined 
      && isLoadingSearch );
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
          //setFilteredTypeTrainers((prev) => ({ ...prev, [id]: filtered }));
          console.warn("just stop");
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
  

  const searchAvailableTrainersFunc = async (variables) => {
    const {searchId:id, searchQuery: query, searchContext: context} = variables?.meta;

    console.error("REFREASH");
    // zapobiega zapytaniu z pustą listą
    if (query === undefined || query === "") {
      console.warn(
        "Wynik zapytania do backendu wskazuje niepowodzenie:",
        query
      );
      return [];
    }

    const params = { query: query.trim() };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    if (context === "group") {
      params.groupId = id;
    } else if (context === "type") {
      params.typeId = id;
    }

    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
    if (!response.data.success) {      
      console.warn(
        "Wynik zapytania do backendu wskazuje niepowodzenie:",
        response.data
      );

      throw(new Error("Błąd podczas wyszukiwania szkoleniowców"));        
    }

    
    return ([{[id]: [...response.data.trainers]}]);   
    
  }; 
  
  const onTrainersSearchSuccess = (data) => {
    const {filtered, context} = data;
    console.log("Przefiltrowani trenerzy:", filtered);
    // Obsługa wyników w zależności od kontekstu
    if (context === "group") {
      setFilteredGroupTrainers((prev) => ({ ...prev, [id]: filtered }));
      console.log("Stan filteredGroupTrainers:", filteredGroupTrainers);
    } else if (context === "type") {
      //setFilteredTypeTrainers((prev) => ({ ...prev, [id]: filtered }));
      queryClient.setQueryData('filteredTypeTrainers', (prev) => ({ ...prev, [id]: filtered }) );
    }
  };
  
  const { data: filteredTypeTrainers = {},
    isLoading: isLoadingSearchAvailableTrainers, 
    isError: isErrorSearchAvailableTrainers,
    error: errorSearchAvailableTrainers,
    refetch: reSearchAvailableTrainersFunc} = useQuery({
      queryKey: ['filteredTypeTrainers', ],
      queryFn: (meta) => searchAvailableTrainersFunc(meta),
      enabled: false,
      meta: {},      
      staleTime: 0,
  });
  
  
  
  if (isErrorSearchAvailableTrainers) {
    console.log("Błąd podczas wyszukiwania szkoleniowców:",
      errorSearchAvailableTrainers.response?.data 
      || errorSearchAvailableTrainers.message);
  }


  /// #5 koniec 

  const getRenderLoadingSpiner = () => (
    <ProgressCircle.Root value={null} size="xs">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );

  
  // wyświetla spiner do momentu pobrania trenerów, grup i typów zajęć
 /*  if (isLoadingGroup 
      || isLoadingType 
      || isLoadingTrainersTypes
      || isLoadingTrainersGroups 
      || !allSuccessWithGroupsData 
      || !allSuccessWithTypeData) { 
      return <div className="flex items-center justify-center h-screen">
        {renderLoadingSpiner()}</div>;
  } */

  return (
  <div>
    <Toaster />
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Szkoleniowcy projektu</h2>
      <ul className="space-y-4">
        { (isLoadingType || !allSuccessWithTypeData) 
        ? getRenderLoadingSpiner()
          : projectTypes.map((type) => (
            <li key={type.id} className="bg-white p-4 rounded  shadow hover:shadow-md">
              <h3 className="text-lg font-semibold mb-2">{type.type}</h3>

              {/* Lista przypisanych szkoleniowców */}
              
              <ul>
                { (isLoadingTrainersTypes) 
                  ? getRenderLoadingSpiner()
                  : trainersByType[type.id]?.map((trainer) => (
                    <li key={trainer.id +'_' + type.id} className="flex justify-between items-center p-2 border-b">
                      <span>{trainer.name}</span>
                      <button
                        /* onClick={() => removeTrainerFromType(trainer.id, type.id)} */
                        onClick = {() => {
                          removeTrainerFromTypeMutation.mutate({
                            trainerId: trainer.id, 
                            typeId: type.id,
                            singleQueryKey: type.id,
                          }, 
                          { onSuccess: () => { setShouldRefreshTypes(true); }});
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Usuń
                      </button>
                    </li>
                  )) || <p>Brak przypisanych szkoleniowców</p>
                }
                </ul>

                {/* Sekcja Dodawania szkoleniowców */}
                <div className="mt-4" >
                  
                  <h4 className="font-semibold mb-2">Dodaj szkoleniowca:</h4>                  
                  <InputGroup endElement={
                    (isSearchingTrainersQuery(typeSearchQueries, filteredTypeTrainers, type.id, isLoadingSearchAvailableTrainers))
                      ? getRenderLoadingSpiner() : null} >
                    <Input 
                      type="text"
                      placeholder="Wyszukaj szkoleniowca dla typu..."
                      value={typeSearchQueries[type.id] || ""} // Korzystaj z typowego stanu
                      onChange={(e) => {
                        const query = e.target.value;
                        setTypeSearchQueries((prev) => ({ ...prev, [type.id]: query })); // Aktualizuj typowy stan
                        searchAvailableTrainersFunc({ meta: { searchId: type.id, searchQuery: query, searchContext: "type" } });
                      }}
                      className="border border-gray-300 p-2 rounded w-full mb-2"
                    />    
                  </InputGroup>          
                  <ul>
                  <div>TAG 1 : {filteredTypeTrainers.length < 0 ? "zero": filteredTypeTrainers[type.id]?.name}</div>
                    {filteredTypeTrainers[type.id]?.map((trainer) => (
                      <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
                        <span>{trainer.name}</span>
                        <button
                          onClick={() => {
                            /*addTrainerToType(trainer.id, type.id)}*/
                            addTrainerToTypeMutation.mutate({
                              trainerId: trainer.id, 
                              typeId: type.id, 
                              singleQueryKey: type.id
                            }, 
                                { onSuccess: () => { setShouldRefreshTypes(true); }});
                            }}

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
        { (isLoadingGroup || !allSuccessWithGroupsData) 
          ? getRenderLoadingSpiner()
          : projectGroups.map((group) => (
          <li key={group.id} className="bg-slate-100 p-4 rounded shadow hover:shadow-md">
            <h4 className="text-lg font-semibold mb-2">{group.name}</h4>

            <ul>
              {(isLoadingTrainersGroups)
              ? isLoadingTrainersGroups()
              : trainersByGroup[group.id]?.map((trainer) => (
                <li key={trainer.id + '_' + group.id} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    /*onClick={() => removeTrainerFromGroup(trainer.id, group.id)}*/
                    onClick = {() => {
                      removeTrainerFromGroupMutation.mutate({
                        trainerId: trainer.id, 
                        groupId: group.id,
                        singleQueryKey: group.id,
                      }, 
                      { onSuccess: () => { setShouldRefreshGroups(true); }});
                    }}

                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </li>
              )) || <p>Brak przypisanych szkoleniowców</p>}
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
                    onClick={() => {
                      /*addTrainerToGroup(trainer.id, group.id)*/
                      addTrainerToGroupMutation.mutate({
                        trainerId: trainer.id, 
                        groupId: group.id,
                        singleQueryKey: group.id,
                      }, 
                      { onSuccess: () => { setShouldRefreshGroups(true); }});
                    }}
                    className={`${
                      trainersByGroup[group.id]?.some((t) => t.id === trainer.id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    } text-white px-3 py-1 rounded`}
                    disabled={trainersByGroup[group.id]?.some((t) => t.id === trainer.id)}
                  >
                   {trainersByGroup[group.id]?.some((t) => t.id === trainer.id)
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
    </div>
    </div>
  );
}

export default ProjectTrainers;
