import React, { useState } from "react";

function CreateEventModal({ show, trainers, onSave, onClose }) {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    trainerId: "",
  });
  //console.log("EventData:", eventData);
  console.log("setEventData:", setEventData); // Sprawdź, czy setEventData jest funkcją
  if (!show) return null; // Jeśli modal nie ma być wyświetlany, nic nie renderuj

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50" // Zmienione style
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 z-50 relative">
        <h3 className="text-lg font-semibold mb-4">Dodaj wydarzenie</h3>

        <label className="block mb-2 font-semibold">Tytuł</label>
        <input
          type="text"
          value={eventData.title}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Tytuł wydarzenia"
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />

        <label className="block mb-2 font-semibold">Opis</label>
        <textarea
          value={eventData.description}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Opis wydarzenia"
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />

        <label className="block mb-2 font-semibold">Data początkowa</label>
        <input
          type="datetime-local"
          value={eventData.start}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, start: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />

        <label className="block mb-2 font-semibold">Data końcowa</label>
        <input
          type="datetime-local"
          value={eventData.end}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, end: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />

        <label className="block mb-2 font-semibold">Trener</label>
        <select
          value={eventData.trainerId}
          onChange={(e) =>
            setEventData((prev) => ({
              ...prev,
              trainerId: parseInt(e.target.value, 10),
            }))
          }
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">-- Wybierz trenera --</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => {
              onSave(eventData); // Wywołaj funkcję zapisu z przekazanymi danymi
              setEventData({
                title: "",
                description: "",
                start: "",
                end: "",
                trainerId: "",
              }); // Wyczyść dane
              onClose(); // Zamknij modal
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Zapisz
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModal;
