import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectParticipants({ projectId, project }) {
  const [searchQuery, setSearchQuery] = useState(""); // Wartość wyszukiwania
  const [allParticipants, setAllParticipants] = useState([]); // Lista wszystkich uczestników
  const [filteredParticipants, setFilteredParticipants] = useState([]); // Filtrowani uczestnicy
  const [projectParticipants, setProjectParticipants] = useState([]); // Uczestnicy przypisani do projektu

  useEffect(() => {
    fetchAllParticipants();
    fetchProjectParticipants();
    console.log("Otrzymane projectId:", projectId);
    console.log("Otrzymany project obiekt:", project);
  }, []);

  // Pobierz listę wszystkich uczestników
  const fetchAllParticipants = async () => {
    try {
      const response = await axios.get("/participants");
      if (response.data.success) {
        setAllParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników:", error);
    }
  };

  // Pobierz uczestników przypisanych do projektu
  const fetchProjectParticipants = async () => {
    console.log("Otrzymane projectId2:", projectId);
    console.log("Otrzymany project obiekt2:", project);
    try {
      const response = await axios.get(`/projects/${projectId}/participants`);
      if (response.data.success) {
        setProjectParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników projektu:", error);
    }
  };

  // Obsługa wyszukiwania
  useEffect(() => {
    setFilteredParticipants(
      allParticipants.filter((participant) =>
        `${participant.firstName} ${participant.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allParticipants]);

  // Dodawanie uczestnika do projektu
  const addParticipantToProject = async (participantId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/participants`, {
        participantId,
      });
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę uczestników projektu
        alert("Uczestnik został dodany do projektu!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika do projektu:", error);
    }
  };

  // Usuwanie uczestnika z projektu
  const removeParticipantFromProject = async (participantId) => {
    try {
      const response = await axios.delete(
        `/projects/${projectId}/participants/${participantId}`
      );
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę uczestników projektu
        alert("Uczestnik został usunięty z projektu!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania uczestnika z projektu:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Uczestnicy projektu</h2>
      <h3 className="font-semibold mb-2">Lista uczestników projektu:</h3>
      <ul>
        {projectParticipants.map((participant) => (
          <li
            key={participant.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>
              {participant.firstName} {participant.lastName}
            </span>
            <button
              onClick={() => removeParticipantFromProject(participant.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Dodaj uczestnika:</h3>
        <input
          type="text"
          placeholder="Wyszukaj uczestnika..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
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
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Dodaj
              </button>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}

export default ProjectParticipants;
