import React from "react";

function EditEventModal({ show, event, trainers, onClose, onSave, setEventData }) {
  if (!show) return null; // Jeśli `show` jest `false`, nie renderuj modala

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Zamknięcie modala po kliknięciu w tło
    >
      <div
        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Zatrzymanie propagacji kliknięcia, aby nie zamykać modala
      >
        <h3 className="text-lg font-semibold mb-4">Edytuj wydarzenie</h3>
        <label>Tytuł</label>
        <input
          type="text"
          value={event?.title || ""}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <label>Data początkowa</label>
        <input
          type="datetime-local"
          value={event?.start ? new Date(event.start).toISOString().slice(0, 16) : ""}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, start: new Date(e.target.value) }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <label>Data końcowa</label>
        <input
          type="datetime-local"
          value={event?.end ? new Date(event.end).toISOString().slice(0, 16) : ""}
          onChange={(e) =>
            setEventData((prev) => ({ ...prev, end: new Date(e.target.value) }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <label>Trener</label>
        <select
          value={event?.trainerId || ""}
          onChange={(e) =>
            setEventData((prev) => ({
              ...prev,
              trainerId: parseInt(e.target.value),
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
            onClick={() => onSave(event)} // Wywołanie `onSave` z bieżącym wydarzeniem
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

export default EditEventModal;
