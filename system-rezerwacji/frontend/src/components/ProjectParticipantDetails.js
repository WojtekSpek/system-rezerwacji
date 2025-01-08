import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import "moment/locale/pl"; // Import lokalizacji polskiej
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar1 from "./ProjectParticipantDetails/Calendar1";
import EditEventModal from "./ProjectParticipantDetails/EditEventModal";
import TotalHours from "./ProjectParticipantDetails/TotalHours"; // Import komponentu
import { useParams } from "react-router-dom";
import Commentary from "./Commentary";


moment.locale("pl"); // Ustaw język polski

const localizer = momentLocalizer(moment);




function ProjectParticipantDetails({onBack}) {
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
  const {id} = useParams(); // Pobiera ID projektu z URL
  const projectId = id; // Pobiera ID projektu z URL
  const {participantId} = useParams(); // Pobiera ID projektu z URL
  const [selectedEvent, setSelectedEvent] = useState(null); // Wydarzenie do edycji
  const [showEditModal, setShowEditModal] = useState(false); // Kontrola widoczności modala
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    trainerId: "",
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

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

  const [calendarView, setCalendarView] = useState("week"); // Domyślny widok
  const [view, setView] = useState("week"); // Domyślny widok to tydzień

  const handleCalendarViewChange = (newView) => {
    setCalendarView(newView); // Aktualizuj widok w stanie
  };
  const onViewChange = (newView) => {
    console.log("Zmieniono widok na:", newView);
    setView(newView); // Aktualizuj stan widoku
  };
  const handleEditEvent = (event) => {
    console.log("Otwieranie modala dla wydarzenia", event);
    setSelectedEvent(event); // Ustaw wybrane wydarzenie
    setShowEditModal(true); // Pokaż modal edycji
  };

  useEffect(() => {
    if (events) {
      events.forEach((event) => {
        if (!event.start || !event.end) {
          console.error("Nieprawidłowe wydarzenie:", event);
        }
      });
    }
  }, [events]);
  console.log('event',events)


  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/trainers/${typeId}`);
        if (response.data.success) {
          setTrainers(response.data.trainers);
          console.log('response.data.trainers',response.data.trainers)
        }
      } catch (error) {
        console.error("Błąd podczas pobierania trenerów projektu:", error);
      }
    };
    
    fetchTrainers();
  }, [projectId, activeTab]);

  const currentType = projectTypesAll.find((type) => type.name === activeTab);
  const typeId = currentType?.id;
  console.log("Obecne typeId:", activeTab);
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

    /* const getTypeIdByName = (typeName) => {
      const type = projectTypesAll.find((t) => t.name === typeName);
      return type ? type.id : null;
   
    };

    const typeId = getTypeIdByName(activeTab); */
    console.log("Type ID dla aktywnego typu:", currentType);

    const getEventStyle = (event) => {
      //console.log("Wywołanie getEventStyle dla wydarzenia:", event);
    
      // Definicja kolorów
      const colors = ["#f56c6c", "#67c23a", "#6f5126", "#409eff", "#e6a23c", "#909399"];
    
      // Użyj currentType.id do wyboru koloru
      const tabId = currentType?.id || 0; // Jeśli brak id, ustaw 0
      const assignedColor = colors[tabId % colors.length]; // Modulo zapewnia cykliczność kolorów
      //console.log('tabId',tabId)
     // console.log('tcolors.length',colors.length)
     // console.log('tcolors.length',colors.length)
      if (event.typeName?.trim().toLowerCase() === currentType?.name?.trim().toLowerCase()) {
        // Kolorowe wydarzenie dla aktywnej zakładki
        console.log('jaki to kolor ',assignedColor)
        return {
          style: {
            backgroundColor: assignedColor,
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            opacity: 1,
          },
        };
      } else {
        // Zaszarzałe wydarzenie dla nieaktywnej zakładki
        return {
          style: {
            backgroundColor: "#d3d3d3",
            color: "#a9a9a9",
            borderRadius: "5px",
            border: "none",
            cursor: "not-allowed",
            opacity: 0.6,
          },
        };
      }
    };
    
    

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`calendar/events/${projectId}/${participantId}`);
        if (response.data.success) {
         // console.log('response.data.events',response.data.events.start)
          setEvents(
            response.data.events.map((event) => ({
              ...event,
              start: event.start, // Dodaj "Z", aby wymusić UTC
              end: event.end,
              type: (event.type), // Przypisz typ na podstawie logiki
            }))
          );
        console.log('events',events)  

        }
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń:", error);
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
      const response = await axios.get(`/files/participant/${projectId}/${participantId}`);
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
      const response = await axios.post(`files/participant/${projectId}/${participantId}`, formData, {
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
      const response = await axios.delete(`/files/participant/${projectId}/${participantId}/${fileName}`);
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
        case "Aktywność":
        return (
            <div>
            {/* <h2 className="text-2xl font-bold mb-4">Szczegóły projektu</h2> */}
      {/* Inne szczegóły projektu */}
      <Commentary entityId={projectId} entityType="participant" />
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
                        href={`${API_BASE_URL}/files/participant_read/${projectId}/${participantId}/${file}`} // Ścieżka do pliku
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
              <h2 className="text-2xl font-bold mb-4">Kalendarz - {activeTab}</h2>
      

      {/* Dodawanie wydarzenia */}
            <div className="mb-4">
            
              
            </div>
              <div className="mb-4">
            <TotalHours participantId={participantId} projectId={projectId} type={activeTab} typeId={typeId} initialPlannedHours={0}/>
            </div>
              <Calendar1
                key={`${activeTab}-${events.length}`} // Klucz bazujący na activeTab i liczbie wydarzeń
                projectId={projectId}
                participantId={participantId}
                trainerId={selectedTrainer?.id}
                activeTab={activeTab}
                events={events}
                trainers={trainers}
                onEditEvent={handleEditEvent} // Dodaj obsługę edycji
                setEvents={setEvents} // Dodano setEvents
                
                projectTypes={projectTypes}
                projectTypesAll={projectTypesAll} // Przekazanie projectTypes // Przekazanie projectTypes
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                selectedTrainer={selectedTrainer} // Przekazanie selectedTrainer
                setSelectedTrainer={setSelectedTrainer} // Przekazanie setSelectedTrainer
                eventPropGetter={getEventStyle} // Przypisanie stylu do wydarzenia
                view={calendarView} // Przekazanie bieżącego widoku
                onViewChange={handleCalendarViewChange} // Przekazanie funkcji zmiany widoku
                
              />
              {showEditModal && selectedEvent && (
                <EditEventModal
                  show={showEditModal}
                  event={selectedEvent}
                  setEventData={(updatedEvent) => {
                    setSelectedEvent((prevEvent) => ({ ...prevEvent, ...updatedEvent }));
                  }}
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
        <button
          onClick={() => setActiveTab("Aktywność")}
          className={`pb-2 ${activeTab === "Aktywność" ? "border-b-2 border-blue-500" : ""}`}
        >
          Aktywności
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
