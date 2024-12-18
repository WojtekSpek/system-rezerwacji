import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectTrainers({ projectId }) {
  const [projectTypes, setProjectTypes] = useState([]); // Typy projektu
  const [trainersByType, setTrainersByType] = useState({}); // Szkoleniowcy przypisani do typów
  const [searchQueries, setSearchQueries] = useState({}); // Oddzielne inputy dla typów
  const [filteredTrainers, setFilteredTrainers] = useState({}); // Filtrowana lista szkoleniowców

  useEffect(() => {
    fetchProjectTypes();
  }, [projectId]);

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(`/projects/project_training_types/${projectId}`);
      if (response.data.success) {
        setProjectTypes(response.data.types);
        fetchAllTrainersForTypes(response.data.types);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów projektu:", error);
    }
  };

  const fetchAllTrainersForTypes = async (types) => {
    const trainersData = {};
    try {
      for (const type of types) {
        const response = await axios.get(`/projects/${projectId}/trainers/${type.id}`);
        if (response.data.success) {
          trainersData[type.id] = response.data.trainers;
        }
      }
      setTrainersByType(trainersData);
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };

  const addTrainerToType = async (trainerId, typeId) => {
    try {
      const response = await axios.post(`/projects/${projectId}/trainers`, { trainerId, typeId });
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został dodany!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
    }
  };

  const removeTrainerFromType = async (trainerId, typeId) => {
    try {
      const response = await axios.delete(`/projects/${projectId}/trainers/${typeId}/${trainerId}`);
      if (response.data.success) {
        fetchAllTrainersForTypes(projectTypes);
        alert("Szkoleniowiec został usunięty!");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
    }
  };

  const searchAvailableTrainers = async (typeId, query) => {
    try {
      const response = await axios.get(`/trainers/trainersType`, {
        params: { typeId },
      });
      if (response.data.success) {
        const filtered = response.data.trainers.filter((trainer) =>
          trainer.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTrainers((prev) => ({ ...prev, [typeId]: filtered }));
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania szkoleniowców:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Szkoleniowcy projektu</h2>
      <ul className="space-y-4">
        {projectTypes.map((type) => (
          <li key={type.id} className="bg-white p-4 rounded  shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">{type.type}</h3>

            {/* Lista przypisanych szkoleniowców */}
            
            <ul>
              {trainersByType[type.id]?.map((trainer) => (
                <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
                  <span>{trainer.name}</span>
                  <button
                    onClick={() => removeTrainerFromType(trainer.id, type.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </li>
              )) || <p>Brak przypisanych szkoleniowców</p>}
            </ul>

            {/* Sekcja Dodawania szkoleniowców */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Dodaj szkoleniowca:</h4>
              <input
                type="text"
                placeholder="Wyszukaj szkoleniowca..."
                value={searchQueries[type.id] || ""} // Oddzielny stan dla każdego inputu
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchQueries((prev) => ({ ...prev, [type.id]: query }));
                  searchAvailableTrainers(type.id, query); // Wywołaj wyszukiwanie
                }}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <ul>
                {filteredTrainers[type.id]?.map((trainer) => (
                  <li key={trainer.id} className="flex justify-between items-center p-2 border-b">
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectTrainers;
