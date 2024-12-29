import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Calendar2 from "./ProjectParticipantDetails/GroupTrainingCalendar";


function ProjectGroupTrainingDetails() {
  const [activeTab, setActiveTab] = useState("details");
  const [projectParticipants, setProjectParticipants] = useState([]); // Uczestnicy projektu
  const [groupParticipantIds, setGroupParticipantIds] = useState([]);
  const [groupTrainers, setGroupTrainers] = useState([]); // Szkoleniowcy dla grupy
  const [trainingParticipants, setTrainingParticipants] = useState([]); // Uczestnicy szkolenia
  const [searchQuery, setSearchQuery] = useState(""); // Wyszukiwanie uczestników
  const { id } = useParams(); // ID projektu z URL
  const { id_gr } = useParams(); // ID szkolenia grupowego z URL
  const navigate = useNavigate();
  const projectId = id;
  const trainingId = id_gr;
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    fetchProjectParticipants();
    fetchTrainingParticipants();
    fetchGroupTrainers();
    loadGroupName();
  }, []);
  console.log('groupParticipantIds',groupParticipantIds)
  const loadGroupName = async () => {
    const name = await fetchGroupName(trainingId);
    if (name) {
      setGroupName(name); // Ustaw nazwę grupy w stanie
    }
  };

  const fetchGroupName = async (groupId) => {
    try {
      const response = await axios.get(`/group/${groupId}/name`);
      if (response.data.success) {
        return response.data.name;
      } else {
        console.error("Błąd: Nie udało się pobrać nazwy grupy.");
      }
    } catch (error) {
      console.error("Błąd podczas pobierania nazwy grupy:", error);
    }
  };

  // Pobieranie uczestników przypisanych do projektu
  const fetchProjectParticipants = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants`);
      if (response.data.success) {
        setProjectParticipants(response.data.participants);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników projektu:", error);
    }
  };

  // Pobieranie uczestników przypisanych do szkolenia
  const fetchTrainingParticipants = async () => {
    try {
      const response = await axios.get(`group/group-trainings/${trainingId}/participants`);
      if (response.data.success) {
        setTrainingParticipants(response.data.participants);
        // Ustawienie listy ID uczestników w stanie
        setGroupParticipantIds(response.data.participants.map((p) => p.id));
        // Usunięcie uczestników już przypisanych do szkolenia z listy projektu
        setProjectParticipants((prev) =>
          prev.filter(
            (participant) =>
              !response.data.participants.some((tp) => tp.id === participant.id)
          )
        );
      }
    } catch (error) {
      console.error("Błąd podczas pobierania uczestników szkolenia:", error);
    }
  };

  // Dodawanie uczestnika do szkolenia
  const addParticipantToTraining = async (participantId) => {
    try {
      await axios.post(`group/group-trainings/${trainingId}/participants`, { participantId });

      // Dodaj do listy uczestników szkolenia
      const addedParticipant = projectParticipants.find((p) => p.id === participantId);
      setTrainingParticipants((prev) => [...prev, addedParticipant]);

      // Usuń z listy uczestników projektu
      setProjectParticipants((prev) => prev.filter((p) => p.id !== participantId));
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika do szkolenia:", error);
    }
  };

  // Usuwanie uczestnika ze szkolenia
  const removeParticipantFromTraining = async (participantId) => {
    try {
      await axios.delete(`group/group-trainings/${trainingId}/participants/${participantId}`);

      // Usuń z listy uczestników szkolenia
      const removedParticipant = trainingParticipants.find((tp) => tp.id === participantId);
      setTrainingParticipants((prev) => prev.filter((tp) => tp.id !== participantId));

      // Dodaj z powrotem do listy uczestników projektu
      setProjectParticipants((prev) => [...prev, removedParticipant]);
    } catch (error) {
      console.error("Błąd podczas usuwania uczestnika ze szkolenia:", error);
    }
  };
  const fetchGroupTrainers = async () => {
    try {
      const response = await axios.get(
        `/group/${projectId}/group-trainers/${trainingId}`
      );
      
      if (response.data.success) {
        setGroupTrainers(response.data.trainers);
        
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };
  console.log('groupTrainers',groupTrainers)
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Szczegóły szkolenia grupowego - {groupName}</h3>
      <div className="flex gap-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-2 ${activeTab === "details" ? "border-b-2 border-blue-500" : ""}`}
        >
          Szczegóły
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`pb-2 ${activeTab === "participants" ? "border-b-2 border-blue-500" : ""}`}
        >
          Uczestnicy
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`pb-2 ${activeTab === "calendar" ? "border-b-2 border-blue-500" : ""}`}
        >
          Kalendarz
        </button>
      </div>

      {activeTab === "details" && <div>Szczegóły szkolenia</div>}

      {activeTab === "participants" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Uczestnicy szkolenia</h2>

          {/* Wyszukiwanie uczestników */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Wyszukaj uczestnika..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          {/* Lista uczestników szkolenia */}
          <h3 className="font-semibold mb-2">Lista uczestników szkolenia:</h3>
          <ul>
            {trainingParticipants.map((participant) => (
              <li
                key={participant.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>
                  {participant.firstName} {participant.lastName}
                </span>
                <button
                  onClick={() => removeParticipantFromTraining(participant.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>

          {/* Dodawanie uczestników */}
          <h3 className="font-semibold mt-4 mb-2">Dodaj uczestnika:</h3>
          <ul>
            {projectParticipants
              .filter((participant) =>
                `${participant.firstName} ${participant.lastName}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((participant) => (
                <li
                  key={participant.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>
                    {participant.firstName} {participant.lastName}
                  </span>
                  <button
                    onClick={() => addParticipantToTraining(participant.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Dodaj
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {activeTab === "calendar" && <div>Kalendarz zajęć
        
        <Calendar2 
          trainers={groupTrainers} 
          groupName={groupName}
          groupParticipantIds={groupParticipantIds}
          />
        
        </div>}
    </div>
  );
}

export default ProjectGroupTrainingDetails;
