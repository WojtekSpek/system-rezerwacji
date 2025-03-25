import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { ProgressCircle, Input, InputGroup } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";

import { useUpdateData } from "../hooks/useUpdateData";
import { useUpdateSearch } from "../hooks/useUpdateSearch";

const isSameData = (oldData, newData) => {
  
  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);

  // Jeśli liczba kluczy się różni, obiekty są inne
  if (oldKeys.length !== newKeys.length) return false;

  return oldKeys.every((key) => {
    const oldItem = oldData[key];
    const newItem = newData[key];

    if (!oldItem || !newItem) return false;

    // Jeśli wartość w stanie jest taka sama, nie aktualizuj stanu
    return (oldItem.id === newItem.id 
      && oldItem.name === newItem.name 
      && oldItem.email === newItem.email);
  });
};

function ProjectTrainers() {
  //const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  //const [trainersByGroup, setTrainersByGroup] = useState({}); // Szkoleniowcy przypisani do grup
  
  const [shouldRefreshGroups, setShouldRefreshGroups] = useState(false); // flaga aktualizująca trenerów zajęć grupowych
  const [shouldRefreshTypes, setShouldRefreshTypes] = useState(false); // flaga aktualizująca trenerów zajęć
  
  const [isLoadingTrainersType, setIsLoadingTrainersType] = useState(false);
  const [isLoadingTrainersGroup, setIsLoadingTrainersGroup] = useState(false);

  const [searchQueries, setSearchQueries] = useState({}); // Oddzielne inputy dla typów

  const [searchedTrainersGroup, setSearchedTrainersGroup] = useState(null);
  const [groupSearchQueries, setGroupSearchQueries] = useState({}); // Wyszukiwanie dla grup
  const [typeSearchQueries, setTypeSearchQueries] = useState({}); // Wyszukiwanie dla typów
  const [filteredGroupTrainers, setFilteredGroupTrainers] = useState({}); // Wyniki wyszukiwania dla grup
  ///#5 
  const [filteredTypeTrainers, setFilteredTypeTrainers] = useState({});   // Wyniki wyszukiwania dla typów
  const [filteredTrainers, setFilteredTrainers] = useState({}); // Filtrowana lista szkoleniowców
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  
  // Użyty do unieważnienia zapytań zastosowanych przez 'useQueries'
  const queryClient = useQueryClient();


  const [listOfTypeQueries, setListOfTypeQueries] = useState([]);
  const [listOfGroupQueries, setListOfGroupQueries] = useState([]);

  /* useEffect(() => { 
   
    fetchProjectTypes(projectId); 
    fetchProjectGroups(projectId);
  }, [projectId]); */

  const setOnlyModifiedTrainers = (queries, context) => {
    const updatedState = {};
    
    for (const query of queries) {
      if (!query.data?.data?.success) continue; // Pominięcie niepobranych danych
      
      const newData = query.data?.data.trainers;
      const dataId = (context === "type") 
        ? String(query.data?.idOfType)
        : String(query.data?.idOfGroup);

        updatedState[dataId] = newData;
    }
    
    /*if (context === "type") {
      setTrainersByType((prev) => {
        const mergedState = { ...updatedState };

        // Jeśli stan się nie zmienił, nie aktualizujemy
        console.log({cmd: "setTrainersByType @", value: isSameData(prev, updatedState) ? prev : mergedState });
        return isSameData(prev, updatedState) ? prev : mergedState;
      });
    }
    else if (context === "group") {
      setTrainersByGroup((prev) => {
        const mergedState = { ...updatedState };

        // Jeśli stan się nie zmienił, nie aktualizujemy
        return isSameData(prev, updatedState) ? prev : mergedState;
      }); 
    }*/
  };
  
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

  const addTrainerToGroupMutation = useUpdateData(
    ['trainersByGroupQueries'], // klucz stanu 
    ({trainerId, groupId}) => addTrainerToGroup({trainerId, groupId}), // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    {
      loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany do grupy!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca do grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    false
  );



  /// #1 koniec 

  /// Użyj React Query do pobrania grup projektu
   const fetchProjectGroups = async (projectId) => {
    console.warn({cmd: "group fetchProjectGroups", projectId });
    const response = await axios.get(`${API_BASE_URL}/group/group-trainings/${projectId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania grup szkoleniowców projektu"));
      }
      
      console.warn({cmd: "fetchProjectGroups() ", response: response.data.trainings });
      return response.data.trainings;
  }; 

  
   const { data: projectGroups = [],
      isLoading: isLoadingGroup, 
      isError: isErrorLoadingGroup,
      error: errorLoadingGroup,
      } = useQuery({
    queryKey: ['projectGroups', projectId],
    queryFn: () => fetchProjectGroups(projectId),
    enabled: !!projectId,
  });

  if (isErrorLoadingGroup) {
    console.log("Błąd errorLoadingGroup:", errorLoadingGroup);
  }

  // pobiera trenerów dla grupy
  const fetchAllTrainersForGroup = async (projectId, groupId) => { 
        console.warn({cmd:"fetchAllTrainersForGroup()", projectId, groupId});  
        const response = await axios.get(`${API_BASE_URL}/group/${projectId}/group-trainers/${groupId}`);
        if (!response.data.success) {      
          throw(new Error("Błąd podczas pobierania szkoleniowców dla grup:"));
        }
           
        return { data: response.data, idOfGroup: groupId };              
    };
  
  // Pobranie grup dla projektu (gdy 'projectGroups' są już dostępne)
  const allTrainersForGroupsQueryResult = useQueries({
    queries: (projectGroups || []).map((group) => ({
      queryKey: ['trainersByGroupQueries', projectId, group.id],
      queryFn: () => fetchAllTrainersForGroup(projectId, group.id),
      enabled: !!projectGroups, // Wykonuje się tylko, jeśli 'projectGroups' są dostępne
    } )),
    /* combine: (results) => {
      const updatedState = {};
  
      for (const query of results) {
        if (!query.data?.data?.success) continue; // Pominięcie niepobranych danych
        
        const newData = query.data?.data.trainers;
        const dataId = String(query.data?.idOfGroup);

        updatedState[dataId] = newData;
      }

      console.log({cmd:"COMBINING", updatedState, isPending: results.some((result) => result.isPending)});
      return ({ data: updatedState, pending: results.some((result) => result.isPending)});

    } */
  });

  // flaga oznaczająca czy grupy są pobrane
  const isLoadingTrainersGroups = allTrainersForGroupsQueryResult.map((query) => (query.isLoading))
    .every((query) => (query));
  
  // flaga sygnalizująca, że dane trenerów grup są pobrane
  const allSuccessWithGroupsData = Array.isArray(allTrainersForGroupsQueryResult) &&
    allTrainersForGroupsQueryResult.length > 0 &&
    allTrainersForGroupsQueryResult.every((query) => query && query.isSuccess && query.data);

  // filtrujemy i zapisuje dane szkoleniowców z grup przypisanych do projektu gdy się już pobiorą
  /* useEffect(() => {  
    console.warn({cmd: "useEffect() groups ", allSuccessWithGroupsData, projectGroups, shouldRefreshGroups});
    if (allSuccessWithGroupsData || shouldRefreshGroups) {   
      

      //console.log("Loaded trainerGroups:", trainersData);
      setShouldRefreshGroups(false);
      setOnlyModifiedTrainers(allTrainersForGroupsQueryResult, "group");    
    }
  }, [allSuccessWithGroupsData, projectGroups, shouldRefreshGroups]); */   // Uruchamiamy, gdy 'allSuccessWithData', 'projectGroups' się zmienią
    
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
    console.log("removeTrainerFromGroup mutation", {trainerId, groupId});
    return axios.delete(`${API_BASE_URL}/group/projects/${projectId}/group-trainers/${groupId}/${trainerId}`);
  };

  const removeTrainerFromGroupMutation = useUpdateData(
    ['trainersByGroupQueries'], // klucz stanu 
    ({trainerId, groupId}) => removeTrainerFromGroup({trainerId, groupId}), // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { 
      loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty z grupy!" },
      error: { description: "Błąd podczas usuwania szkoleniowca z grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    false
  );


  /// #3 koniec 

  /// Użyj React Query do pobrania typów projektu
  const fetchProjectTypes = async (projectId) => {   
    console.warn({cmd: "fetchProjectTypes", projectId});
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
    queryKey: ['projectTypes', projectId], 
    queryFn: () => fetchProjectTypes(projectId),
    enabled: !!projectId,
  });

  if (isErrorLoadingType) {
    console.log("Błąd errorLodingType:", errorLodingType);
  }


  

 /*  do usunięcia?
    const fetchAllTrainersForTypes = async (types) => {    
    console.log("@ fetchAllTrainersForTypes:", types);
    console.log("@ allTrainersForTypesQueryResult:", allTrainersForTypesQueryResult);
    queryClient.invalidateQueries(['projectTypes']);
  }; */

  const fetchAllTrainersForType = async (projectId, typeId) => {
    console.warn({cmd: "fetchAllTrainersForType", projectId, typeId});
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania szkoleniowców:"));
      }

      return { data: response.data, idOfType: typeId };
   };

   const allTrainersForTypesQueryResult = useQueries({
    queries: (projectTypes || []).map((type) => {
      return {
        queryKey: ['trainersByTypeQueries', projectId, type.id],
        queryFn: () => fetchAllTrainersForType(projectId, type.id),
        enabled: !!projectTypes, // Wykonuje się tylko, jeśli 'projectTypes' są dostępne
      };
    }),
  });

  const isLoadingTrainersTypes = allTrainersForTypesQueryResult.map((query) => (query.isLoading))
    .every((query) => (query));
  
  // flaga sygnalizująca, że dane typu są pobrane
  const allSuccessWithTypeData = Array.isArray(allTrainersForTypesQueryResult) &&
    allTrainersForTypesQueryResult.length > 0 &&
    allTrainersForTypesQueryResult.every((query) => query && query.isSuccess && query.data);

  // filtrujemy dane szkoleniowców z typów przypisanych do projektu gdy się już pobiorą
  /* useEffect(() => {  
  if (allSuccessWithTypeData || shouldRefreshTypes) {  
    console.warn({cmd: "useEffect() types ", allSuccessWithTypeData, projectTypes, shouldRefreshTypes}); 
      
      setShouldRefreshTypes(false);
      setOnlyModifiedTrainers(allTrainersForTypesQueryResult, "type");    
        console.log("useEffect() - finished");
    }
  }, [ allSuccessWithTypeData, projectTypes, shouldRefreshTypes]); */
        
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
    ({trainerId, typeId}) => addTrainerToType({trainerId, typeId}), // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    false,
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
    ({trainerId, typeId}) => removeTrainerFromType({trainerId, typeId}), // funkcja aktualizująca dane w bazie   
    undefined, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty!" },
      error: { description: "Błąd podczas usuwania szkoleniowca." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    false,
  );


  /// #4 koniec

  /// #5 test na ładowanie
  const isSearchingTrainersQuery = (searched, found, key, isLoadingSearch) => {    
    const isSearching = Object.keys(searched).includes(key.toString());
    const isFound = found !== undefined;
    
    return isSearching && isFound && isLoadingSearch;
  };

  /* 
  /// #6 zmienione na.., poniżej nie zakomantowane
  const searchAvailableTrainers = async (id, query, context) => {
    try {
      const params = { query: query.trim() };
  
      // Dodanie odpowiednich parametrów w zależności od kontekstu
      if (context === "group") {
        params.groupId = id;
      } else if (context === "type") {
        params.typeId = id;
      }
      
      console.warn({ cmd: "searchAvailableTrainers",id, query, context});
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
  
  */
  
  const searchAvailableTrainersTypeFunc = async (variables) => {
    const {searchId:searchId, searchQuery: query, searchContext: context} = variables;

    console.error("REFREASH searchAvailableTrainersTypeFunc", variables);
    // zapobiega zapytaniu z pustą listą
    if (query === undefined || query === "") {
      console.warn(
        "Puste zapytanie do backendu", variables
      );
      return ({searchId, filtered: [], context});
    }

    const params = { query: query.trim() };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    if (context === "group") {
      console.warn("@ searchAvailableTrainersTypeFunc() ", variables);
      params.groupId = searchId;
    }

    console.warn( { cmd: "searchAvailableTrainersTypeFunc", variables } );
    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });

    if (!response.data.success) {      
      console.warn(
        "Wynik zapytania do backendu wskazuje niepowodzenie:",
        response.data
      );

      throw(new Error("Błąd podczas wyszukiwania szkoleniowców"));        
    }

    const filtered = response.data.trainers;

    return ({searchId, filtered, context});   
    
  }; 

  const searchAvailableTrainersGroupFunc = async (variables) => {
    const {searchId:searchId, searchQuery: query, searchContext: context} = variables;

    console.error("REFREASH searchAvailableTrainersGroupFunc", variables);
    // zapobiega zapytaniu z pustą listą
    if (query === undefined || query === "") {
      console.warn(
        "Puste zapytanie do backendu", variables
      );
      return ({searchId, filtered: [], context});
    }

    const params = { query: query.trim() };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    if (context === "group") {
      console.warn("@ searchAvailableTrainersGroupFunc() ", variables);
      params.groupId = searchId;
    }

    console.warn( { cmd: "searchAvailableTrainersGroupFunc", variables } );
    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });

    if (!response.data.success) {      
      console.warn(
        "Wynik zapytania do backendu o szkoleniowców grup wskazuje niepowodzenie:",
        response.data
      );

      throw(new Error("Błąd podczas wyszukiwania szkoleniowców grup"));        
    }

    const filtered = response.data.trainers;

    return ({searchId, filtered, context});   
    
  }; 
  
  /// #6 koniec
  /* 
  do wywalenia? const onTrainersSearchSuccess = (data) => {
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
  }; */
  
  const { data: filteredTypeTrainersData,
    isLoading: isLoadingSearchAvailableTrainers, 
    isError: isErrorSearchAvailableTypeTrainers,
    error: errorSearchAvailableTypeTrainers } = useQuery({
      queryKey: ['filteredTypeTrainersData'],
      queryFn: (variables) => searchAvailableTrainersTypeFunc(variables),
      enabled: !!projectTypes,
  });
  
  const updatefilteredTypeTrainers = useMutation( {
    mutationFn: (variables) => searchAvailableTrainersTypeFunc(variables),
    onMutate: (variables) => async (variables) => {
      const {searchId: searchId, searchQuery: query, searchContext: context} = variables;
      
      console.error("REFREASH updatefilteredTypeTrainers", variables);
      // zapobiega zapytaniu z pustą listą
      if (query === undefined || query === "") {
        console.warn(
          "Wynik zapytania do backendu wskazuje niepowodzenie:",
          query
        );
        return {};
      }

      const params = { query: query.trim() };
    
      // Dodanie odpowiednich parametrów w zależności od kontekstu
      if (context === "type") {
        params.typeId = searchId;
      }

      console.warn({cmd: "updatefilteredTypeTrainers", variables});
      const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
      if (!response.data.success) {      
        console.warn(
          "Wynik zapytania do backendu wskazuje niepowodzenie:",
          response.data
        );

        throw(new Error("Błąd podczas wyszukiwania szkoleniowców"));        
      }

      const filtered = response.data.trainers;

      return ({searchId, filtered, context});   
    
    },
  
    onSuccess: (data) => {
      console.log({cmd: "updatefilteredTypeTrainers filteredTypeTrainersData onSuccess", data});
      const {searchId, filtered, context } = data;
      queryClient.setQueryData(['filteredTypeTrainersData'], (oldData) => {
        if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę

        return ({...oldData, [String(searchId)]: filtered});
      });

      setIsLoadingTrainersType(false);
      setFilteredTypeTrainers((prev) => ({ ...prev, [String(searchId)]: filtered }));
      //setShouldRefreshTypes(true);
    }} );
  
  if (isErrorSearchAvailableTypeTrainers) {
    console.log("Błąd podczas wyszukiwania szkoleniowców:",
      errorSearchAvailableTypeTrainers.response?.data 
      || errorSearchAvailableTypeTrainers.message);
  }

  const updateFilteredGroupTrainers = async (variables) => {
    console.error("REFREASH searchAvailableTrainersGroupFunc", variables);

    const {queryId, queryObj} = variables.meta;

    // zapobiega zapytaniu z pustą listą
    if (queryObj === undefined || queryObj === "") {
      console.warn(
        "Puste zapytanie do backendu", variables
      );
      return ({});
    }

    const params = { 
      query: queryObj[queryId].trim(),
      groupId: queryId
     };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    console.warn( { cmd: "searchAvailableTrainersGroupFunc", variables } );
    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
    
    return ({ [String(queryId)]: response.data.trainers });

    /* if (!response.data.success) {      
      console.warn(
        "Wynik zapytania do backendu o szkoleniowców grup wskazuje niepowodzenie:",
        response.data
      );

      throw(new Error("Błąd podczas wyszukiwania szkoleniowców grup"));        
    }

    const filtered = response.data.trainers;

    return ({searchId, filtered, context});  */
  };

  const searchedGroupTrainers = useUpdateSearch({
    queryKey: ['filteredGroupTrainersData', projectId, searchedTrainersGroup],
    queryFn: updateFilteredGroupTrainers,
    meta: { queryId: searchedTrainersGroup,
      queryObj: groupSearchQueries
    },
    getEnabled: () => {
      console.log("getEnabled()", {projectGroups, searchedTrainersGroup});
      return (!!projectGroups && !!searchedTrainersGroup);},
    onSaveSearch: (filteredGroupTrainersData, isSuccessfulUpdate) => {
      console.log("onSaveSearch", {filteredGroupTrainersData, isSuccessfulUpdate})
      if (filteredGroupTrainersData && isSuccessfulUpdate) {
        console.log({cmd: "filteredGroupTrainersData useEffect"});
        //const {searchId, filtered, context } = data;
        /* queryClient.setQueryData(["filteredGroupTrainersData"], (oldData) => {
          if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę
            return ({ [String(searchId)]: filtered});
        });  
        setIsLoadingTrainersGroup(false);   */
        const filtered = filteredGroupTrainersData[searchedTrainersGroup];
        setFilteredGroupTrainers((prev) => ({ ...prev, [String(searchedTrainersGroup)]: filtered })); 
      }
    },
  });

  const { data: filteredGroupTrainersData = {},
    isLoading: isLoadingSearchAvailableGroupTrainers, 
    isError: isErrorSearchAvailableGroupTrainers,
    error: errorSearchAvailableGroupTrainers,
    isSuccess: isSuccessUpdateFilteredGroupTrainers,
  } = searchedGroupTrainers;

  /* const { data: filteredGroupTrainersData = {},
    isLoading: isLoadingSearchAvailableGroupTrainers, 
    isError: isErrorSearchAvailableGroupTrainers,
    error: errorSearchAvailableGroupTrainers,
    isSuccess: isSuccessUpdateFilteredGroupTrainers,
   } = useQuery({
      queryKey: ['filteredGroupTrainersData', projectId, searchedTrainersGroup],
      queryFn: updateFilteredGroupTrainers,
      meta: { groupId: searchedTrainersGroup,
        groupQuery: groupSearchQueries[searchedTrainersGroup]},
      enabled: !!projectGroups && !!searchedTrainersGroup,
  }); */


/*   const updatefilteredGroupTrainers = useMutation( {
    retry: false,
    mutationFn: (variables) => searchAvailableTrainersGroupFunc(variables),
    onMutate: (variables) => async (variables) => {
      const {searchId: searchId, searchQuery: query, searchContext: context} = variables;
      
      console.error("REFREASH updatefilteredGroupTrainers", variables);
      // zapobiega zapytaniu z pustą listą
      if (query === undefined || query === "") {
        console.warn(
          "Wynik zapytania do backendu wskazuje niepowodzenie:",
          query
        );
        return {};
      }

      const params = { query: query.trim() };
    
      // Dodanie odpowiednich parametrów w zależności od kontekstu
      if (context === "group") {
        params.groupId = searchId;
      }
/// $ HEAR LIES SOURCE OF MISSCHIEF 
      console.warn({cmd: "updatefilteredGroupTrainers", variables});
      const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
      if (!response.data.success) {      
        console.warn(
          "Wynik zapytania do backendu wskazuje niepowodzenie:",
          response.data
        );

        throw(new Error("Błąd podczas wyszukiwania szkoleniowców"));        
      }

      const filtered = response.data.trainers;

      return ({searchId, filtered, context});   
    
    },
  
    onSuccess: (data) => {
      console.log({cmd: "updatefilteredGroupTrainers filteredGroupTrainersData onSuccess", data});
      const {searchId, filtered, context } = data;
      queryClient.setQueryData(["filteredGroupTrainersData"], (oldData) => {
        if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę
      
        return ({ [String(searchId)]: filtered});
      });

      setIsLoadingTrainersGroup(false);
      setFilteredGroupTrainers((prev) => ({ ...prev, [String(searchId)]: filtered }));
      //setShouldRefreshGroups(true);
    }} ); */

  /* const updateSearchedGroupTrainers = useEffect(() => {
    if (filteredGroupTrainersData && isSuccessUpdateFilteredGroupTrainers) {
      console.log({cmd: "filteredGroupTrainersData useEffect"});


      //const {searchId, filtered, context } = data;
      
      //queryClient.setQueryData(["filteredGroupTrainersData"], (oldData) => {
      //  if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę
      
      //  return ({ [String(searchId)]: filtered});
      //});

      setIsLoadingTrainersGroup(false);
      const filtered = filteredGroupTrainersData[searchedTrainersGroup];
      setFilteredGroupTrainers((prev) => ({ ...prev, [String(searchedTrainersGroup)]: filtered })); 
    }
  }, [filteredGroupTrainersData, isSuccessUpdateFilteredGroupTrainers, searchedTrainersGroup]); 
  */

  /// #5 koniec 

  const getTrainersByType = (key, index) => {
    const query = allTrainersForTypesQueryResult[index]; 
    console.log({cmd: "GET TRAINERS TYPE", value: ((query?.data?.data?.success) ? query?.data?.data?.trainers : []), data: query?.data?.data?.trainers});
    return (query?.data?.data?.success) ? query?.data?.data?.trainers : [];
  };

  const getTrainersByGroup = (key, index) => {
    const query = allTrainersForGroupsQueryResult[index]; 

    return (query?.data?.data?.success) ? query?.data?.data?.trainers : [];
  };

  const getIsLoadingType = (key, index) => {
    const query = allTrainersForTypesQueryResult[index];
    return query?.isLoading ?? false;
  };

  const getIsLoadingGroup = (key, index) => {
    const query = allTrainersForGroupsQueryResult[index];
    return query?.isLoading ?? false;
  };

  const getRenderLoadingSpiner = () => (
    <ProgressCircle.Root value={null} size="xs">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );

  
  return (
  <div>
    <Toaster />
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Szkoleniowcy projektu</h2>
      <ul className="space-y-4">
        { (isLoadingType) 
        ? getRenderLoadingSpiner()
          : projectTypes.map((type, tIndex) => (
            <li key={type.id + "_" + tIndex} className="bg-white p-4 rounded  shadow hover:shadow-md">
              <h3 className="text-lg font-semibold mb-2">{type.type} {(getIsLoadingType(type, tIndex))
            ? getRenderLoadingSpiner() : "" } </h3>

              {/* Lista przypisanych szkoleniowców */}
              
              <ul>
                { (isLoadingTrainersTypes) 
                  ? getRenderLoadingSpiner()
                  : /* trainersByType[type.id]?.map((trainer) => (
                    <li key={trainer.id +'_' + type.id} className="flex justify-between items-center p-2 border-b">
                      <span>{trainer.name}</span>
                      <button
                        onClick = {() => {
                          removeTrainerFromTypeMutation.mutate({
                            trainerId: trainer.id, 
                            typeId: type.id,
                            singleQueryKey: [projectId, type.id],
                          },
                          );
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Usuń
                      </button>
                    </li> */

                    (getIsLoadingType(type, tIndex)) 
                      ? getRenderLoadingSpiner() 
                      : getTrainersByType(type, tIndex)?.map((trainer, index) => (
                      <li key={trainer.id +'_' + type.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                        <span>{trainer.name}</span>
                        <button
                          onClick = {() => {
                            removeTrainerFromTypeMutation.mutate({
                              trainerId: trainer.id, 
                              typeId: type.id,
                              singleQueryKey: [projectId, type.id],
                            },
                            );
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
                    (isSearchingTrainersQuery(typeSearchQueries, filteredTypeTrainers, type.id, isLoadingTrainersType))
                      ? getRenderLoadingSpiner() : null} >
                    <Input 
                      type="text"
                      placeholder="Wyszukaj szkoleniowca dla typu..."
                      value={typeSearchQueries[type.id] || ""} // Korzystaj z typowego stanu
                      onChange={(e) => {
                        const query = e.target.value;
                        setIsLoadingTrainersType(true);
                        setTypeSearchQueries((prev) => ({ ...prev, [type.id]: query })); // Aktualizuj typowy stan
                        updatefilteredTypeTrainers.mutate({ 
                          searchId: type.id, 
                          searchQuery: query,
                          singleQueryKey: [projectId, type.id], 
                          searchContext: "type" });
                      }}
                      className="border border-gray-300 p-2 rounded w-full mb-2"
                    />    
                  </InputGroup>
                  <ul>

                    {filteredTypeTrainers[type.id]?.map((trainer, index) => (
                      <li key={trainer.id +'_' + type.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                        <span>{trainer.name}</span>
                        <button
                          onClick={() => {
                            /*addTrainerToType(trainer.id, type.id)}*/
                            addTrainerToTypeMutation.mutate({
                              trainerId: trainer.id, 
                              typeId: type.id, 
                              singleQueryKey: [projectId, type.id]
                            }, 
                            /* { onSuccess: () => { setShouldRefreshTypes(true); }} */);
                            }}

                          className={`${
                            (getIsLoadingType(type, tIndex)) 
                            ? getRenderLoadingSpiner()
                            : getTrainersByType(type, tIndex)?.some((t) => t.id === trainer.id)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white px-3 py-1 rounded`}
                          disabled={(getIsLoadingType(type, tIndex)) 
                            ? getTrainersByType(type, tIndex)?.some((t) => t.id === trainer.id)
                          : ""}
                        >
                          {(getIsLoadingType(type, tIndex)) 
                          ? getRenderLoadingSpiner()
                          : ((getTrainersByType(type, tIndex)?.some((t) => t.id === trainer.id))
                            ? "Dodano"
                            : "Dodaj")
                          }
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
        { (isLoadingGroup) 
          ? getRenderLoadingSpiner()
          : projectGroups.map((group, gIndex) => (
          <li key={group.id + "_" + gIndex} className="bg-slate-100 p-4 rounded shadow hover:shadow-md">
            <h4 className="text-lg font-semibold mb-2">{group.name} {(getIsLoadingGroup(group))
            ? getRenderLoadingSpiner() : "" } </h4>
            <ul>
              { (getIsLoadingGroup(group, gIndex) )
                  ? getRenderLoadingSpiner() 
                  : (getTrainersByGroup(group, gIndex))?.map((trainer, index) => (
                <li key={trainer.id + '_' + group.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    /*onClick={() => removeTrainerFromGroup(trainer.id, group.id)}*/
                    onClick = {() => {
                      removeTrainerFromGroupMutation.mutate({                        
                        trainerId: trainer.id, 
                        groupId: group.id,
                        singleQueryKey: [projectId, group.id],
                      });
                   
                      console.log("onClick removeTrainerFromGroup() mutate", {trainer, group} );
                    
                  }}
                    
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </li>
              )) || <p>Brak przypisanych szkoleniowców</p>}
            </ul>

            <div className="mt-4"> 
            <InputGroup endElement={
              (isSearchingTrainersQuery(groupSearchQueries, filteredGroupTrainers, group.id, isLoadingTrainersGroup))
                ? getRenderLoadingSpiner() : null} >
              <Input 
                type="text"
                placeholder="Wyszukaj szkoleniowca (po imieniu lub umiejętnościach)..."
                value={groupSearchQueries[group.id] || ""} // Korzystaj z typowego stanu
                onChange={(e) => {
                  const query = e.target.value;
                  searchedGroupTrainers.handleOnSearch( () => {
                    setGroupSearchQueries((prev) => ({ ...prev, [group.id]: query })); // Aktualizuj typowy stan
                    setSearchedTrainersGroup(group.id);
                  });
                }}
                className="bg-white border border-gray-300 p-2 rounded w-full mb-2"
              />    
            </InputGroup>                     
           {/*  <input
              type="text"
              placeholder="Wyszukaj szkoleniowca (po imieniu lub umiejętnościach)..."
              value={groupSearchQueries[group.id] || ""}
              onChange={(e) => {
                const query = e.target.value;
                setGroupSearchQueries((prev) => ({ ...prev, [group.id]: query }));
                searchAvailableTrainers(group.id, query, "group");
              }}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />   */}          
            <ul>
              {filteredGroupTrainers[group.id]?.map((trainer, index) => (
                <li key={trainer.id + "_" + group.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    onClick={() => {
                      /*addTrainerToGroup(trainer.id, group.id)*/
                      addTrainerToGroupMutation.mutate({
                        trainerId: trainer.id, 
                        groupId: group.id,
                        singleQueryKey: [projectId, group.id],
                      }, 
                      /* { onSuccess: () => { setShouldRefreshGroups(true); }} */);
                    }}
                    className={`${
                      (getIsLoadingGroup(group, gIndex)) 
                      ? getRenderLoadingSpiner()
                      : getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white px-3 py-1 rounded`}
                    disabled={(getIsLoadingGroup(group, gIndex)) 
                      ? getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id)
                      : false}
                  >
                    {(getIsLoadingGroup(group, gIndex)) 
                    ? getRenderLoadingSpiner()
                    :((getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id))
                      ? "Dodano"
                      : "Dodaj")
                    }
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
