import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactModal from "react-modal";

const localizer = momentLocalizer(moment);
ReactModal.setAppElement("#root"); // Ustawienie głównego elementu aplikacji
moment.locale("pl"); // Ustaw język polski

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
  const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie
  const [isModalOpen, setIsModalOpen] = useState(false); // Widoczność modalu
  const [participant, setParticipant] = useState(null);

  
  console.log('event.participantId',events)

  useEffect(() => {
    fetchTrainerDetails();
    fetchAvailableTypes();
    fetchFiles();
    fetchEvents();
    
  }, []);

  const messages = {
    allDay: "Cały dzień",
    previous: "Poprzedni",
    next: "Następny",
    today: "Dzisiaj",
    month: "Miesiąc",
    week: "Tydzień",
    day: "Dzień",
    agenda: "Agenda",
    date: "Data",
    time: "Czas",
    event: "Wydarzenie",
    noEventsInRange: "Brak wydarzeń w tym zakresie.",
    showMore: (count) => `+ Pokaż więcej (${count})`,
  };

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
            participantId: event.participant_id, // Przypisanie participantId z API
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  const fetchParticipant = async (participantId) => {
    console.log('tratata')
    try {
      const response = await axios.get(
        `http://localhost:5000/participants/${participantId}`
      ); // API endpoint zwracający szczegóły uczestnika
      if (response.data.success) {
        setParticipant(response.data.participant);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szczegółów uczestnika:", error);
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
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setEditedTrainer(trainer);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 float-right"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <div className="mb-4">
              <h3 className="font-semibold">Name:</h3>
              <p>{trainer.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Email:</h3>
              <p>{trainer.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Tel:</h3>
              <p>{trainer.phone}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Typy szkoleń:</h3>
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
                <h2 className="text-2xl font-bold mb-4">Kalendarz trenera</h2>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  messages={messages} // Przekazanie tłumaczeń
                  onSelectEvent={(event) => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                    if (event.participantId) {
                      fetchParticipant(event.participantId); // Pobierz dane uczestnika
                    }
                  }}
                />

                {/* Modal ze szczegółami wydarzenia */}
                <ReactModal
                  isOpen={isModalOpen}
                  onRequestClose={() => {
                    setIsModalOpen(false);
                    setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
                  }}
                  className="relative bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20 z-50"
                  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
                >
                  {selectedEvent && (
                    <div>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <h3 className="text-xl font-bold mb-4 text-center">
                        Szczegóły wydarzenia
                      </h3>
                      <p><strong>Tytuł:</strong> {selectedEvent.title}</p>
                      <p><strong>Opis:</strong> {selectedEvent.description || "Brak opisu"}</p>
                      <p><strong>Data rozpoczęcia:</strong> {selectedEvent.start.toLocaleString()}</p>
                      <p><strong>Data zakończenia:</strong> {selectedEvent.end.toLocaleString()}</p>
                      {participant ? (
                        <div className="mt-4">
                          <p>
                            <strong>Uczestnik:</strong> {participant.firstName} {participant.lastName}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-4">Ładowanie danych uczestnika...</p>
                      )}
                    </div>
                  )}
                </ReactModal>

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
        <h2 className="text-2xl font-bold mb-4">{trainer.name}</h2>
        
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
              <label className="font-semibold">Tel:</label>
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
              <label className="font-semibold">Typy szkoleń:</label>
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
            <div className="flex flex-row-reverse gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)} // Ustaw isEditing na false
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          renderTabContent()
        )}

    </div>
  );
}

export default TrainerDetails;
