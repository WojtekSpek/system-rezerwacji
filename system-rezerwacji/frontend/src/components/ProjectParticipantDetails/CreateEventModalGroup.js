import React, { useState, useEffect } from "react";
import moment from "moment";

function CreateEventModalGroup({
  show,
  onSave,
  onClose,
  trainingId,
  trainers = [],
  groupName,
  start,
  end,
}) {
  const [eventData, setEventData] = useState({
    title: groupName || "", // Tytuł ustawiony na nazwę grupy
    start: start || "", // Sformatuj datę
    end: end || "", // Sformatuj datę
    description: "",
    type: "group_training",
    group_trainer_id: trainers[0]?.id || "",
    assignedTrainer: trainers.length === 1 ? trainers[0]?.id : "", // Automatyczne przypisanie, jeśli jest jeden trener
  });

  // Zaktualizuj dane, gdy modal jest otwierany
  useEffect(() => {
    if (show) {
      setEventData((prev) => ({
        ...prev,
        title: groupName || prev.title,
        start: start ? moment(start).format("YYYY-MM-DDTHH:mm") : prev.start,
        end: end ? moment(end).format("YYYY-MM-DDTHH:mm") : prev.end,
        group_trainer_id: trainers[0]?.id || prev.GrouptrainerID,
        assignedTrainer: trainers.length === 1 ? trainers[0]?.id : prev.assignedTrainer,
        isGroupEvent:1,
      }));
    }
  }, [show, groupName, start, end, trainers]);

  const handleSave = () => {
    if (!eventData.start || !eventData.end) {
      alert("Proszę uzupełnić daty rozpoczęcia i zakończenia.");
      return;
      }
      onSave(eventData);
    };

    if (!show) return null; // Nie renderuj, jeśli modal jest zamknięty

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Dodaj wydarzenie grupowe</h2>

        {/* Tytuł */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tytuł</label>
          <input
            type="text"
            value={eventData.title}
            readOnly
            className="border border-gray-300 rounded p-2 w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Data rozpoczęcia */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Data rozpoczęcia</label>
          <input
            type="datetime-local"
            value={eventData.start}
            onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Data zakończenia */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Data zakończenia</label>
          <input
            type="datetime-local"
            value={eventData.end}
            onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Opis */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Opis</label>
          <textarea
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full"
            rows={3}
          />
        </div>

        {/* Lista rozwijana szkoleniowców */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Przypisz szkoleniowca</label>
          <select
            value={eventData.assignedTrainer}
            onChange={(e) => setEventData({ ...eventData, assignedTrainer: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Wybierz szkoleniowca</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Przyciski */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModalGroup;
