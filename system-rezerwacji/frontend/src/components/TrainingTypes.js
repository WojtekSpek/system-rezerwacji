import React, { useState, useEffect } from "react";
import axios from "axios";

function TrainingTypes() {
  const [types, setTypes] = useState([]); // Lista typów szkoleń
  const [newType, setNewType] = useState(""); // Nowy typ szkolenia
  const [successMessage, setSuccessMessage] = useState("");
  const [editType, setEditType] = useState(null); // Typ szkolenia do edycji
  // Pobierz typy szkoleń z backendu
  useEffect(() => {
    fetchTrainingTypes();
    console.log("Stan types:", types);
  }, []);

  const fetchTrainingTypes = async () => {
    try {
        const response = await axios.get("http://localhost:5000/trainingTypes", {
          withCredentials: true, // Włącz przesyłanie ciasteczek
        });
        console.log("Otrzymane dane:", response.data);
        if (response.data.success) {
          setTypes(response.data.data|| []); // Sprawdź, czy dane są w odpowiednim formacie
          console.log("Stan types po przypisaniu:", response.data);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania typów szkoleń:", error);
      }
  };

  const addTrainingType = async () => {
    if (!newType) {
      alert("Podaj nazwę typu szkolenia!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addTrainingType", {
        withCredentials: true,
        type: newType,
      });

      if (response.data.success) {
        setSuccessMessage("Typ szkolenia został pomyślnie dodany!");
        setNewType(""); // Wyczyść pole
        fetchTrainingTypes();
      }
    } catch (error) {
      console.error("Błąd podczas dodawania typu szkolenia:", error);
    }
  };
  const deleteTrainingType = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten typ szkolenia?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/deleteTrainingType/${id}`);
      if (response.data.success) {
        setSuccessMessage("Typ szkolenia został usunięty.");
        fetchTrainingTypes();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania typu szkolenia:", error);
    }
  };

  const updateTrainingType = async () => {
    if (!editType.type) {
      alert("Podaj nazwę typu szkolenia!");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/updateTrainingType", editType);
      if (response.data.success) {
        setSuccessMessage("Typ szkolenia został zaktualizowany.");
        setEditType(null); // Wyjście z trybu edycji
        fetchTrainingTypes();
      }
    } catch (error) {
      console.error("Błąd podczas edytowania typu szkolenia:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Typy szkoleń</h2>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nazwa typu szkolenia"
          className="border border-gray-300 p-2 rounded w-64 mr-2"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <button
          onClick={addTrainingType}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          Dodaj typ szkolenia
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Lista typów szkoleń</h3>
      <ul>
        {types.map((type) => (
          <li key={type.id} className="flex justify-between items-center mb-2">
            {editType && editType.id === type.id ? (
              <div>
                <input
                  type="text"
                  value={editType.type}
                  onChange={(e) => setEditType({ ...editType, type: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-64 mr-2"
                />
                <button
                  onClick={updateTrainingType}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mr-2"
                >
                  Zapisz
                </button>
                <button
                  onClick={() => setEditType(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                  Anuluj
                </button>
              </div>
            ) : (
              <>
                <span>{type.type}</span>
                <div>
                  <button
                    onClick={() => setEditType(type)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mr-2"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => deleteTrainingType(type.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                  >
                    Usuń
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainingTypes;
