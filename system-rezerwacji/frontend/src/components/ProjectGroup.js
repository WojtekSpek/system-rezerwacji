import React, { useState, useEffect } from "react";
import axios from "axios";
//import Commentary from "./Commentary";
import { useParams, useNavigate } from "react-router-dom";

function GroupTrainings({setSelectedProject}) {
  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState({ name: "", hours: 0 });
  const { id } = useParams(); // Pobiera ID projektu z URL
  const navigate = useNavigate();
    const projectId = id;

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleViewDetails = (trainingid) => {
    //setSelectedProject({projectId}); 
    console.log('trainingid',trainingid)
    navigate(`/projects/${projectId}/Group/${trainingid}`); 
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`group/group-trainings/${projectId}`);
      setTrainings(response.data.trainings);
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleń grupowych:", error);
    }
  };

  const handleAddTraining = async () => {
    if (!newTraining.name.trim() || newTraining.hours <= 0) return;
    try {
      await axios.post("group/group-trainings", { projectId, ...newTraining });
      setNewTraining({ name: "", hours: 0 });
      fetchTrainings();
    } catch (error) {
      console.error("Błąd podczas dodawania szkolenia grupowego:", error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Zajęcia grupowe</h3>
      <div>
        <input
          type="text"
          value={newTraining.name}
          onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
          placeholder="Nazwa szkolenia"
          className="border p-2 rounded mb-2"
        />
        <input
          type="number"
          value={newTraining.hours}
          onChange={(e) => setNewTraining({ ...newTraining, hours: parseInt(e.target.value) })}
          placeholder="Liczba godzin"
          className="border p-2 rounded ml-2 mb-2"
        />
        <button
          onClick={handleAddTraining}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
        >
          Dodaj szkolenie
        </button>
      </div>
      <ul className="mt-4">
        {trainings.map((training) => (
          <li key={training.id} className="border p-2 rounded mb-2">
            <h4 className="font-bold">{training.name}</h4>
            <p>Liczba godzin: {training.hours}</p>
            <button
             onClick={() => handleViewDetails(training.id)}
              className="text-blue-500 hover:underline mt-2"
            >
              Szczegóły
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupTrainings;
