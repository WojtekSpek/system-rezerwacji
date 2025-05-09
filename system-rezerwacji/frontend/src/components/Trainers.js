import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenericList from "./GenericList";
import { useQuery } from "@tanstack/react-query";
import { ProgressCircle, Button, Dialog } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";

import urlProvider from "../urlProvider";
import { useUpdateData } from "../hooks/useUpdateData";

function Trainers() {
  // @1 const [trainers, setTrainers] = useState([]); // Lista szkoleniowców
  const [trainerName, setTrainerName] = useState(""); // Imię i nazwisko szkoleniowca
  // @1 const [trainerTypes, setTrainerTypes] = useState([]); // Lista typów szkoleń
  const [selectedTypes, setSelectedTypes] = useState([]); // Typy szkoleń dla danego szkoleniowca
  const [successMessage, setSuccessMessage] = useState(""); // Komunikat o sukcesie
  const [showAddForm, setShowAddForm] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();

  const navigate = useNavigate(); // Hook do nawigacji
  const [focusOnId, setFocusOnId] = useState(null); // pokazuje stronę zawierającą uczestnika o konkretnym id

  // Pobierz listę szkoleniowców i typów szkoleń z backendu
  /* @1 useEffect(() => {
    //fetchTrainers();
    //fetchTrainingTypes();
  }, []); */

  /// @1 zmina na useQuery 
  /* const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers`);
      if (response.data.success) {
        setTrainers(response.data.trainers);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  }; */
  
     /// Użyj React Query do pobrania grup projektu
    const fetchTrainers = async () => {
    const response = await axios.get(`${API_BASE_URL}/trainers`);
        
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania szkoleniowców."));
      }
      
      return response.data.trainers;
    }; 
    
    const { data: trainers = [],
      isLoading: isLoadingTrainers, 
      isError: isErrorLoadingTrainers,
      error: errorLoadingTrainers } = useQuery({
      queryKey: ["trainers"],
      queryFn: () => fetchTrainers(),
    });
  
    if (isErrorLoadingTrainers) {
      console.log("Błąd podczas pobierania szkoleniowców:", errorLoadingTrainers);
    }
    /// @1 koniec

  /* const fetchTrainingTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/Types`);
      if (response.data.success) {
        setTrainerTypes(response.data.data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów szkoleń:", error);
    }
  }; */

  const fetchTrainingTypes = async () => {
    const response = await axios.get(`${API_BASE_URL}/trainers/Types`);
        
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania typów szkoleń."));
      }
      
      return response.data.data;
  }; 
  
  const { data: trainerTypes = [],
    isLoading: isLoadingTrainerTypes, 
    isFetching: isFetchingTrainerTypes,
    isError: isErrorLoadingTrainerTypes,
    error: errorLoadingTrainerTypes } = useQuery({
    queryKey: ["trainerTypes"],
    queryFn: () => fetchTrainingTypes(),
  });
  
  /* @1 const handleAddTrainer = async () => {
    if (!trainerName || selectedTypes.length === 0) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/trainers/addTrainer`, {
        name: trainerName,
        types: selectedTypes,
      });

      if (response.data.success) {
        setSuccessMessage("Szkoleniowiec został pomyślnie dodany!");
        fetchTrainers(); // Odśwież listę szkoleniowców
        setTrainerName(""); // Wyczyść formularz
        setSelectedTypes([]);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
    }
  }; */

  let toasterState = useRef('');
      
  const addTrainer = async () => {
    if (!trainerName || selectedTypes.length === 0) {
      throw new Error("Wypełnij wszystkie pola!");
    }      
      
    try {
      const response = await axios.post(`${API_BASE_URL}/trainers/addTrainer`, {
        name: trainerName,
        types: selectedTypes,
      });

      if (response.data.success) {
        setSuccessMessage("Szkoleniowiec został pomyślnie dodany!");
        setFocusOnId(trainers?.length - 1);
        setTrainerName(""); // Wyczyść formularz
        setSelectedTypes([]);
        setShowAddForm(false);
      }
    } 
    catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
      throw new Error("Błąd podczas dodawania szkoleniowca:", error.response.data);
    }
    
  };
  
  const addTrainerOptimistic = (oldData, values, queryKey) => {
    const newTrainer = {name: values.name, types: [...values.types]};
    console.log("Optimistic updateParticipantDetail", {oldData, values, newTrainer});
    if (values === undefined) {
      console.warn("updateParticipantDetailOptimistic values are: undefined");
      return oldData;
    }
    
    setFocusOnId(oldData.length);
    return [...oldData, {...newTrainer}];
  };

  const addTrainerMutation = useUpdateData(
    ["trainers"], // klucz stanu 
    async () => await addTrainer(), // funkcja aktualizująca dane w bazie   
    addTrainerOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa zapisywanie szkoleniowca..." },
      success: { description: "Dane szkoleniowca zostały zaktualizowane!" },
      error: { description: "Błąd podczas zapisywania danych szkoleniowca." } 
    },
    toasterState,
  );
  
  /* @1 
  const handleDeleteTrainer = async (trainerId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego szkoleniowca?")) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/trainers/deleteTrainer/${trainerId}`);
      if (response.data.success) {
        fetchTrainers(); // Odśwież listę szkoleniowców
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
    }
  }; */

  const removeTrainer = async ({trainerId}) => {  
    try {
      const response = await axios.delete(`${API_BASE_URL}/trainers/deleteTrainer/${trainerId}`);
      
      if (!response.data.success) {
        throw (new Error("Błąd podczas usuwania szkoleniowca: ", response.error));
      }

      return response;
    } 
    catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
      throw (new Error("Błąd podczas usuwania szkoleniowca:", error.message));
    }

  };

  const removeTrainerOptimistic = (oldData, values, queryKey) => {
    const trainerId = values?.trainerId;
    console.log("Optimistic removeTrainerOptimistic", {oldData, values, trainerId});
    if (values === undefined) {
      console.warn("removeTrainerOptimistic values are: undefined");
      return oldData;
    }
   
    const idOfRemoved = oldData?.findIndex((elem) => elem.id === trainerId) - 1;
    const newTrainersList = oldData?.filter( item => item.id !== trainerId );
    setFocusOnId((idOfRemoved >= 0) ? idOfRemoved : 0);
    return newTrainersList;
  };

  const removeTrainerMutation = useUpdateData(
    ["trainers"], // klucz stanu 
    async ({trainerId}) => await removeTrainer({trainerId}), // funkcja aktualizująca dane w bazie   
    removeTrainerOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa zapisywanie danych..." },
      success: { description: "Szkoleniowiec zostały usunięty!" },
      error: { description: "Błąd podczas usuwania szkoleniowca." } 
    },
    toasterState,
  );

  const searchFunction = (trainer, query) => {
    console.log('tra',trainer,)
    console.log('query',query)
    query = query.toLowerCase();
    return (
      trainer.name.toLowerCase().includes(query) || 
      trainer.email?.toLowerCase().includes(query)||
      trainer.phone?.toLowerCase().includes(query)
      
    );
  };
  const handleViewDetails = (trainerId) => {
    setFocusOnId(trainers.findIndex(item => item.id === trainerId));
    navigate(`/trainer/${trainerId}`);
  };

  /// @1 dodanie Spinnera (ProgressCircle)
  if (isLoadingTrainers) {
    return  (<div className="flex items-center justify-center h-screen">
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
          {!showAddForm ? (
            <>
               <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-4">Zarządzanie szkoleniowcami</h2>
                      <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                          Dodaj szkoleniowca
                        </button>
               </div>
               <h3 className="font-semibold mb-2">Lista szkoleniowców:</h3>
               <GenericList
                  items={trainers}
                  focusOnId={focusOnId} 
                  columns={[
                    { key: "firstName", label: "Imię Nazwisko" },
                   
                    { key: "pesel", label: "Tel" },
                    { key: "email", label: "Email" },
                    { key: "type", label: "Typ" },
                    { key: "actions", label: "Akcje" }, // Dodatkowa kolumna
                  ]}
                  renderItem={(trainer) => (
                    <>
                      <td className="border px-4 py-2">{trainer.name}</td>
                      <td className="border px-4 py-2">{trainer.phone}</td>
                      <td className="border px-4 py-2">{trainer.email}</td>
                      <td className="border px-4 py-2">{trainer.types?.join(", ") || "Brak typów"}</td>
                      <td className="border px-4 py-2">
                       <div className="flex justify-between items-center space-x-2">
                        {/* <button
                              onClick={() => {
                                //handleDeleteTrainer(trainer.id);
                                removeTrainerMutation.mutate({
                                  toasterSuffix: ['add', 'participant'], 
                                  trainerId: trainer.id,
                                });
                              }}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Usuń
                          </button> */}
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
                                    <Dialog.Title size="sm">Usuwanie szkoleniowca</Dialog.Title>
                                  </Dialog.Header>
                                  <Dialog.Body size="sm">
                                    <p>
                                    Czy na pewno chcesz usunąć szkoleniowca: {trainer.name}?
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
                                          //handleDeleteTrainer(trainer.id);
                                          removeTrainerMutation.mutate({
                                            toasterSuffix: ['remove', 'trainer'], 
                                            trainerId: trainer.id,
                                          });
                                        }}
                                        > Usuń</Button>
                                    </Dialog.ActionTrigger>    
                                  </Dialog.Footer>
                                </Dialog.Content>
                              </Dialog.Positioner>
                            </Dialog.Root>
                          <button
                            onClick={() => handleViewDetails(trainer.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Szczegóły
                          </button>
                          </div>
                      </td>
                    </>
                  )}
                  searchFunction={searchFunction}
                />
                
                
                </>
                ) : (
                  <div className="mb-6">
                  <h3 className="font-semibold mb-2">Dodaj szkoleniowca:</h3>
                  {successMessage && <div className="text-green-500">{successMessage}</div>}
                  <input
                    type="text"
                    placeholder="Imię i nazwisko"
                    value={trainerName}
                    onChange={(e) => setTrainerName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mb-2"
                  />
                  <h4 className="font-semibold mb-2">Typy szkoleń:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trainerTypes.map((type) => (
                      <label key={type.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTypes.some((t) => t.id === type.id)}
                          onChange={() => {
                            if (selectedTypes.includes(type)) {
                              setSelectedTypes(selectedTypes.filter((t) => t !== type));
                            } else {
                              setSelectedTypes([...selectedTypes, type]);
                            }
                          }}
                        />
                        {type.type}
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Anuluj
                    </button>
                    <button
                        onClick={() => { 
                          addTrainerMutation.mutate({
                            name: trainerName,
                            types: selectedTypes, 
                            toasterSuffix: ['add', 'trainer'],
                          });
                          }}
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

export default Trainers;
