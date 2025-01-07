import React, { useState, useEffect } from "react";
import axios from "axios";
//import Commentary from "./Commentary";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function GroupTrainings({ setSelectedProject }) {
  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState({ name: "", hours: 0 });
  const [editingTraining, setEditingTraining] = useState(null);
  const { id } = useParams(); // Pobiera ID projektu z URL
  const navigate = useNavigate();
  const projectId = id;

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleViewDetails = (trainingid) => {
    console.log("trainingid", trainingid);
    navigate(`/projects/${projectId}/Group/${trainingid}`);
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`/group/group-trainings/${projectId}`);
      setTrainings(response.data.trainings);
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleń grupowych:", error);
    }
  };

  const handleAddTraining = async () => {
    if (!newTraining.name.trim() || newTraining.hours <= 0) return;
    try {
      await axios.post("/group/group-trainings", { projectId, ...newTraining });
      setNewTraining({ name: "", hours: 0 });
      fetchTrainings();
    } catch (error) {
      console.error("Błąd podczas dodawania szkolenia grupowego:", error);
    }
  };

  const handleDeleteTraining = async (trainingId) => {
    const result = await Swal.fire({
      title: "Czy na pewno chcesz usunąć to szkolenie?",
      text: "Najpierw musisz usunąć przypisanych uczestników!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Usuń",
      cancelButtonText: "Anuluj",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.get(`group/group-training-participants/${trainingId}`);
        if (response.data.participants.length > 0) {
          Swal.fire(
            "Nie można usunąć",
            "Najpierw usuń przypisanych uczestników.",
            "error"
          );
          return;
        }
  
        await axios.delete(`group/group-trainings/${trainingId}`);
        fetchTrainings(); // Odśwież listę
        Swal.fire("Usunięto!", "Szkolenie zostało usunięte.", "success");
      } catch (error) {
        console.error("Błąd podczas usuwania szkolenia grupowego:", error);
        Swal.fire("Błąd", "Wystąpił błąd podczas usuwania szkolenia.", "error");
      }
    }
  };
  

  const handleEditTraining = async (trainingId, updatedTraining) => {
    try {
      await axios.put(`/group/group-trainings/${trainingId}`, updatedTraining);
      fetchTrainings();
    } catch (error) {
      console.error("Błąd podczas edycji szkolenia grupowego:", error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Zajęcia grupowe</h3>
      <div>
        <input
          type="text"
          value={newTraining.name}
          onChange={(e) =>
            setNewTraining({ ...newTraining, name: e.target.value })
          }
          placeholder="Nazwa szkolenia"
          className="border p-2 rounded mb-2"
        />
        <input
          type="number"
          value={newTraining.hours}
          onChange={(e) =>
            setNewTraining({ ...newTraining, hours: parseInt(e.target.value) })
          }
          placeholder="Liczba godzin"
          className="border p-2 rounded ml-2 mb-2"
        />
        <button
          onClick={handleAddTraining}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
        >
          Dodaj szkolenie
        </button>
      </div>
      <ul className="mt-4">
        {trainings.map((training) => (
          <li
            key={training.id}
            className="border p-2 rounded mb-2 flex justify-between items-center"
          >
            {editingTraining?.id === training.id ? (
              // Edytowanie szkolenia
              <div className="flex-1">
                <input
                  type="text"
                  value={editingTraining.name}
                  onChange={(e) =>
                    setEditingTraining({ ...editingTraining, name: e.target.value })
                  }
                  className="border p-2 rounded mb-2"
                />
                <input
                  type="number"
                  value={editingTraining.hours}
                  onChange={(e) =>
                    setEditingTraining({
                      ...editingTraining,
                      hours: parseInt(e.target.value),
                    })
                  }
                  className="border p-2 rounded ml-2 mb-2"
                />
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() =>
                      handleEditTraining(training.id, {
                        name: editingTraining.name,
                        hours: editingTraining.hours,
                      }).then(() => setEditingTraining(null))
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Zapisz
                  </button>
                  <button
                    onClick={() => setEditingTraining(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            ) : (
              // Widok szkolenia
              <>
                {/* Lewa część: Link i liczba godzin */}
                <div className="flex-1">
                  <h4>
                    <a
                      href={`/projects/${projectId}/Group/${training.id}`}
                      className="text-blue-500 hover:underline font-bold"
                    >
                      {training.name}
                    </a>
                  </h4>
                  <p>Liczba godzin: {training.hours}</p>
                </div>

                {/* Prawa część: Przyciski */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTraining(training)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteTraining(training.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default GroupTrainings;
