import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { ProgressCircle, Input, InputGroup } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";


import { useUpdateTrainerSearch } from "../hooks/useUpdateTrainerSearch";
import { useUpdateTrainersList } from "../hooks/useUpdateTrainersList";

function areSameArrays(first, second) {
  if (first === undefined || second === undefined) {
    return false;
  }

  if (!Array.isArray(first) || !Array.isArray(second)) { 
    console.error("Comparing two not arrays!"); 
    throw (new Error("Błąd podczas porównania")); 
  }

  if (first.length != second.length) {
    return false;
  }

  for (let i  = 0; i < first.length; i++ ) {
    if (first[i]?.id !== second[i]?.id 
      || first[i]?.name !== second[i]?.name) {
        return false;
    }
  }

  return true;
}


function ProjectTrainers() {
  //const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  //const [trainersByGroup, setTrainersByGroup] = useState({}); // Szkoleniowcy przypisani do grup
  
/*   const [isLoadingTrainersType, setIsLoadingTrainersType] = useState(false);
  const [isLoadingTrainersGroup, setIsLoadingTrainersGroup] = useState(false);
 */
  
  const [callerMutationType, setCallerMutationType] = useState("");

  const [searchedTrainerGroupId, setSearchedTrainerGroupId] = useState(null); // id poszukiwanego trenera dla grup
  const [searchedTrainerTypeId, setSearchedTrainerTypeId] = useState(null); // id poszukiwanego trenera dla typów 
  const [searchedTrainersGroupIds, setSearchedTrainersGroupIds] = useState({}); // id poszukiwanego trenera dla grup
  const [searchedTrainersTypeIds, setSearchedTrainersTypeIds] = useState({}); // id poszukiwanego trenera dla typów 
  const [groupSearchQueries, setGroupSearchQueries] = useState({}); // Wyszukiwanie dla grup
  const [typeSearchQueries, setTypeSearchQueries] = useState({}); // Wyszukiwanie dla typów
  const [filteredGroupTrainers, setFilteredGroupTrainers] = useState({}); // Wyniki wyszukiwania dla grup
  ///#5 
  const [filteredTypeTrainers, setFilteredTypeTrainers] = useState({});   // Wyniki wyszukiwania dla typów
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  
  // Użyty do unieważnienia zapytań zastosowanych przez 'useQueries'
  const queryClient = useQueryClient();

  let toasterState = useRef('');

  /// Użyj React Query do pobrania grup projektu
  const fetchProjectGroups = async (projectId) => {
    
    const response = await axios.get(`${API_BASE_URL}/group/group-trainings/${projectId}`);
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania grup szkoleniowców projektu"));
      }
      
      
      return response.data.trainings;
  }; 

  const updateToaster = (action, suffix) => {
    const suffixString = suffix.join("-");
    console.log("SUFFIX STR: ", suffixString);
    
    if (suffix[0] === 'group') {
      if (callerMutationType === 'remove') {
        removeTrainerFromGroupMutation.updateToaster(action, suffixString);        
      }
      else if(callerMutationType === 'add') {
        addTrainerToGroupMutation.updateToaster(action, suffixString);       
      }
    }
    else if (suffix[0] === 'type') {
      if (callerMutationType === 'remove') {
        removeTrainerFromTypeMutation.updateToaster(action, suffixString);
      }
      else if(callerMutationType === 'add') {
        addTrainerToTypeMutation.updateToaster(action, suffixString);
      }
   }
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
         
        const response = await axios.get(`${API_BASE_URL}/group/${projectId}/group-trainers/${groupId}`);
        const toasterSuffix = ['group', groupId];

        if (!response.data.success) { 
          throw(new Error("Błąd podczas pobierania szkoleniowców dla grup:"));
        }
        
        updateToaster('success', toasterSuffix);
        return { data: response.data, idOfGroup: groupId };              
    };
  
  // Pobranie grup dla projektu (gdy 'projectGroups' są już dostępne)
  const allTrainersForGroupsQueryResult = useQueries({
    queries: (projectGroups || []).map((group) => ({
      queryKey: ['trainersByGroupQueries', projectId, 'group', group.id],
      queryFn: () => fetchAllTrainersForGroup(projectId, group.id),
      enabled: !!projectGroups, // Wykonuje się tylko, jeśli 'projectGroups' są dostępne
    } )),
  });

  // flaga oznaczająca czy grupy są pobrane
  const isLoadingTrainersGroups = allTrainersForGroupsQueryResult.map((query) => (query.isLoading))
    .every((query) => (query));
  
  // flaga sygnalizująca, że dane trenerów grup są pobrane
  const allSuccessWithGroupsData = Array.isArray(allTrainersForGroupsQueryResult) &&
    allTrainersForGroupsQueryResult.length > 0 &&
    allTrainersForGroupsQueryResult.every((query) => query && query.isSuccess && query.data);
    
