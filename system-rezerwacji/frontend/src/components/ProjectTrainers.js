import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectTrainers({ projectId }) {
  const [projectTypes, setProjectTypes] = useState([]); // Typy projektu
  const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  const [expandedType, setExpandedType] = useState(null); // Rozwinięty wiersz
  const [searchQuery, setSearchQuery] = useState(""); // Wartość wyszukiwania
  const [filteredTrainers, setFilteredTrainers] = useState([]); // Filtrowana lista szkoleniowców

  useEffect(() => {
    fetchProjectTypes();
  }, [projectId]);

  // Pobierz typy projektu
  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(`/projects/project_training_types/${projectId}`);
      if (response.data.success) {
        setProjectTypes(response.data.types); // Tablica typów { id, type }
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów projektu:", error);
    }
  };

  // Pobierz szkoleniowców dla danego typu
  const fetchTrainersForType = async (typeId) => {
    try {
      const response = await axios.get(`/projects/${projectId}/trainers/${typeId}`);
      if (response.data.success) {
        setTrainersByType((prev) => ({
          ...prev,
          [typeId]: response.data.trainers, // Dodaj szkoleniowców przypisanych do tego typu
        }));
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców dla typu:", error);
    }
  };

  // Obsługa rozwinięcia wiersza typu
  const toggleTypeRow = (typeId) => {
    if (expandedType === typeId) {
      setExpandedType(null); // Zamknij wiersz, jeśli już jest otwarty
    } else {
      setExpandedType(typeId);
      fetchTrainersForType(typeId); // Pobierz szkoleniowców tylko, gdy wiersz zostaje otwarty
    }
  };

  // Filtrowanie szkoleniowców
  useEffect(() => {
    if (expandedType) {
      axios
        .get(`/trainers/trainersType`, {
          params: { typeId: expandedType }, // Przekazujemy typeId jako parametr
        })
        .then((response) => {
          if (response.data.success) {
            const filtered = response.data.trainers.filter((trainer) =>
              trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTrainers(filtered);
          }
        })
        .catch((error) => {
          console.error("Błąd podczas filtrowania szkoleniowców:", error);
        });
    }
  }, [expandedType, searchQuery]);

  // Dodanie szkoleniowca do projektu
  const addTrainerToType = async (trainerId, typeId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/trainers`, {
        trainerId,
        typeId,
      });
      if (response.data.success) {
        fetchTrainersForType(typeId); // Odśwież listę szkoleniowców przypisanych do typu
        alert("Szkoleniowiec został dodany do projektu!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca do projektu:", error);
    }
  };

  // Usunięcie szkoleniowca z projektu
  const removeTrainerFromType = async (trainerId, typeId) => {
    try {
      const response = await axios.delete(`/projects/${projectId}/trainers/${typeId}/${trainerId}`);
      if (response.data.success) {
        fetchTrainersForType(typeId); // Odśwież listę szkoleniowców przypisanych do typu
        alert("Szkoleniowiec został usunięty z projektu!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca z projektu:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Szkoleniowcy projektu</h2>

      <ul className="space-y-4">
        {projectTypes.map((type) => (
          <li key={type.id} className="border rounded shadow p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{type.type}</h3>
              <button
                onClick={() => toggleTypeRow(type.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {expandedType === type.id ? "Zwiń" : "Dodaj"}
              </button>
            </div>
            {expandedType === type.id && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Dodaj szkoleniowca:</h4>
                <input
                  type="text"
                  placeholder="Wyszukaj szkoleniowca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <ul>
                  {filteredTrainers.map((trainer) => (
                    <li
                      key={trainer.id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span>{trainer.name}</span>
                      <button
                        onClick={() => addTrainerToType(trainer.id, type.id)}
                        className={`${
                          trainersByType[type.id]?.some((t) => t.id === trainer.id)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white px-3 py-1 rounded`}
                        disabled={trainersByType[type.id]?.some((t) => t.id === trainer.id)}
                      >
                        {trainersByType[type.id]?.some((t) => t.id === trainer.id)
                          ? "Dodano"
                          : "Dodaj"}
                      </button>
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold mt-4">Szkoleniowcy przypisani do typu:</h4>
                <ul>
                  {trainersByType[type.id]?.map((trainer) => (
                    <li
                      key={trainer.id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span>{trainer.name}</span>
                      <button
                        onClick={() => removeTrainerFromType(trainer.id, type.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectTrainers;
