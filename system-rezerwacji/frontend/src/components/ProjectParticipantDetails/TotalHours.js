import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalHours({ projectId, type, typeId, initialPlannedHours, participantId }) {
  const [totalHours, setTotalHours] = useState(0); // Przydzielone godziny
  const [assignedHours, setAssignedHours] = useState(0); // Planowane godziny
  const [plannedHours, setPlannedHours] = useState(initialPlannedHours || 0); // Aktualne godziny

  useEffect(() => {
    const fetchTotalHours = async () => {
      try {
        const response = await axios.get(
          `/projects/events/total-hours/${projectId}/${typeId}/${participantId}`
        );
        console.log(
          `[GET] /projects/events/total-hours/${projectId}/${typeId}/${participantId}`
        );
        if (response.data.success) {
          setTotalHours(parseFloat(response.data.totalHours || 0));
        } else {
          console.error("Nie udało się pobrać sumy godzin.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania sumy godzin:", error);
      }
    };

    const fetchAssignedHours = async () => {
      try {
        const response = await axios.get(
          `/projects/${projectId}/types/${typeId}/planned-hours`
        );
        console.log("Planowane godziny:", response.data);
        if (response.data.success) {
          setAssignedHours(parseFloat(response.data.plannedHours || 0));
        }
      } catch (error) {
        console.error("Błąd podczas pobierania planowanych godzin:", error);
      }
    };

    fetchTotalHours();
    fetchAssignedHours();
  }, [projectId, type, typeId, participantId]);

  const remainingHours = Math.max(0, parseFloat(assignedHours - totalHours).toFixed(2));

  return (
    <div>
      <div className="mt-2">
        <p>
          <strong>Planowane godziny szkoleniowe:</strong> {assignedHours} godzin
        </p>
        <p>
          <strong>Przydzielone godziny:</strong> {totalHours} godzin
        </p>
        <p>
          <strong>Szkolenia do zaplanowania:</strong> {remainingHours} godzin
        </p>
      </div>
    </div>
  );
}

export default TotalHours;
