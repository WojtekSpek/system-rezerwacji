import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar1 from "./ProjectParticipantDetails/Calendar1";
import EditEventModal from "./ProjectParticipantDetails/EditEventModal";


const localizer = momentLocalizer(moment);

function ProjectParticipantDetails({ participantId, projectId, onBack }) {
  const [participant, setParticipant] = useState(null); // Dane uczestnika w ramach projektu
  const [activeTab, setActiveTab] = useState("Dane osobowe"); // Domyślna zakładka
 
  const [uploadedFiles, setUploadedFiles] = useState([]); // Lista plików
  const [file, setFile] = useState(null); // Wybrany plik do dodania
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [trainers, setTrainers] = useState([]); // Trenerzy przypisani do projektu
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Wybrany trener
  const [events, setEvents] = useState([]); // Wydarzenia w kalendarzu
  const [newEvent, setNewEvent] = useState({ start: "", end: "", title: "" }); // Nowe wydarzenie
  const [projectTypes, setProjectTypes] = useState([]); // Typy przypisane do uczestnika w projekcie
  const [projectTypesAll, setProjectTypesAll] = useState([]); // Typy przypisane do uczestnika w projekcie
 /*  const currentType = projectTypesAll.find((type) => type.name === activeTab);
  const typeId = currentType?.id;
 console.log('currentType',typeId) */
 const [selectedEvent, setSelectedEvent] = useState(null); // Wydarzenie do edycji
  const [showEditModal, setShowEditModal] = useState(false); // Kontrola widoczności modala

  const handleEditEvent = (event) => {
    console.log("Otwieranie modala dla wydarzenia", event);
    setSelectedEvent(event); // Ustaw wybrane wydarzenie
    setShowEditModal(true); // Pokaż modal edycji
  };

  useEffect(() => {
    
    
    //fetchParticipantDetails();
    fetchFiles();
    fetchParticipantDetails();
    fetchEvents();
  }, [participantId, projectId,activeTab]); //funkcja uruchamia sie po zmianie [participantId, projectId]

     // Pobranie danych uczestnika w ramach projektu
     const fetchParticipantDetails = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/participants/${participantId}`);
        if (response.data.success) {
          setParticipant(response.data.participant);
          setProjectTypesAll(response.data.participant.types); // Zakładki dynamiczne z `types`
          setProjectTypes(response.data.participant.types.map((type) => type.name)); 
        }
        console.log('jestem tu',response.data.participant);
      } catch (error) {
        console.error("Błąd podczas pobierania danych uczestnika projektu:", error);
      }
    };

  const fetchEvents = async () => {
      try {
        const response = await axios.get(`calendar/events/${projectId}`);
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
        console.error("Błąd podczas pobierania wydarzeń:", error);
      }
    };

  // Obsługa dodawania wydarzenia
  const handleAddEvent = async () => {
    if (!selectedTrainer) {
      alert("Wybierz trenera przed dodaniem wydarzenia.a");
      return;
    }

    const eventToSave = {
      ...newEvent,
      trainerId: 1, //selectedTrainer.trainer_id,
      projectId: projectId,
      description: 'test',

    };

    try {
      const response = await axios.post("calendar/events", eventToSave);
      if (response.data.success) {
        setEvents([
          ...events,
          {
            ...eventToSave,
            id: response.data.eventId,
            start: new Date(eventToSave.start),
            end: new Date(eventToSave.end),
          },
        ]);
        setNewEvent({ start: "", end: "", title: "" });
        alert("Wydarzenie zostało dodane!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania wydarzenia:", error);
    }
  };

  // Sumowanie godzin na trenera
  const calculateHoursPerTrainer = () => {
    const hours = {};
    console.log('events',events)
    events.forEach((event) => {
      if (!hours[event.id]) hours[event.id] = 0;
      hours[event.id] +=
        (new Date(event.end) - new Date(event.start)) / 1000 / 60 / 60; // Liczenie godzin
    });
    console.log('hours',hours)
    return hours;
  };
  
 // Pobierz pliki uczestnika
 const fetchFiles = async () => {
    try {
      const response = await axios.get(`/files/${projectId}/${participantId}`);
      if (response.data.success) {
        setUploadedFiles(response.data.files);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania plików uczestnika:", error);
    }
  };

  // Dodaj plik
  const handleFileUpload = async () => {
    if (!file) {
      alert("Wybierz plik do przesłania!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`/files/${projectId}/${participantId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        alert("Plik został przesłany!");
        setFile(null);
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    }
  };

  // Usuń plik
  const handleFileDelete = async (fileName) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten plik?")) return;
    try {
      const response = await axios.delete(`/files/${projectId}/${participantId}/${fileName}`);
      if (response.data.success) {
        alert("Plik został usunięty!");
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Błąd podczas usuwania pliku:", error);
    }
  };



  /* // Pobranie danych uczestnika w ramach projektu
  const fetchParticipantDetails = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants/${participantId}`);
      if (response.data.success) {
        setParticipant(response.data.participant);
        setProjectTypesAll(response.data.participant.types); // Zakładki dynamiczne z `types`
        setProjectTypes(response.data.participant.types.map((type) => type.name)); 
      }
      console.log('jestem tu',response.data.participant);
    } catch (error) {
      console.error("Błąd podczas pobierania danych uczestnika projektu:", error);
    }
  }; */

  
 
  const handleSelectSlot = (slotInfo) => {
    const title = window.prompt("Podaj tytuł wydarzenia:");
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          start: slotInfo.start,
          end: slotInfo.end,
          title,
        },
      ]);
    }
  };

  // Obsługa renderowania zawartości zakładek
  const renderTabContent = () => {
    
    switch (activeTab) {
      case "Dane osobowe":
        return (
            <div>
            <h3 className="text-lg font-semibold mb-4">Dane osobowe:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Imię:</strong> {participant?.firstName || "Brak danych"}
              </div>
              <div>
                <strong>Nazwisko:</strong> {participant?.lastName || "Brak danych"}
              </div>
              <div>
                <strong>PESEL:</strong> {participant?.pesel || "Brak danych"}
              </div>
              <div>
                <strong>Płeć:</strong> {participant?.gender || "Brak danych"}
              </div>
              <div>
                <strong>Województwo:</strong> {participant?.voivodeship || "Brak danych"}
              </div>
              <div>
                <strong>Miasto:</strong> {participant?.city || "Brak danych"}
              </div>
              <div>
                <strong>Kod pocztowy:</strong> {participant?.postalCode || "Brak danych"}
              </div>
              <div>
                <strong>Ulica:</strong> {participant?.street || "Brak danych"}
              </div>
              <div>
                <strong>Numer domu:</strong> {participant?.houseNumber || "Brak danych"}
              </div>
              <div>
                <strong>Numer mieszkania:</strong> {participant?.apartmentNumber || "Brak danych"}
              </div>
              <div>
                <strong>Numer telefonu:</strong> {participant?.phoneNumber || "Brak danych"}
              </div>
              <div>
                <strong>Email:</strong> {participant?.email || "Brak danych"}
              </div>
              <div>
                <strong>Stopień niepełnosprawności:</strong> {participant?.disabilityLevel || "Brak danych"}
              </div>
              </div>
        </div>
          
        );
      case "Pliki":
        return (
            <div>
              <h3 className="text-lg font-semibold mb-4">Pliki uczestnika:</h3>
              {/* Lista plików */}
              <ul className="list-disc list-inside mb-4">
                {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {/* Klikalny link do otwierania pliku */}
                        <a
                        href={`/uploads/${file}`} // Ścieżka do pliku
                        target="_blank" // Otwiera plik w nowej karcie
                        rel="noopener noreferrer" // Bezpieczeństwo dla linków zewnętrznych
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
          default:
        
         // Zakładki dynamiczne
         if (projectTypes.includes(activeTab)) {
          {/* Kalendarz */}
        
          return (
            <div>
              
              <Calendar1
                projectId={projectId}
                participantId={participantId}
                trainerId={selectedTrainer?.id}
                activeTab={activeTab}
                events={events}
                onEditEvent={handleEditEvent} // Dodaj obsługę edycji
                onAddEvent={handleAddEvent}
                projectTypes={projectTypes}
                projectTypesAll={projectTypesAll} // Przekazanie projectTypes // Przekazanie projectTypes
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                selectedTrainer={selectedTrainer} // Przekazanie selectedTrainer
                setSelectedTrainer={setSelectedTrainer} // Przekazanie setSelectedTrainer
                
              />
              {showEditModal && selectedEvent && (
                <EditEventModal
                  show={showEditModal}
                  event={selectedEvent}
                  trainers={trainers} // Jeśli korzystasz z listy trenerów
                  onSave={(updatedEvent) => {
                    setEvents((prevEvents) =>
                      prevEvents.map((evt) =>
                        evt.id === updatedEvent.id ? { ...evt, ...updatedEvent } : evt
                      )
                    );
                    setShowEditModal(false);
                  }}
                  onClose={() => setShowEditModal(false)}
                />
              )}
            </div>
            
          );
        }
        return null;
        
        
    }
  };

  return (
    <div className="p-4">
      {/* Górny pasek z imieniem i nazwiskiem oraz przyciskiem powrotu */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                {participant?.firstName} {participant?.lastName}
                </h2>
                <button
                onClick={onBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                Wróć
                </button>
            </div>
      {/* Zakładki */}
      <div className="flex gap-4 border-b mb-4">
        {/* Zakładki stałe */}
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
        {/* Zakładki dynamiczne */}
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`pb-2 ${activeTab === type ? "border-b-2 border-blue-500" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Zawartość aktywnej zakładki */}
      {participant ? renderTabContent() : <p>Ładowanie danych...</p>}
      
    </div>
  );
}

export default ProjectParticipantDetails;
