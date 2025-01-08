import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProjectParticipants({ setView, setSelectedParticipant }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [projectParticipants, setProjectParticipants] = useState([]);
  const [hoursByParticipant, setHoursByParticipant] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { id: projectId } = useParams();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();

  // Pobieranie uczestników projektu
  const fetchProjectParticipants = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants`);
      if (response.data.success) {
        setProjectParticipants(response.data.participants);
        console.log('response.data.participants',response.data.participants)
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników projektu:", error);
    }
  };

  // Pobieranie godzin uczestnika
  const fetchParticipantHours = async (participantId) => {
    try {
      const response = await axios.get(`/participants/${projectId}/participants/${participantId}/hours`);
      if (response.data.success) {
        setHoursByParticipant((prev) => ({
          ...prev,
          [participantId]: response.data.hours,
        }));
        console.log('response.data.hours',response.data.hours)
      }
    } catch (error) {
      console.error("Błąd podczas pobierania godzin uczestnika:", error);
    }
  };

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

  // Pobieranie uczestników projektu i ich godzin
  useEffect(() => {
    fetchProjectParticipants();
  }, [projectId]);

  useEffect(() => {
    projectParticipants.forEach((participant) => fetchParticipantHours(participant.id));
  }, [projectParticipants]);

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
                    projectParticipants.some((p) => p.id === participant.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-3 py-1 rounded`}
                  disabled={projectParticipants.some((p) => p.id === participant.id)}
                >
                  {projectParticipants.some((p) => p.id === participant.id) ? "Dodano" : "Dodaj"}
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
            <span className="font-bold">{projectParticipants.length}</span>
          </p>
        </div>
        {projectParticipants.map((participant) => (
          <li key={participant.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleViewDetails(participant.id)}
              >
                {participant.firstName} {participant.lastName}
              </span>
              <div className="mt-2 text-gray-600 text-sm">
                {hoursByParticipant[participant.id] ? (
                  hoursByParticipant[participant.id].map((hour) => (
                    <div key={hour.typeId} className="flex justify-between">
                      <span>
                        <b>{hour.typeName}:</b> {hour.assignedHours} / {hour.plannedHours} godzin
                      </span>
                      <span className="ml-4">Zaplanować: {hour.remainingHours} godzin</span>
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
    </div>
  );
}

export default ProjectParticipants;
