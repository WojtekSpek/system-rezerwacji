import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {Spinner, Stack,ChakraProvider,Box,HStack,Avatar, Checkbox, Card, CardHeader, CardBody, CardFooter, Button,Progress, ProgressRoot,ProgressLabel,useProgressStyles } from "@chakra-ui/react";

function ProjectParticipants({ setView, setSelectedParticipant }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  
  const [hoursByParticipant, setHoursByParticipant] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { id: projectId } = useParams();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();

 // Obsługa kliknięcia poza komponentem
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  /// zastąpienie popbierania 'axios' użyciem 'useQuery'

  const fetchParticipantsWithHours = async (projectId) => {
    const response = await axios.get(`/projects/${projectId}/participants-with-hours`);
    if (!response.data.success) {
      //setProjectParticipants(response.data.participants);
      console.log("response.data.participants", response.data.participants);
      throw(new Error("Błąd podczas pobierania uczestników i godzin: "));
      
    } 
    
    return response.data.participants;
  };

  // Użyj React Query do pobrania uczestników projektu (godzin) i czasu zajęć
  const { data: projectParticipants = [], 
    isLoading: isLoadingParticipantsWithHours, 
    isError: isErrorParticipanstWithHours } = useQuery({
    queryKey: ["projectParticipantsWithHours", projectId], // ✅ Klucz zapytania
    queryFn: () => fetchParticipantsWithHours(projectId), // ✅ Funkcja pobierająca dane
  });

  if (isErrorParticipanstWithHours) {
    console.error("Nie udało się pobrać uczestników i godzin.");
  }

  // Pobieranie uczestników projektu i ich godzin
  useEffect(() => {
    if (!projectId) return; // Zapobiega wywołaniu zapytania, jeśli nie ma ID projektu
      fetchParticipantsWithHours(projectId);
  }, [projectId]); // Zależność od `projectId`
  
  /// koniec zmiany sposobu pobierania danych fetchParticipantsWithHours

  // Pobieranie uczestników projektu
  const fetchProjectParticipants = async (projectId) => {
    const response = await axios.get(`/projects/${projectId}/participants`);
    if (!response.data.success) {
      throw new Error("Błąd podczas pobierania uczestników projektu");
    }
    return response.data.participants; 
  };
  // Użyj React Query do pobrania uczestników projektu
  const { data: participants = [], isLoadingParticipants, isError } = useQuery({
    queryKey: ["projectParticipants", projectId], // ✅ Klucz zapytania
    queryFn: () => fetchProjectParticipants(projectId), // ✅ Funkcja pobierająca dane
  });
  

  if (isLoadingParticipants || isLoadingParticipantsWithHours) {
    return  <div className="flex items-center justify-center h-screen"><ChakraProvider><Spinner
    size="lg"
    color="colorPalette.600"
    
  /></ChakraProvider></div>;
  }

  if (isError || isErrorParticipanstWithHours) {
    return (
      <div className="text-red-500">
        Wystąpił błąd podczas pobierania danych uczestników projektu.
      </div>
    );
  }

  // Wyszukiwanie uczestników
  const searchParticipants = async (query) => {
    try {
      const response = await axios.get(`/participants/search`, { params: { query } });
      console.log("Otrzymane wyniki wyszukiwania:", response.data.participants);
      if (response.data.success) {
        setFilteredParticipants(response.data.participants);
        setIsDropdownVisible(true);
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania uczestników:", error);
    }
  };

  // Dodawanie uczestnika do projektu
  const addParticipantToProject = async (participantId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/participants`, { participantId });
      if (response.data.success) {
        fetchProjectParticipants();
        setSearchQuery("");
        setFilteredParticipants([]);
        setIsDropdownVisible(false);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika:", error);
    }
  };

  // Usuwanie uczestnika z projektu
  const removeParticipantFromProject = async (participantId) => {
    try {
      const response = await axios.delete(`/projects/${projectId}/participants/${participantId}`);
      if (response.data.success) {
        fetchProjectParticipants();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania uczestnika:", error);
    }
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      searchParticipants(query);
    } else {
      setFilteredParticipants([]);
      setIsDropdownVisible(false);
    }
  };

  const handleViewDetails = (participantId) => {
    setSelectedParticipant(participantId);
    navigate(`/projects/${projectId}/participants/${participantId}/details`);
  };
  console.log('projectParticipants',projectParticipants)
  return (
    <div className="w-full bg-white p-4 rounded shadow hover:shadow-md">
      
    
      {/* Sekcja wyszukiwania i dodawania uczestników */}
      <div className="mt-6 relative" ref={dropdownRef}>
        <h3 className="font-semibold mb-2">Dodaj uczestnika:</h3>
        <input
          type="text"
          placeholder="Wyszukaj uczestnika..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        {isDropdownVisible && filteredParticipants.length > 0 && (
          <ul className="absolute bg-white border rounded shadow w-full mt-2 z-10">
            {filteredParticipants.map((participant) => (
              <li
                key={participant.id}
                className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
              >
                <span>
                  {participant.firstName} {participant.lastName}
                </span>
                <button
                  onClick={() => addParticipantToProject(participant.id)}
                  className={`${
                    participants.some((p) => p.id === participant.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-3 py-1 rounded`}
                  disabled={participants.some((p) => p.id === participant.id)}
                >
                  {participants.some((p) => p.id === participant.id) ? "Dodano" : "Dodaj"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista uczestników projektu */}
      <h2 className="text-2xl font-bold mb-4">Uczestnicy projektu</h2>
      <ul>
      <div className="mt-2">
          <p className="text-gray-600">
            Liczba uczestników dodanych do projektu:{" "}
            <span className="font-bold">{participants.length}</span>
          </p>
        </div>
        {projectParticipants.map((participant) => (
          <li key={participant.participantId} className="flex justify-between items-center p-4 border-b">
            <div>
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleViewDetails(participant.participantId)}
              >
                {participant.firstName} {participant.lastName}
              </span>
              <div className="mt-2 text-gray-600 text-sm">
                
                {participant.types ? (
                  Object.values(participant.types).map((type) => {
                    // Formatowanie totalHours
                    
                    const formattedTotalHours = Number.isInteger(parseFloat(type.totalHours))
                      ? parseInt(type.totalHours, 10) // Jeśli całkowita, pokaż bez miejsc po przecinku
                      : parseFloat(type.totalHours).toFixed(1); // Jeśli nie, pokaż 1 miejsce po przecinku

                    // Wyświetlenie danych
                    return (
                      <div key={type.typeName} className="flex justify-between">
                        <span>
                          <b>{type.typeName}:</b> {formattedTotalHours} / {type.plannedHours} h
                        </span>
                        <span className="ml-4">
                        Zaplanować:{" "}
                          {Math.max(0, type.plannedHours - type.totalHours) % 1 === 0
                            ? Math.max(0, type.plannedHours - type.totalHours).toFixed(0) // Jeśli liczba całkowita
                            : Math.max(0, type.plannedHours - type.totalHours).toFixed(1) // Jeśli dziesiętna
                          }  h
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <span>Brak danych o typach godzin</span>
                )}
              </div>
            </div>
            <button
              onClick={() => removeParticipantFromProject(participant.participantId)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Usuń
            </button>
          </li>
        ))}

      </ul>

       
    </div>
  );
}

export default ProjectParticipants;
