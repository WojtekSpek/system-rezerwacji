import React, { useEffect, useState } from "react";
import axios from "axios";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";

function TotalHours({ projectId, type,typeId, initialPlannedHours,participantId }) {
  const [totalHours, setTotalHours] = useState(0);
  
const [assignedHours, setAssignedHours] = useState(0);
const [isEditing, setIsEditing] = useState(false); // Tryb edycji
  const [plannedHours, setPlannedHours] = useState(initialPlannedHours); // Aktualne godziny
  const [inputHours, setInputHours] = useState(initialPlannedHours); // Tymczasowe dla edycji

  useEffect(() => {
    const fetchTotalHours = async () => {
      try {
        const response = await axios.get(`/projects/events/total-hours/${projectId}/${typeId}/${participantId}`);
           console.log([`/projects/events/total-hours/${projectId}/${typeId}/${participantId}`])
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
    fetchHours();
  }, [projectId, type]);

  const fetchHours = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/types/${typeId}/planned-hours`);
      console.log('response.data1',response.data)
      if (response.data.success) {
        setAssignedHours(response.data.plannedHours); // Ładowanie godzin przydzielonych
      }
    } catch (error) {
      console.error("Błąd podczas pobierania godzin:", error);
    }
  };
  
  
  

  return (
    <div>



    <div className="mt-2">
        <p>
          <strong>Planowane godziny szkoleniowe:</strong> {assignedHours} godzin
        </p>
        <p>
        <strong>Przydzielone godziny:</strong> {totalHours}  godzin
        </p>
        <p>
        <strong>Szkolenia do zaplanowania:</strong>{" "}
        {Math.max(0,  assignedHours - totalHours)} godzin
        </p>
    </div>
      
    </div>
  );
}

export default TotalHours;
