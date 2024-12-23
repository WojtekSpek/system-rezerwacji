import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Trainers() {
  const [trainers, setTrainers] = useState([]); // Lista szkoleniowców
  const [trainerName, setTrainerName] = useState(""); // Imię i nazwisko szkoleniowca
  const [trainerTypes, setTrainerTypes] = useState([]); // Lista typów szkoleń
  const [selectedTypes, setSelectedTypes] = useState([]); // Typy szkoleń dla danego szkoleniowca
  const [successMessage, setSuccessMessage] = useState(""); // Komunikat o sukcesie
  const [editingTrainerId, setEditingTrainerId] = useState(null); // ID edytowanego szkoleniowca
  const [editingName, setEditingName] = useState(""); // Edytowane imię i nazwisko
  const [editingTypes, setEditingTypes] = useState([]); // Edytowane typy szkoleń
  
  const navigate = useNavigate(); // Hook do nawigacji

  // Pobierz listę szkoleniowców i typów szkoleń z backendu
  useEffect(() => {
    fetchTrainers();
    fetchTrainingTypes();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainers");
      if (response.data.success) {
        setTrainers(response.data.trainers);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };

  const fetchTrainingTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainers/Types");
      if (response.data.success) {
        setTrainerTypes(response.data.data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów szkoleń:", error);
    }
  };

  // Przejście do szczegółów trenera
  const handleViewDetails = (trainerId) => {
    navigate(`/trainer/${trainerId}`);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Zarządzanie szkoleniowcami</h2>

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
        <button
          onClick={() => alert("Funkcja dodawania niezaimplementowana!")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj szkoleniowca
        </button>
      </div>

      <h3 className="font-semibold mb-2">Lista szkoleniowców:</h3>
      <ul className="space-y-2">
        {trainers.map((trainer) => (
          <li
            key={trainer.id}
            className="p-2 border border-gray-300 rounded flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span>{trainer.name}</span>
              <span>{trainer.email}</span>
              <span>{trainer.phone}</span>
              <button
                onClick={() => handleViewDetails(trainer.id)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Zobacz szczegóły
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trainers;
