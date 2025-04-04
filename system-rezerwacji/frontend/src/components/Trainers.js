import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenericList from "./GenericList";
import { useQuery } from "@tanstack/react-query";
import { ProgressCircle } from "@chakra-ui/react";

import urlProvider from "../urlProvider";

function Trainers() {
  // @1 const [trainers, setTrainers] = useState([]); // Lista szkoleniowców
  const [trainerName, setTrainerName] = useState(""); // Imię i nazwisko szkoleniowca
  const [trainerTypes, setTrainerTypes] = useState([]); // Lista typów szkoleń
  const [selectedTypes, setSelectedTypes] = useState([]); // Typy szkoleń dla danego szkoleniowca
  const [successMessage, setSuccessMessage] = useState(""); // Komunikat o sukcesie
  const [showAddForm, setShowAddForm] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();

  const navigate = useNavigate(); // Hook do nawigacji

  // Pobierz listę szkoleniowców i typów szkoleń z backendu
  useEffect(() => {
    fetchTrainers();
    fetchTrainingTypes();
  }, []);

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

  const fetchTrainingTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/Types`);
      if (response.data.success) {
        setTrainerTypes(response.data.data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów szkoleń:", error);
    }
  };

  const handleAddTrainer = async () => {
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
  };

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
  };
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
                        <button
                              onClick={() => handleDeleteTrainer(trainer.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Usuń
                                </button>
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
                        onClick={handleAddTrainer}
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
