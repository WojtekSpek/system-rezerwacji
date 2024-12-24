import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);


function TrainerDetails() {
  const { trainersId } = useParams();
  const id = trainersId;
  const [uploadedFiles, setUploadedFiles] = useState([]); // Lista plików
  const [file, setFile] = useState(null); // Wybrany plik do dodania
  const [trainer, setTrainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrainer, setEditedTrainer] = useState({});
  const [availableTypes, setAvailableTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("Dane osobowe"); // Domyślna zakładka
  const [events, setEvents] = useState([]); // Wydarzenia dla kalendarza

  useEffect(() => {
    fetchTrainerDetails();
    fetchAvailableTypes();
    fetchFiles();
    fetchEvents();
    
  }, []);


  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/trainers/${id}/events`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setEvents(
          response.data.events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  const fetchFiles = async () => {
    try {
      const response = await axios.get(`/files/trainer/${trainersId}`);
      if (response.data.success) {
        setUploadedFiles(response.data.files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  
  const handleFileUpload = async () => {
    if (!file) {
      alert("Wybierz plik do przesłania!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(`/files/trainer/${trainersId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        alert("Plik został przesłany!");
        setFile(null);
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  const handleFileDelete = async (fileName) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten plik?")) return;
    try {
      const response = await axios.delete(`/files/trainer/${trainersId}/${fileName}`);
      if (response.data.success) {
        alert("Plik został usunięty!");
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/trainers/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setTrainer(response.data.trainer);
      }
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  const fetchAvailableTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainers/trainingTypes", {
        withCredentials: true,
      });
      if (response.data.success) {
        setAvailableTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching training types:", error);
    }
  };

  const handleSave = async () => {
    console.log("Saving trainer:", editedTrainer);
    try {
      const response = await axios.put(
        `http://localhost:5000/trainers/editTrainer/${id}`,
        editedTrainer,
        { withCredentials: true }
      );
      if (response.data.success) {
        setTrainer(editedTrainer);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving trainer data:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dane osobowe":
        return (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold">Name:</h3>
              <p>{trainer.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Email:</h3>
              <p>{trainer.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Phone:</h3>
              <p>{trainer.phone}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Training Types:</h3>
              <p>{trainer.types?.join(", ") || "No types assigned"}</p>
            </div>
          </div>
        );
        case "Pliki":
          return (
            <div>
              <h3 className="text-lg font-semibold mb-4">Pliki trenera:</h3>
              {/* Lista plików */}
              <ul className="list-disc list-inside mb-4">
                {uploadedFiles.length > 0 ? (
                  uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      {/* Klikalny link do otwierania pliku */}
                      <a
                        href={`/uploads/trainers/${id}/${file}`} // Ścieżka do pliku
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {file}
                      </a>
                      <button
                        onClick={() => handleFileDelete(file)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Usuń
                      </button>
                    </li>
                  ))
                ) : (
                  <p>Brak plików</p>
                )}
              </ul>
              {/* Dodawanie pliku */}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-2"
              />
              <button
                onClick={handleFileUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Dodaj plik
              </button>
            </div>
          );
        
          case "Kalendarz":
            return (
              <div>
                <h3 className="font-semibold">Kalendarz:</h3>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </div>
            );
          default:
            return null;
        }
  };

  if (!trainer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Trainer Details</h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditedTrainer(trainer);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="flex gap-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("Dane osobowe")}
          className={`pb-2 ${activeTab === "Dane osobowe" ? "border-b-2 border-blue-500" : ""}`}
        >
          Dane osobowe
        </button>
        <button
          onClick={() => setActiveTab("Pliki")}
          className={`pb-2 ${activeTab === "Pliki" ? "border-b-2 border-blue-500" : ""}`}
        >
          Pliki
        </button>
        <button
          onClick={() => setActiveTab("Kalendarz")}
          className={`pb-2 ${activeTab === "Kalendarz" ? "border-b-2 border-blue-500" : ""}`}
        >
          Kalendarz
        </button>
      </div>

      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="font-semibold">Name:</label>
            <input
              type="text"
              value={editedTrainer.name}
              onChange={(e) =>
                setEditedTrainer({ ...editedTrainer, name: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              value={editedTrainer.email}
              onChange={(e) =>
                setEditedTrainer({ ...editedTrainer, email: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold">Phone:</label>
            <input
              type="text"
              value={editedTrainer.phone}
              onChange={(e) =>
                setEditedTrainer({ ...editedTrainer, phone: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold">Training Types:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTypes.map((type) => (
                <label key={type.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editedTrainer.types?.includes(type.type)}
                    onChange={(e) => {
                      const updatedTypes = e.target.checked
                        ? [...(editedTrainer.types || []), type.type]
                        : (editedTrainer.types || []).filter((t) => t !== type.type);
                      setEditedTrainer({ ...editedTrainer, types: updatedTypes });
                    }}
                  />
                  {type.type}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        renderTabContent()
      )}
    </div>
  );
}

export default TrainerDetails;
