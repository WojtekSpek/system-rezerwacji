import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectParticipants({ projectId, setView, setSelectedParticipant }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allParticipants, setAllParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [projectParticipants, setProjectParticipants] = useState([]);

  useEffect(() => {
    fetchAllParticipants();
    fetchProjectParticipants();
  }, []);

  const fetchAllParticipants = async () => {
    try {
      const response = await axios.get("/participants"); // Pobranie wszystkich uczestników
      if (response.data.success) {
        setAllParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania wszystkich uczestników:", error);
    }
  };

  const fetchProjectParticipants = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants`); // Pobranie uczestników projektu
      if (response.data.success) {
        setProjectParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników projektu:", error);
    }
  };

  useEffect(() => {
    setFilteredParticipants(
      allParticipants.filter((participant) =>
        `${participant.firstName} ${participant.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allParticipants]);

  const addParticipantToProject = async (participantId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/participants`, {
        participantId,
      });
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę uczestników projektu
      }
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika do projektu:", error);
    }
  };

  const removeParticipantFromProject = async (participantId) => {
    try {
      const response = await axios.delete(
        `/projects/${projectId}/participants/${participantId}`
      );
      if (response.data.success) {
        fetchProjectParticipants(); // Odśwież listę uczestników projektu
      }
    } catch (error) {
      console.error("Błąd podczas usuwania uczestnika z projektu:", error);
    }
  };

  const isParticipantInProject = (participantId) => {
    return projectParticipants.some((p) => p.id === participantId);
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant); // Ustaw wybranego uczestnika
    setView("projectParticipantDetails"); // Przejdź do widoku szczegółów uczestnika
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
            <span
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleParticipantClick(participant)} // Kliknięcie w uczestnika
            >
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
                className={`${
                  isParticipantInProject(participant.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-3 py-1 rounded`}
                disabled={isParticipantInProject(participant.id)}
              >
                {isParticipantInProject(participant.id) ? "Dodano" : "Dodaj"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectParticipants;
