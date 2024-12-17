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
    fetchPlannedHours();
    fetchTotalHours();
    
  }, [projectId, type]);

  const fetchPlannedHours = async () => {
    try {
      const response = await axios.get(
        `/projects/${projectId}/types/${typeId}/planned-hours`
      );
      if (response.data.success) {
        setPlannedHours(response.data.plannedHours);
      } else {
        console.error("Nie udało się pobrać planowanych godzin.");
      }
    } catch (error) {
      console.error("Błąd podczas pobierania planned_hours:", error);
    }
  };
  
   // Funkcja zapisująca nowe godziny
   const handleSave = async () => {
    try {
      await axios.put(`/projects/${projectId}/types/${typeId}`, {
        plannedHours: inputHours,
      });
      setPlannedHours(inputHours); // Aktualizacja widoku
      setIsEditing(false); // Wyjście z trybu edycji
      alert("Planowane godziny zostały zaktualizowane!");
    } catch (error) {
      console.error("Błąd podczas aktualizacji godzin:", error);
      alert("Nie udało się zapisać godzin.");
    }
  };


  return (
    <div>


      
      
      

    <div className="mt-2">
        <p>
        <strong>Planowane godziny szkoleniowe:</strong> {plannedHours} h
        </p>
       
        <p>
        <strong>Przydzielone godziny:</strong> {totalHours} h
        </p>
        <p>
        <strong>Szkolenia do zaplanowania:</strong>{" "}
        {Math.max(0, plannedHours - totalHours) } h
        </p>
    </div>
     
    </div>
  );
}

export default TotalHours;