/// koniec pobierania grup

  const updateFilteredGroupTrainers = async (variables) => {
    console.log("REFREASH updateFilteredGroupTrainers", variables);

    const {queryId, queryObj} = variables.meta;

    // zapobiega zapytaniu z pustą listą
    if (queryObj === undefined || queryId === null || queryObj?.[queryId]?.query === "") {
      console.warn(
        "Puste zapytanie do backendu", variables
      );
      return ({});
    }

    const params = { 
      query: queryObj?.[queryId]?.query.trim(),
      groupId: queryId
     };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    console.warn( { cmd: "searchAvailableTrainersGroup", variables } );
    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
    
    return ({ [String(queryId)]: response.data.trainers });
  };

  const searchedGroupTrainers = useUpdateTrainerSearch({
    queryKey: ['filteredGroupTrainersData', projectId, searchedTrainersGroupIds, groupSearchQueries?.[searchedTrainerGroupId]?.query],
    queryFn: updateFilteredGroupTrainers,
    meta: {
      queryId: searchedTrainerGroupId,
      queryObj: groupSearchQueries,
    },
    getEnabled: () => {
      console.log("getEnabled(Groups)", {projectGroups, searchedTrainersGroup: searchedTrainersGroupIds});
      return (!!projectGroups && !!searchedTrainersGroupIds);
    },
    onSaveSearch: (filteredData, isSuccessfullUpdate, meta) => {
      if (filteredData && isSuccessfullUpdate) {
     
        console.log("onSaveSearch", {filteredData, isSuccessfullUpdate});
        console.log({cmd: "filteredData useEffect"});
        //const {searchId, filtered, context } = data;
        /* queryClient.setQueryData(["filteredData"], (oldData) => {
          if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę
            return ({ [String(searchId)]: filtered});
        });  
        setIsLoadingTrainersGroup(false);   */
        const searchedId = meta?.queryId;
        const filtered = filteredData[meta?.queryId];
        if (!areSameArrays(filteredGroupTrainers?.[searchedId] || [], filtered || [])) {
          setFilteredGroupTrainers((prev) => ({ ...prev, [String(searchedId)]: filtered }));
        }
      }
    },
    modifiedObject: searchedTrainersGroupIds,
  }, queryClient);

  const { data: filteredGroupTrainersData = {},
    isLoading: isLoadingSearchAvailableGroupTrainers,
    isLoadingSingleQuery: isLoadingSingleGroupTrainer, 
    isError: isErrorSearchAvailableGroupTrainers,
    error: errorSearchAvailableGroupTrainers,
    isSuccess: isSuccessUpdateFilteredGroupTrainers,
  } = searchedGroupTrainers;

  /// Trainer Type Search

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
    queryKey: ['projectTypes', projectId], 
    queryFn: () => fetchProjectTypes(projectId),
    enabled: !!projectId,
  });

  if (isErrorLoadingType) {
    console.log("Błąd errorLodingType:", errorLodingType);
  }

  const updateFilteredTypeTrainers = async (variables) => {
    console.log("REFREASH updateFilteredTypeTrainers", variables);

    const {queryId, queryObj} = variables.meta;

    // zapobiega zapytaniu z pustą listą
    if (queryObj === undefined || queryId === null || queryObj?.[queryId]?.query === "") {
      console.warn(
        "Puste zapytanie do backendu", variables
      );
      return ({});
    }

    const params = { 
      query: queryObj?.[queryId]?.query.trim(),
      typeId: queryId
     };
  
    // Dodanie odpowiednich parametrów w zależności od kontekstu
    console.warn( { cmd: "searchAvailableTrainersGroupFunc", variables } );
    const response = await axios.get(`${API_BASE_URL}/trainers/trainersType`, { params });
    
    return ({ [String(queryId)]: response.data.trainers });
  };

  const searchedTypeTrainers = useUpdateTrainerSearch({
    queryKey: ['filteredTypeTrainersData', projectId, searchedTrainersTypeIds, typeSearchQueries?.[searchedTrainerTypeId]?.query],
    queryFn: updateFilteredTypeTrainers,
    meta: { 
      queryId: searchedTrainerTypeId,
      queryObj: typeSearchQueries,
    },
    getEnabled: () => {
      console.log("getEnabled(Type)", {projectTypes, searchedTrainersType: searchedTrainersTypeIds});
      return (!!projectTypes && !!searchedTrainersTypeIds);
    },
    onSaveSearch: (filteredData, isSuccessfullUpdate, meta) => {
      if (filteredData && isSuccessfullUpdate) {
        console.log("onSaveSearch", {filteredData, isSuccessfullUpdate});
        console.log({cmd: "filteredData useEffect"});
        //const {searchId, filtered, context } = data;
        /* queryClient.setQueryData(["filteredData"], (oldData) => {
          if (!oldData) return { [String(searchId)]: filtered }; // Jeśli brak danych, utwórz nową strukturę
            return ({ [String(searchId)]: filtered});
        });  
        setIsLoadingTrainersType(false);   */
        const searchedId = meta?.queryId;
        const filtered = filteredData[searchedId];
        if (!areSameArrays(filteredTypeTrainers?.[searchedId] || [], filtered || [])) {
          setFilteredTypeTrainers((prev) => ({ ...prev, [String(searchedId)]: filtered }));
        }
      }
    },
    modifiedObject: searchedTrainersTypeIds,
  }, queryClient);

  const { data: filteredTypeTrainersData = {},
    isLoading: isLoadingSearchAvailableTypeTrainers, 
    isLoadingSingleQuery: isLoadingSingleTypeTrainer,
    isError: isErrorSearchAvailableTypeTrainers,
    error: errorSearchAvailableTypeTrainers,
    isSuccess: isSuccessUpdateFilteredTypeTrainers,
  } = searchedTypeTrainers;

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
    return axios.post(`${API_BASE_URL}/group/${projectId}/group-trainers`, {
        trainerId,
        groupId,
      });
  };

  const addTrainerToGroupOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic addTrainerToGroup", {oldData, values});
    if (values === undefined) {
      return oldData;
    }
    
    const newValue = { idOfGroup: oldData?.idOfGroup
      , data: {
        success: oldData?.data?.success, 
        trainers: [...oldData?.data?.trainers, values?.trainerData]
      }};   

    return newValue;
  };

  const addTrainerToGroupMutation = useUpdateTrainersList(
    ['trainersByGroupQueries'], // klucz stanu 
    ({trainerId, groupId}) => addTrainerToGroup({trainerId, groupId}), // funkcja aktualizująca dane w bazie   
    addTrainerToGroupOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    {
      loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany do grupy!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca do grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    toasterState,
  );



  /// #1 koniec 

  


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

  const removeTrainerFromGroupOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic removeTrainerFromGroup", {oldData, values});
    if (values === undefined) {
      return oldData;
    }
    
    const newTrainersList = oldData?.data?.trainers.filter( item => item.id !== values?.trainerData?.id );
    const newValue = { idOfGroup: oldData?.idOfGroup
      , data: {
        success: oldData?.data?.success, 
        trainers: newTrainersList
      }};   

    return newValue;
  };

  const removeTrainerFromGroupMutation = useUpdateTrainersList(
    ['trainersByGroupQueries'], // klucz stanu 
    ({trainerId, groupId}) => removeTrainerFromGroup({trainerId, groupId}), // funkcja aktualizująca dane w bazie   
    removeTrainerFromGroupOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { 
      loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty z grupy!" },
      error: { description: "Błąd podczas usuwania szkoleniowca z grupy." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    toasterState,
  );

  /// #3 koniec 

  

  const fetchAllTrainersForType = async (projectId, typeId) => {
    
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}`);
    const toasterSuffix = ['type', typeId];
    
    if (!response.data.success) {
      updateToaster('error', toasterSuffix);
      throw(new Error("Błąd podczas pobierania szkoleniowców:"));
    }
    updateToaster('success', toasterSuffix);
    return { data: response.data, idOfType: typeId };
   };

   const allTrainersForTypesQueryResult = useQueries({
    queries: (projectTypes || []).map((type) => {
      return {
        queryKey: ['trainersByTypeQueries', projectId, 'type', type.id],
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
    return axios.post(`${API_BASE_URL}/projects/${projectId}/trainers`, { trainerId, typeId });
  };

  const addTrainerToTypeOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic addTrainerToType", {oldData, values});
    if (values === undefined) {
      return oldData;
    }
    
    const newValue = { idOfType: oldData?.idOfType
      , data: {
        success: oldData?.data?.success, 
        trainers: [...oldData?.data?.trainers, values?.trainerData]
      }};   

    return newValue;
  };

  const addTrainerToTypeMutation = useUpdateTrainersList(
    ['trainersByTypeQueries'], // klucz stanu 
    ({trainerId, typeId}) => addTrainerToType({trainerId, typeId}), // funkcja aktualizująca dane w bazie   
    addTrainerToTypeOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa przypisowanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został przypisany!" },
      error: { description: "Błąd podczas przypisywania szkoleniowca." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    toasterState,
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
    return axios.delete(`${API_BASE_URL}/projects/${projectId}/trainers/${typeId}/${trainerId}`);
  };

  const removeTrainerFromTypeOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic removeTrainerToType", {oldData, values});
    if (values === undefined) {
      return oldData;
    }
    
    const newTrainersList = oldData?.data?.trainers.filter( item => item.id !== values?.trainerData?.id );
    const newValue = { idOfType: oldData?.idOfType
      , data: {
        success: oldData?.data?.success, 
        trainers: newTrainersList
      }};   

    return newValue;
  };

  const removeTrainerFromTypeMutation = useUpdateTrainersList(
    ['trainersByTypeQueries'], // klucz stanu 
    ({trainerId, typeId}) => removeTrainerFromType({trainerId, typeId}), // funkcja aktualizująca dane w bazie   
    removeTrainerFromTypeOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { loading: { description: "Proszę czekać, trwa usuwanie szkoleniowca..." },
      success: { description: "Szkoleniowiec został usunięty!" },
      error: { description: "Błąd podczas usuwania szkoleniowca." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    toasterState
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
  
  /* const searchAvailableTrainersTypeFunc = async (variables) => {
    const {searchId:searchId, searchQuery: query, searchContext: context} = variables;

    console.log("REFREASH searchAvailableTrainersTypeFunc", variables);
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
 */
  /* const searchAvailableTrainersGroupFunc = async (variables) => {
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
    
  };  */
  
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
  
  /* const { data: filteredTypeTrainersData,
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
    }} ); */
  
  if (isErrorSearchAvailableTypeTrainers) {
    console.log("Błąd podczas wyszukiwania szkoleniowców:",
      errorSearchAvailableTypeTrainers.response?.data 
      || errorSearchAvailableTypeTrainers.message);
  }

  

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
          <h3 className="text-lg font-semibold mb-2">{type.type} </h3>
          {/* Lista przypisanych szkoleniowców */}            
          <ul>
            { (isLoadingTrainersTypes) 
            ? getRenderLoadingSpiner()
            : (getIsLoadingType(type, tIndex)) 
              ? getRenderLoadingSpiner() 
              : getTrainersByType(type, tIndex)?.map((trainer, index) => (
              <li key={trainer.id +'_' + type.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                <span>{trainer.name}</span>
                <button
                  onClick = {() => {
                    setCallerMutationType('remove');
                    removeTrainerFromTypeMutation.mutate({
                      trainerData: trainer,
                      trainerId: trainer.id, 
                      typeId: type.id,
                      trainerIndex: index,
                      additionalQueryKey: [projectId, 'type', type.id],
                      toasterSuffix: ['type', type.id]
                    });
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </li>
              )) || <p>Brak przypisanych szkoleniowców</p> }
              </ul>

              {/* Sekcja Dodawania szkoleniowców */}
              <div className="mt-4" >
                
                <h4 className="font-semibold mb-2">Dodaj szkoleniowca:</h4>             
                <InputGroup endElement={ 
                  isLoadingSingleTypeTrainer?.[type?.id]?.isLoading ? getRenderLoadingSpiner() : null} >
                  <Input 
                    type="text"
                    placeholder="Wyszukaj szkoleniowca dla typu..."
                    value={typeSearchQueries[type.id]?.query || ""} // Korzystaj z typowego stanu
                    onChange={(e) => {
                      const query = e.target.value;
                      const typeId = type.id;
                     
                      if (!searchedTypeTrainers?.handleOnSearch) return;
                      searchedTypeTrainers.handleOnSearch( () => {
                        setSearchedTrainerTypeId(typeId);
                        setSearchedTrainersTypeIds((prev) => ({ ...prev, [type.id]: query }));
                        setTypeSearchQueries((prev) => ({ ...prev, [type.id]: { query, isLoading:false } })); // Aktualizuj typowy stan
                      });
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
                      setCallerMutationType('add');
                      addTrainerToTypeMutation.mutate({
                        trainerData: trainer,
                        trainerId: trainer.id, 
                        typeId: type.id, 
                        trainerIndex: index,
                        additionalQueryKey: [projectId, 'type', type.id],
                        toasterSuffix: ['type', type.id]
                      });
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
            <h4 className="text-lg font-semibold mb-2">{group.name}</h4>
            <ul>
              { getIsLoadingGroup(group, gIndex)
              ? getRenderLoadingSpiner() 
              : (getTrainersByGroup(group, gIndex))?.map((trainer, index) => (
              <li key={trainer.id + '_' + group.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                <span>{trainer.name}</span>
                <button
                  onClick = {() => {
                    setCallerMutationType('remove');
                    removeTrainerFromGroupMutation.mutate({  
                      trainerData: trainer,                      
                      trainerId: trainer.id, 
                      groupId: group.id,
                      trainerIndex: index,
                      additionalQueryKey: [projectId, 'group', group.id],
                      toasterSuffix: ['group', group.id]
                  });  
                }}
                  
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </li>
              )) || <p>Brak przypisanych szkoleniowców</p> }
            </ul>

            <div className="mt-4"> 
            <InputGroup endElement={
              isLoadingSingleGroupTrainer?.[group?.id]?.isLoading ? getRenderLoadingSpiner() : null
              }>
              <Input 
                type="text"
                placeholder="Wyszukaj szkoleniowca (po imieniu lub umiejętnościach)..."
                value={groupSearchQueries[group.id]?.query || ""} // Korzystaj z typowego stanu
                onChange={(e) => {
                  const query = e.target.value;
                  const groupId = group.id;
                  
                  if (!searchedGroupTrainers?.handleOnSearch) return;
                  searchedGroupTrainers.handleOnSearch( () => {
                    setSearchedTrainerGroupId(groupId);
                    setSearchedTrainersGroupIds((prev) => ({ ...prev, [groupId]: query}));
                    setGroupSearchQueries((prev) => ({ ...prev, [groupId]: { query, isLoading: false } })); // Aktualizuj typowy 
                  });
                }}
                className="bg-white border border-gray-300 p-2 rounded w-full mb-2"
              />    
            </InputGroup> 
            <ul>
              {filteredGroupTrainers[group?.id]?.map((trainer, index) => (
              <li key={trainer.id + "_" + group.id + "_" + index} className="flex justify-between items-center p-2 border-b">
                <span>{trainer.name}</span>
                <button
                  onClick={() => {
                    setCallerMutationType('add');
                    addTrainerToGroupMutation.mutate({
                      trainerData: trainer,
                      trainerId: trainer.id, 
                      groupId: group.id,
                      trainerIndex: index,
                      additionalQueryKey: [projectId, 'group', group.id],
                      toasterSuffix: ['group', group.id]
                    });
                  }}
                  className={`${
                    getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-3 py-1 rounded`}
                  disabled={(getIsLoadingGroup(group, gIndex)) 
                    ? getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id)
                    : false}
                >{(getTrainersByGroup(group, gIndex)?.some((t) => t.id === trainer.id))
                    ? "Dodano"
                    : "Dodaj"
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
