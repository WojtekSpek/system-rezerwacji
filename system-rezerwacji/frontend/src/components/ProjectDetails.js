import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectDetails({ project, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [editedTypes, setEditedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(
        `/projects/project_training_types/${project.id}`
      );
      if (response.data.success) {
        setEditedTypes(response.data.types); // Ustaw typy przypisane do projektu
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów projektu:", error);
    }
  };

  // Pobranie wszystkich dostępnych typów z bazy
  const fetchAllTypes = async () => {
    try {
      const response = await axios.get("/projects/trainingTypes");
      if (response.data.success) {
        setAllTypes(response.data.data.map((type) => type.type));
      }
    } catch (error) {
      console.error("Błąd podczas pobierania wszystkich typów:", error);
    }
  };

  useEffect(() => {
    // Pobranie typów projektu z backendu
    
    fetchProjectTypes();
    fetchAllTypes();
  }, [project.id]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`projects/updateProject/${project.id}`, {
        name: editedName,
        types: editedTypes,
      });
      console.log("response:", response);
      if (response.data.success) {
        alert("Zapisano zmiany!");
        onUpdate({ ...project, name: editedName, types: editedTypes });
        setIsEditing(false);
      }
    } catch (error) {
      
      console.error("Błąd podczas zapisywania projektu:", error);
      alert("Nie udało się zapisać zmian.");
    }
  };

  const handleCheckboxChange = (type) => {
    if (editedTypes.includes(type)) {
      setEditedTypes(editedTypes.filter((t) => t !== type));
    } else {
      setEditedTypes([...editedTypes, type]);
    }
  };

  if (!project) {
    return <div>Brak danych projektu</div>;
  }

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-2 shadow hover:shadow-md">
      {/* Sekcja po lewej */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Szczegóły projektu</h2>
        {isEditing ? (
          <div className="mb-4 w-3/4">
            <label className="block text-sm font-medium text-gray-700">
              Nazwa projektu:
            </label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ) : (
          <p className="mb-4">
            <strong className="block text-lg font-semibold">Nazwa:</strong>{" "}
            {project.name}
          </p>
        )}
        <div className="text-sm text-gray-500 mb-6">
          <p>
            <strong>Utworzony przez:</strong> {project.created_by || "Nieznany"}
          </p>
          <p>
            <strong>Data utworzenia:</strong>{" "}
            {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Sekcja po prawej */}
      <div className="lg:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Typy projektu</h3>
        {isEditing ? (
          <div className="flex flex-wrap gap-2">
            {allTypes.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editedTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="w-4 h-4" // Zwiększa szerokość i wysokość checkboxa
                />
                {type}
              </label>
            ))}
          </div>
        ) : (
          <ul className="list-disc list-inside">
            {editedTypes.length > 0 ? (
              editedTypes.map((type, index) => (
                <li key={index} className="text-gray-700">
                  {type}
                </li>
              ))
            ) : (
              <p className="text-gray-500">Brak przypisanych typów</p>
            )}
          </ul>
        )}
      </div>

      {/* Przycisk Edytuj/Zapisz */}
      <div className="mt-4 lg:col-span-2 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              Anuluj
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Zapisz
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edytuj
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
