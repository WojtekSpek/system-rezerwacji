import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProjectParticipants({setView, setSelectedParticipant }) {
  const [searchQuery, setSearchQuery] = useState(""); // Wartość inputu do wyszukiwania
  const [filteredParticipants, setFilteredParticipants] = useState([]); // Wyniki filtrowania
  const [projectParticipants, setProjectParticipants] = useState([]); // Uczestnicy przypisani do projektu
  const [hoursByParticipant, setHoursByParticipant] = useState({}); // Godziny uczestników
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
 
  const navigate = useNavigate();

  const handleViewDetails = (participantId) => {
    setSelectedParticipant(participantId); // Ustaw wybranego uczestnika
    navigate(`/projects/${projectId}/participant/${participantId}/details`); // Nawiguj do szczegółów uczestnika
  };


  console.log('projectId',projectId)
  // Pobierz godziny dla uczestnika
  const fetchParticipantHours = async (participantId) => {
    try {
      const response = await axios.get(`/participants/${projectId}/participants/${participantId}/hours`);
      if (response.data.success) {
        setHoursByParticipant((prev) => ({
          ...prev,
          [participantId]: response.data.hours,
        }));
      }
      console.log('response.data',response.data);
      
    } catch (error) {
      console.error("Błąd podczas pobierania godzin uczestnika:", error);
    }
  };
  
  // Wywołanie funkcji dla wszystkich uczestników projektu
  useEffect(() => {
    projectParticipants.forEach((participant) => {
      fetchParticipantHours(participant.id);
    });
  }, [projectParticipants]);
  
  // Pobierz uczestników przypisanych do projektu
  useEffect(() => {
    fetchProjectParticipants();
  }, [projectId]);

  const fetchProjectParticipants = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants`);
      console.log('uczniowie',response.data)
      
      if (response.data.success) {
        setProjectParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników projektu:", error);
    }
  };

  // Wyszukaj uczestników na backendzie
  const searchParticipants = async (query) => {
    try {
      const response = await axios.get("/participants/", {
        params: { query }, // Przekazujemy wartość inputu jako parametr
      });
      if (response.data.success) {
        setFilteredParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania uczestników:", error);
    }
  };

  // Dodanie uczestnika do projektu
  const addParticipantToProject = async (participantId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/participants`, {
        participantId,
      });
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę
        setSearchQuery(""); // Wyczyszczenie inputu
        setFilteredParticipants([]); // Wyczyść wyniki wyszukiwania
      }
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika:", error);
    }
  };

  // Usunięcie uczestnika z projektu
  const removeParticipantFromProject = async (participantId) => {
    try {
      const response = await axios.delete(
        `/projects/${projectId}/participants/${participantId}`
      );
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę
      }
    } catch (error) {
      console.error("Błąd podczas usuwania uczestnika:", error);
    }
  };

  // Obsługa zmiany w input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      searchParticipants(query); // Wyszukaj tylko, jeśli wpisano coś w input
    } else {
      setFilteredParticipants([]); // Wyczyść wyniki, jeśli input jest pusty
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded  shadow hover:shadow-md">
      <h2 className="text-2xl font-bold mb-4">Uczestnicy projektu</h2>

      {/* Lista uczestników przypisanych do projektu */}
      <h3 className="font-semibold mb-2">Lista uczestników projektu:</h3>
      <ul>
        {projectParticipants.map((participant) => (
          <li
            key={participant.id}
            className="flex justify-between items-center p-2 border-b"
            style={{padding: "2.5rem 0"}}
          >
           <div>
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleViewDetails(participant.id)}
              >
                       
                {participant.firstName} {participant.lastName}
              </span>

              {/* Wyświetlanie godzin */}
              <div className="mt-2 ml-2 text-gray-600 text-sm">
                                  {hoursByParticipant[participant.id] ? (
                                    hoursByParticipant[participant.id].map((hour) => (
                                      <div key={hour.typeId} className="flex justify-between">
                                        <span>
                                          <b>{hour.typeName}:</b> {hour.assignedHours} / {hour.plannedHours} godzin
                                        </span>
                                        <span className="ml-4">
                                          Zaplanować: {hour.remainingHours} godzin
                                        </span>
                                      </div>
                                    ))
                                  ) : (
                                    <span>Ładowanie godzin...</span>
                                  )}
                </div>

            </div>
            <button
              onClick={() => removeParticipantFromProject(participant.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Usuń
            </button>
             
          </li>
        ))}
      </ul>

      {/* Sekcja wyszukiwania i dodawania uczestników */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Dodaj uczestnika:</h3>
        <input
          type="text"
          placeholder="Wyszukaj uczestnika..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        {filteredParticipants.length > 0 && (
          <ul>
            {filteredParticipants.map((participant) => (
              <li
                key={participant.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>
                  {participant.firstName} {participant.lastName}
                </span>
                <button
                  onClick={() => addParticipantToProject(participant.id)}
                  className={`${
                    projectParticipants.some((p) => p.id === participant.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-3 py-1 rounded`}
                  disabled={projectParticipants.some((p) => p.id === participant.id)}
                >
                  {projectParticipants.some((p) => p.id === participant.id)
                    ? "Dodano"
                    : "Dodaj"}
                </button>

               
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProjectParticipants;
