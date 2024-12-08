import React, { useState, useEffect } from "react";
import axios from "axios";

function Trainers() {
  const [trainers, setTrainers] = useState([]); // Lista szkoleniowców
  const [trainerName, setTrainerName] = useState(""); // Imię i nazwisko szkoleniowca
  const [trainerTypes, setTrainerTypes] = useState([]); // Lista typów szkoleń
  const [selectedTypes, setSelectedTypes] = useState([]); // Typy szkoleń dla danego szkoleniowca
  const [successMessage, setSuccessMessage] = useState(""); // Komunikat o sukcesie
  const [editingTrainerId, setEditingTrainerId] = useState(null); // ID edytowanego szkoleniowca
  const [editingName, setEditingName] = useState(""); // Edytowane imię i nazwisko
  const [editingTypes, setEditingTypes] = useState([]); // Edytowane typy szkoleń


  // Pobierz listę szkoleniowców i typów szkoleń z backendu
  useEffect(() => {
    fetchTrainers();
    fetchTrainingTypes();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainers");
      if (response.data.success) {
        setTrainers(response.data.trainers);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };

  const fetchTrainingTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainingTypes");
      console.log("Otrzymane dane:", response.data);
      if (response.data.success) {
        setTrainerTypes(response.data.data);
        console.log("Stan types po przypisaniu:", response.data.data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów szkoleń:", error);
    }
  };
  const startEditingTrainer = (trainer) => {
    setEditingTrainerId(trainer.id);
    setEditingName(trainer.name);
    setEditingTypes(trainer.types);
  };

  const saveEditedTrainer = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/editTrainer/${editingTrainerId}`, {
        name: editingName,
        types: editingTypes,
      });
  
      if (response.data.success) {
        setEditingTrainerId(null); // Wyjdź z trybu edycji
        fetchTrainers(); // Odśwież listę szkoleniowców
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania edytowanego szkoleniowca:", error);
    }
  };  
  const cancelEditing = () => {
    setEditingTrainerId(null);
    setEditingName("");
    setEditingTypes([]);
  };
  const handleEditCheckboxChange = (type) => {
    if (editingTypes.includes(type)) {
      setEditingTypes(editingTypes.filter((t) => t !== type));
    } else {
      setEditingTypes([...editingTypes, type]);
    }
  };
  
  const handleAddTrainer = async () => {
    if (!trainerName || selectedTypes.length === 0) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addTrainer", {
        name: trainerName,
        types: selectedTypes,
      });

      if (response.data.success) {
        setSuccessMessage("Szkoleniowiec został pomyślnie dodany!");
        fetchTrainers(); // Odśwież listę szkoleniowców
        setTrainerName(""); // Wyczyść formularz
        setSelectedTypes([]);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
    }
  };

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  // Usuwanie szkoleniowca
const handleDeleteTrainer = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego szkoleniowca?")) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/deleteTrainer/${id}`);
      if (response.data.success) {
        fetchTrainers();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca:", error);
    }
  };
  
  // Edytowanie szkoleniowca
  const handleEditTrainer = async (id, updatedName, updatedTypes) => {
    try {
      const response = await axios.put(`http://localhost:5000/editTrainer/${id}`, {
        name: updatedName,
        types: updatedTypes,
      });
      if (response.data.success) {
        fetchTrainers();
      }
    } catch (error) {
      console.error("Błąd podczas edytowania szkoleniowca:", error);
    }
  };
  
  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Zarządzanie szkoleniowcami</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Dodaj szkoleniowca:</h3>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <input
          type="text"
          placeholder="Imię i nazwisko"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <h4 className="font-semibold mb-2">Typy szkoleń:</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {trainerTypes.map((type) => (
            <label key={type.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              {type.type}
            </label>
          ))}
        </div>
        <button
          onClick={handleAddTrainer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj szkoleniowca
        </button>
      </div>

      <h3 className="font-semibold mb-2">Lista szkoleniowców:</h3>
      <ul className="space-y-2">
        {trainers.map((trainer) => (
            <li key={trainer.id} className="p-2 border border-gray-300 rounded flex flex-col gap-2">
            {editingTrainerId === trainer.id ? (
                <div>
                <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <h4 className="font-semibold mb-2">Typy szkoleń:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                    {trainerTypes.map((type) => (
                    <label key={type.id} className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={editingTypes.includes(type)}
                        onChange={() => handleEditCheckboxChange(type)}
                        />
                        {type.type}
                    </label>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button
                    onClick={saveEditedTrainer}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Zapisz
                    </button>
                    <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                    >
                    Anuluj
                    </button>
                </div>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                <span>{trainer.name}</span>
                <span>-</span>
                <span>{trainer.types.join(", ")}</span>
                    <div>
                        <button
                        onClick={() => startEditingTrainer(trainer)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mr-2"
                    >
                        Edytuj
                    </button>
                    <button
                        onClick={() => handleDeleteTrainer(trainer.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                    >
                        Usuń
                    </button>
                     </div>
                </div>
            )}
            </li>
        ))}
        </ul>
    </div>
  );
}

export default Trainers;
