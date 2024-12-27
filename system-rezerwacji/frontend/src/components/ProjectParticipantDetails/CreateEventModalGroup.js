import React, { useState } from "react";

function CreateEventModalGroup({ show, onSave, onClose, trainingId }) {
    const [eventData, setEventData] = useState({
      title: "",
      start: "",
      end: "",
      description: "",
      type: "group_training", // Domyślnie ustawione na grupowe
      trainingId: trainingId,
    });
  
    const handleSave = () => {
      onSave(eventData);
    };
  
    return (
      show && (
        <div className="modal">
          <div className="modal-content">
            <h2>Dodaj wydarzenie grupowe</h2>
            <input
              type="text"
              placeholder="Tytuł"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            />
            <input
              type="datetime-local"
              placeholder="Start"
              value={eventData.start}
              onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
            />
            <input
              type="datetime-local"
              placeholder="Koniec"
              value={eventData.end}
              onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
            />
            <textarea
              placeholder="Opis"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            />
            <button onClick={handleSave}>Zapisz</button>
            <button onClick={onClose}>Anuluj</button>
          </div>
        </div>
      )
    );
  }
  export default CreateEventModalGroup;