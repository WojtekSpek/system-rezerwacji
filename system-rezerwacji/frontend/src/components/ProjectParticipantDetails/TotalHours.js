import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalHours({ projectId, type,typeId, initialPlannedHours }) {
  const [totalHours, setTotalHours] = useState(0);
  
const [assignedHours, setAssignedHours] = useState(0);
const [isEditing, setIsEditing] = useState(false); // Tryb edycji
  const [plannedHours, setPlannedHours] = useState(initialPlannedHours); // Aktualne godziny
  const [inputHours, setInputHours] = useState(initialPlannedHours); // Tymczasowe dla edycji

  useEffect(() => {
    const fetchTotalHours = async () => {
      try {
        const response = await axios.get(`/projects/events/total-hours/${projectId}/${type}`);
        if (response.data.success) {
          setTotalHours(response.data.totalHours);
        } else {
          console.error("Nie udało się pobrać sumy godzin.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania sumy godzin:", error);
      }
    };

    fetchTotalHours();
  }, [projectId, type]);

  const fetchHours = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/types/${typeId}/hours`);
      if (response.data.success) {
        setAssignedHours(response.data.assignedHours); // Ładowanie godzin przydzielonych
      }
    } catch (error) {
      console.error("Błąd podczas pobierania godzin:", error);
    }
  };
  
  const updatePlannedHours = async (newHours) => {
    try {
      await axios.put(`/projects/${projectId}/types/${typeId}`, { plannedHours: newHours });
      setPlannedHours(newHours);
    } catch (error) {
      console.error("Błąd podczas aktualizacji planowanych godzin:", error);
    }
  };
  

  return (
    <div>

<h3 className="text-lg font-semibold">Planowane godziny szkoleniowe:</h3>
      {!isEditing ? (
        // Widok zwykłego tekstu (nieedytowalny)
        <div>
          <span>{plannedHours} godzin</span>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Edytuj
          </button>
        </div>
      ) : (
        // Widok trybu edycji
        <div>
          <input
            type="number"
            value={inputHours}
            onChange={(e) => setInputHours(e.target.value)}
            className="border border-gray-300 p-2 rounded w-20"
          />
          <button
            onClick={fetchHours}
            className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Zapisz
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setInputHours(plannedHours); // Przywróć poprzednią wartość
            }}
            className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
          >
            Anuluj
          </button>
        </div>
      )}

    <div className="mt-2">
        <p>
        <strong>Przydzielone godziny:</strong> {assignedHours} godzin
        </p>
        <p>
        <strong>Szkolenia do zaplanowania:</strong>{" "}
        {Math.max(0, plannedHours - assignedHours)} godzin
        </p>
    </div>
      <h3>Suma godzin dla {type}:</h3>
      <p>{totalHours} godzin</p>
    </div>
  );
}

export default TotalHours;
