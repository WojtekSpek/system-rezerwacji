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
  view, // Odbierz aktualny widok z propsów
  onViewChange, // Odbierz funkcję zmiany widoku z propsów
   // Przekazanie funkcji
}) {
    const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie do edycji
    const [showEditModal, setShowEditModal] = useState(false); // Pokazanie okna edycji
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [eventData, setEventData] = useState(events || {});
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
    
    console.log('trainers', trainers)
    console.log("Przekazanie eventPropGetter:", eventPropGetter);
// Obsługa dodawania wydarzenia
    const handleAddEvent = async (newEventData) => {
      console.log("handleAddEvent - Przekazane dane:", newEventData); // Debuguj dane
      if (newEventData.id) {
        // Edytowanie istniejącego wydarzenia
        console.log('edytowanie wydarzenia')
        try {
          const response = await axios.put(`/calendar/events/${newEventData.id}`, newEventData);
          if (response.data.success) {
            setEvents((prevEvents) =>
              prevEvents.map((evt) =>
                evt.id === newEventData.id ? { ...evt, ...newEventData } : evt
              )
            );
            alert("Wydarzenie zostało zaktualizowane!");
          }
        } catch (error) {
          console.error("Błąd podczas edytowania wydarzenia:", error);
          alert("Nie udało się zaktualizować wydarzenia.");
      }
      } else {
        const eventToSave = {
          ...newEventData,
          projectId, // Dodanie ID projektu
        };
        const newEventToAdd = {
          ...eventData,
          id: Date.now(), // Tymczasowe ID
        };

        setEvents((prevEvents) => [...prevEvents, newEventToAdd]);
          setShowCreateModal(false);
        try {
          const response = await axios.post("/calendar/events", eventToSave); // Wywołanie API
          console.log("Odpowiedź z serwera:", response.data);

          if (response.data.success) {
            setEvents((prevEvents) => [
              ...prevEvents,
              {
                ...eventToSave,
                id: response.data.eventId, // ID zwrócone przez backend
                start: new Date(newEventData.start),
                end: new Date(newEventData.end),
              },
            ]);
            setShowCreateModal(false); // Zamknięcie modala
            alert("Wydarzenie zostało dodane!");
          } else {
            alert("Nie udało się dodać wydarzenia.");
          }
        } catch (error) {
          console.error("Błąd podczas dodawania wydarzenia:", error);
          alert("Wystąpił błąd podczas zapisu.");
        }
      }
    };

    const handleSelectEvent = (event) => {
      if (event.type === activeTab) {
        setSelectedEvent(event); // Ustaw wybrane wydarzenie
        setShowEditModal(true); // Otwórz modal
      } else {
        alert(`Możesz edytować tylko wydarzenia z typem "${activeTab}".`);
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

      const handleDeleteEvent = async (eventId) => {
        try {
          const response = await axios.delete(`/calendar/events/${eventId}`); // Wywołanie API do usunięcia
          if (response.data.success) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            alert("Wydarzenie zostało usunięte.");
          } else {
            alert("Nie udało się usunąć wydarzenia.");
          }
        } catch (error) {
          console.error("Błąd podczas usuwania wydarzenia:", error);
          alert("Wystąpił błąd podczas usuwania.");
        }
      };
      
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
        const defaultEnd = moment(slotInfo.start).add(1, "hours").toDate();
        setNewEvent({
          title: "",
          description: "",
          start: slotInfo.start,
          end: defaultEnd,
          projectTrainerId: "",
        });
        setShowCreateModal(true); // Otwórz modal tworzenia
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
      

      {/* Dodawanie wydarzenia */}
      <div className="mb-4">
       
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
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={sanitizedEvents} // Użyj zabezpieczonych danych
        selectable // Włącza możliwość klikania w wolne obszary
        onSelectSlot={(slotInfo) => {
          const newEvent = {
            start: slotInfo.start,
            end: moment(slotInfo.start).add(1, "hours").toDate(),
            type: activeTab, // Domyślnie ustaw typ na aktywną zakładkę
          };
          console.log("Nowe wydarzenie do dodania:", newEvent); // Debuguj dane wydarzenia
          setSelectedEvent(newEvent);
          setShowCreateModal(true); // Otwórz modal dodawania wydarzenia
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event); // Ustaw wybrane wydarzenie
          setShowEditModal(true); // Otwórz modal
        }}
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter} // Przypisanie stylu do wydarzenia
        onView={onViewChange} // Przekazanie funkcji zmiany widoku
        view={view} // Ustaw aktualny widok
        messages={messages} // Przekazanie tłumaczeń
      />

      </ErrorBoundary>
      {showCreateModal && (
        <CreateEventModal
          show={showCreateModal}
          trainers={trainers}
          eventData={selectedEvent}
          activeTab={activeTab} // Przekazanie aktywnej zakładki jako domyślnego tytułu
         
          onSave={(eventData) => {
            console.log("Zapisano wydarzenie:", eventData); // Debuguj dane zapisywane z modala
            handleAddEvent(eventData); // Wywołaj funkcję dodawania wydarzenia
            setSelectedEvent(null); // Nowe wydarzenie, brak `eventData`
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
          onClose={() => setShowEditModal(false)} // Funkcja zamykająca modal
          onSave={(updatedEvent) => {
            handleAddEvent(updatedEvent); // Wywołanie funkcji zapisu
            setShowEditModal(false); // Zamknięcie modala po zapisie
          }}
          onDelete={handleDeleteEvent} // Usuwa wydarzenie
        />
      )}

    </div>
  );
}

export default Calendar1;
