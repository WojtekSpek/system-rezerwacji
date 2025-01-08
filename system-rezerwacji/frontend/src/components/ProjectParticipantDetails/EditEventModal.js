import React, { useState, useEffect } from "react";
import moment from "moment"; // Import moment.js

function EditEventModal({ show, trainers, onSave, onClose, onDelete, event,isEditing}) {
  const [localEventData, setLocalEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    projectTrainerId: "",
  });

  const [error, setError] = useState("");

  // Ustawienie wstępnych danych z `event` tylko raz po załadowaniu
  useEffect(() => {
    if (event) {
      setLocalEventData(event);
    }
  }, [event]);
console.log('localEventData',localEventData)
  const validateForm = () => {
    if (
      !localEventData.title ||
      !localEventData.start ||
      !localEventData.end ||
      !localEventData.projectTrainerId
    ) {
      setError("Wszystkie pola muszą być wypełnione!");
      return false;
    }
    if (new Date(localEventData.start) >= new Date(localEventData.end)) {
      setError("Data początkowa musi być wcześniejsza niż data końcowa!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(localEventData); // Wywołanie `onSave` z danymi do aktualizacji
      onClose(); // Zamknięcie modala
    }
  };

  const handleDelete = () => {
    if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
      onDelete(localEventData.id); // Wywołanie funkcji usuwania z ID wydarzenia
      onClose(); // Zamknięcie modala
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edytuj wydarzenie" : "Podgląd wydarzenia"}
        </h3>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block font-semibold mb-2">Tytuł</label>
        <input
          type="text"
          value={localEventData.title}
          onChange={(e) =>
            setLocalEventData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Tytuł wydarzenia"
          className="border border-gray-300 p-2 rounded w-full mb-2"
          readOnly={!isEditing} // Pole tylko do odczytu, jeśli brak możliwości edycji
        />

        <label className="block font-semibold mb-2">Opis</label>
        <textarea
          value={localEventData.description}
          onChange={(e) =>
            setLocalEventData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Opis wydarzenia"
          className="border border-gray-300 p-2 rounded w-full mb-2"
          readOnly={!isEditing} // Pole tylko do odczytu, jeśli brak możliwości edycji
        />

        <label className="block font-semibold mb-2">Data początkowa</label>
        <input
          type="datetime-local"
          value={moment(localEventData.start).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            const utcDate = moment(e.target.value).utc().format(); // Konwersja na UTC w formacie ISO
            setLocalEventData((prev) => ({ ...prev, start: utcDate }));
          }}
          className="border border-gray-300 p-2 rounded w-full mb-2"
          readOnly={!isEditing} // Pole tylko do odczytu, jeśli brak możliwości edycji
        />

        <label className="block font-semibold mb-2">Data końcowa</label>
        <input
          type="datetime-local"
          value={moment(localEventData.end).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            const utcDate = moment(e.target.value).utc().format(); // Konwersja na UTC w formacie ISO
            setLocalEventData((prev) => ({ ...prev, end: utcDate }));
          }}
          className="border border-gray-300 p-2 rounded w-full mb-2"
          readOnly={!isEditing} // Pole tylko do odczytu, jeśli brak możliwości edycji
        />

        <label className="block font-semibold mb-2">Trener</label>
        <select
          value={localEventData.projectTrainerId || ""}
          onChange={(e) =>
            setLocalEventData((prev) => ({
              ...prev,
              projectTrainerId: parseInt(e.target.value, 10),
            }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
          disabled={!isEditing} // Pole nieaktywne, jeśli brak możliwości edycji
        >
          {/* Opcja domyślna */}
            {!isEditing ? (
              <option value="">{localEventData.trainerName || "-- Wybierz trenera --"}</option>
            ) : (
              <option value="">-- Wybierz trenera --</option>
            )}
          {trainers.map((trainer) => (
            <option
              key={trainer.projectTrainerId}
              value={trainer.projectTrainerId}
            >
              {trainer.name}
            </option>
          ))}
        </select>

        <div className="mt-4 flex justify-end gap-4">
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Zapisz
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Usuń
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEventModal;