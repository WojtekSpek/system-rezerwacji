import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EditEventModal from "./EditEventModal";
import CreateEventModal from "./CreateEventModal";

const localizer = momentLocalizer(moment);

function Calendar1({
  events,
  onAddEvent,
  setEvents, // Dodano setEvents jako props
  onEditEvent,
  participantId,
  newEvent,
  setParticipant,
  setNewEvent,
  projectTypesAll,
  projectId,
  trainers,
  activeTab,
  selectedTrainer, // Dodaj selectedTrainer jako prop
  setSelectedTrainer, // Dodaj setSelectedTrainer jako prop
  getEventStyle,
  eventPropGetter,
   // Przekazanie funkcji
}) {
    const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie do edycji
    const [showEditModal, setShowEditModal] = useState(false); // Pokazanie okna edycji
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [eventData, setEventData] = useState(events || {});
    //const [trainers, setTrainers] = useState([]);
   // const [selectedTrainer, setSelectedTrainer] = useState(null);
   
    console.log('trainers', trainers)
// Obsługa dodawania wydarzenia
const handleAddEvent = async () => {
  if (!newEvent.title || !newEvent.start || !newEvent.end) {
    alert("Uzupełnij wszystkie dane wydarzenia!");
    return;
  }

  const eventToSave = {
    ...newEvent,
    trainerId: selectedTrainer?.id, // Powiązanie z wybranym trenerem
    projectId, // Powiązanie z projektem
  };

  try {
    const response = await axios.post("/calendar/events", eventToSave); // Wywołanie endpointu
    console.log("Odpowiedź z backendu:", response.data);

    if (response.data.success) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...eventToSave,
          id: response.data.eventId, // ID zwrócone przez backend
          start: new Date(eventToSave.start), // Przekształcenie daty na obiekt
          end: new Date(eventToSave.end),
        },
      ]);
      alert("Wydarzenie zostało zapisane!");
    } else {
      alert("Nie udało się dodać wydarzenia.");
    }
  } catch (error) {
    console.error("Błąd podczas dodawania wydarzenia:", error);
    alert("Wystąpił problem podczas zapisywania wydarzenia.");
  }
};
      const sanitizedEvents = useMemo(() => {
        if (!events || !Array.isArray(events)) {
          console.error("Events jest null lub nie jest tablicą:", events);
          return [];
        }
        return events.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
      }, [events]);


      
      class ErrorBoundary extends React.Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false };
        }
      
        static getDerivedStateFromError(error) {
          return { hasError: true };
        }
      
        componentDidCatch(error, errorInfo) {
          console.error("Błąd złapany w ErrorBoundary:", error, errorInfo);
        }
      
        render() {
          if (this.state.hasError) {
            return <h1>Coś poszło nie tak.</h1>;
          }
          return this.props.children;
        }
      }  

      // Obsługa kliknięcia w slot (wolny obszar kalendarza)
  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      title: "", // Domyślny tytuł, np. puste pole
      description: "", // Pole na dodatkowy opis
      trainerId: "", // Domyślnie brak przypisanego trenera
    });
    setShowEditModal(true); // Otwórz modal
  };

  // Obsługa zapisu wydarzenia (nowego lub edytowanego)
  const handleSaveEvent = (eventData) => {
    if (eventData.id) {
      // Edycja istniejącego wydarzenia
      setEvents((prev) =>
        prev.map((evt) => (evt.id === eventData.id ? { ...evt, ...eventData } : evt))
      );
    } else {
      // Tworzenie nowego wydarzenia
      const newEvent = {
        ...eventData,
        id: Date.now(), // Tymczasowe ID (w rzeczywistości powinno pochodzić z backendu)
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setShowEditModal(false); // Zamknij modal
  };
  const handleEditEvent = async () => {
    if (!selectedEvent) return;
  
    try {
      const response = await axios.put(`/calendar/events/${selectedEvent.id}`, {
        title: selectedEvent.title,
        start: selectedEvent.start,
        end: selectedEvent.end,
        trainerId: selectedEvent.trainerId,
      });
  
      if (response.data.success) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id ? selectedEvent : event
          )
        );
        setShowEditModal(false); // Zamknij modal
        alert("Wydarzenie zostało zaktualizowane!");
      }
    } catch (error) {
      console.error("Błąd podczas edytowania wydarzenia:", error);
      alert("Nie udało się zaktualizować wydarzenia.");
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kalendarz - {activeTab}</h2>
      {/* Wybór trenera */}
      <div className="mb-4">
        <label htmlFor="trainer" className="block mb-2 font-semibold">
          Wybierz trenera:
        </label>
        <select
          id="trainer"
          value={selectedTrainer?.id || ""}
          onChange={(e) =>
            setSelectedTrainer(
              trainers.find((t) => t.id === parseInt(e.target.value))
            )
          }
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">-- Wybierz trenera --</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dodawanie wydarzenia */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Dodaj wydarzenie:</label>
        <input
          type="text"
          placeholder="Tytuł"
          value={newEvent.title}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <input
          type="datetime-local"
          placeholder="Data początkowa"
          value={newEvent.start}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, start: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <input
          type="datetime-local"
          placeholder="Data końcowa"
          value={newEvent.end}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, end: e.target.value }))
          }
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <button
          onClick={() =>
            onAddEvent({
              ...newEvent,
              trainerId: selectedTrainer?.id,
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj wydarzenie
        </button>
      </div>

      {/* Kalendarz */}
      <ErrorBoundary>
      <BigCalendar
      // events={events}
       localizer={localizer}
       startAccessor="start"
       events={sanitizedEvents} // Użyj zabezpieczonych danych
       endAccessor="end"
       selectable // Włącza możliwość klikania w wolne obszary
       onSelectSlot={() => setShowCreateModal(true)} // Wyświetl modal tworzenia
        onSelectEvent={(event) => {
          setSelectedEvent(event); // Ustaw wybrane wydarzenie
          setShowEditModal(true); // Otwórz modal
        }}
       style={{ height: 500 }}
       eventPropGetter={eventPropGetter} // Przypisanie stylu do wydarzenia
      />

      </ErrorBoundary>
      {showCreateModal && (
        <CreateEventModal
        show={showCreateModal}
        trainers={trainers}
        onSave={(eventData) => {
          console.log("Otrzymano dane do zapisania:", eventData); // Debuguj dane
          handleAddEvent(eventData); // Wywołaj handleAddEvent z eventData
          setShowCreateModal(false); // Zamknij modal po zapisie
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      {/* Modal dla tworzenia/edycji wydarzeń */}
      {showEditModal && (
        <EditEventModal
          show={showEditModal}
          event={selectedEvent}
          trainers={trainers}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEvent}
          //etEventData={setEventData} // Przekazanie funkcji
        />
      )}

    </div>
  );
}

export default Calendar1;
