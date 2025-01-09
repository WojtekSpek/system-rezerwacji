import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EditEventModal from "./EditEventModal";
import CreateEventModal from "./CreateEventModal";
import { hasConflict, hasConflictExcludingCurrent } from "../function/dateConflictChecker";
import { createEventStyleGetter } from "../function/getEventStyle.js";


const localizer = momentLocalizer(moment);

function Calendar1({
  events,
  onAddEvent,
  setEvents, // Dodano setEvents jako props
  onEditEvent,
  participantId,
  newEvent,
  setParticipant,
  currentType,
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
    const [isEditing, setIsEditing] = useState(false);
    const [key, setKey] = useState(0); // Klucz do wymuszenia ponownego renderowania
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
    //console.log('newEventData.participantId', newEventData.participantId)
    console.log("events_cal:", events);

    const eventStyleGetter = createEventStyleGetter(currentType); // Tworzymy funkcję getEventStyle z `currentType`
console.log('currentType',currentType)

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



// Obsługa dodawania wydarzenia
const handleAddEvent = async (newEventData) => {
  console.log("handleAddEvent - Przekazane dane:", newEventData);

  try {
    // Pobranie istniejących wydarzeń dla uczestnika
    const participantResponse= await axios.get(`/participants/events/${participantId}`);
    
    if (!participantResponse.data.success) {
      alert("Nie udało się sprawdzić konfliktów dla uczestnika.");
      return;
    }
    
    const existingParticipantEvents = participantResponse.data.events;
    
    const trainer1 = trainers.find((trainer) => trainer.projectTrainerId=== newEventData.projectTrainerId);
    console.log('trainerResponse',`/trainers/calendar/${trainer1.id}/events`)
    // Pobranie istniejących wydarzeń dla trenera
    const trainerResponse = await axios.get(`/trainers/calendar/${trainer1.id}/events`);
    
    if (!trainerResponse.data.success) {
      alert("Nie udało się sprawdzić konfliktów dla trenera.");
      return;
    }

    const existingTrainerEvents = trainerResponse.data.events;
   // console.log('existingTrainerEvents',existingTrainerEvents)
    // Sprawdzenie konfliktów w przypadku dodawania lub edycji wydarzenia
    if (newEventData.id) {
      // Edycja istniejącego wydarzenia
      if (
        hasConflict(existingParticipantEvents.filter(evt => evt.id !== newEventData.id), newEventData) ||
        hasConflict(existingTrainerEvents.filter(evt => evt.id !== newEventData.id), newEventData)
      ) {
        alert("Edycja koliduje z istniejącym wydarzeniem dla uczestnika lub trenera!");
        return;
      }
    } else {
      // Dodawanie nowego wydarzenia
      if (
        hasConflict(existingParticipantEvents, newEventData) ||
        hasConflict(existingTrainerEvents, newEventData)
      ) {
        alert("Dodawane wydarzenie koliduje z innym terminem uczestnika lub trenera!");
        return;
      }
    }

    if (newEventData.id) {
      // Edytowanie istniejącego wydarzenia
      const editResponse = await axios.put(`/calendar/events/${newEventData.id}`, newEventData);
      if (editResponse.data.success) {
        setEvents((prevEvents) =>
          prevEvents.map((evt) =>
            evt.id === newEventData.id ? { ...evt, ...newEventData } : evt
          )
        );
        alert("Wydarzenie zostało zaktualizowane!");
      }
    } else {
      // Dodawanie nowego wydarzenia
      const eventToSave = {
        ...newEventData,
        isGroupEvent: 0,
        groupParticipantIds: 0,
        participantId: participantId,
        projectId, // ID projektu
        Type_id: currentType.id,
      };
      console.log('data',newEventData.start)
      const saveResponse = await axios.post("/calendar/events", eventToSave);
      if (saveResponse.data.success) {
        const savedEvent = {
          ...eventToSave,
          id: saveResponse.data.eventId, // ID z bazy
          start: newEventData.start,
          end: newEventData.end,
        };

        setEvents((prevEvents) => [...prevEvents, savedEvent]);
        alert("Wydarzenie zostało dodane!");
      } else {
        alert("Nie udało się dodać wydarzenia.");
      }
    }
  } catch (error) {
    console.error("Błąd podczas dodawania/edycji wydarzenia:", error);
    alert("Wystąpił błąd podczas zapisu.");
  }

  setShowCreateModal(false); // Zamknij modal
  fetchEvents();
};


    const sanitizedEvents = useMemo(() => {
      if (!events || !Array.isArray(events)) {
        console.error("Events jest null lub nie jest tablicą:", events);
        return [];
      }
    
      return events.map((event) => {
        const utcStart = new Date(event.start); // To działa, jeśli event.start ma końcówkę "Z"
        const utcEnd = new Date(event.end);
    
        console.log("Event start (UTC):", utcStart);
        return {
          ...event,
          start: utcStart, // Przekazuje UTC do kalendarza
          end: utcEnd,
        };
      });
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

  
  // Obsługa zapisu wydarzenia (nowego lub edytowanego)
 
  console.log('czy edytujemy czy czytamy_calen',isEditing)
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
  console.log("Event start (wejście):", events.start);
const utcStart = moment.utc(events.start).toDate();
console.log("Event start (UTC):", utcStart);
  console.log("Sanitized Events w renderowaniu:", sanitizedEvents);
  return (
    <div>
      
      

      {/* Dodawanie wydarzenia */}
      <div className="mb-4">
       
      
      </div>

      {/* Kalendarz */}
      <ErrorBoundary>
      <BigCalendar
       key={`${activeTab}-${sanitizedEvents.length}`} // Dodaj dynamiczny klucz
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={sanitizedEvents} // Użyj zabezpieczonych danych
        selectable // Włącza możliwość klikania w wolne obszary
        eventPropGetter={eventStyleGetter} // Przypisanie stylu do wydarzenia
        onSelectSlot={(slotInfo) => {
          const newEvent = {
            start: slotInfo.start,
            end: slotInfo.end,
            type: activeTab, // Domyślnie ustaw typ na aktywną zakładkę
          };
          console.log("Nowe wydarzenie do dodania:", newEvent); // Debuguj dane wydarzenia
          setSelectedEvent(newEvent);
          setShowCreateModal(true); // Otwórz modal dodawania wydarzenia
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event); // Ustaw wybrane wydarzenie
        
          if (activeTab === event.typeName) {
            // Jeśli jesteś na zakładce z możliwością edycji
            setIsEditing(true); // Ustaw tryb edycji
            setShowEditModal(true); // Otwórz modal
          } else {
            // Jeśli jesteś na zakładce bez możliwości edycji
            setIsEditing(false); // Brak trybu edycji
            setShowEditModal(true); // Otwórz modal, ale w trybie tylko do odczytu
          }
        }}
        style={{ height: 500 }}
       
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
            eventPropGetter={eventStyleGetter} // Przypisanie stylu do wydarzenia
          
          }}
          onClose={() => {
           
          setShowCreateModal(false)}}
         
        />
      )}
      {/* Modal dla tworzenia/edycji wydarzeń */}
      {showEditModal && (
        <EditEventModal
          show={showEditModal}
          event={selectedEvent}
          isEditing={isEditing}
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
