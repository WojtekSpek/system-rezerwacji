import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EditEventModal from "./EditEventModal";

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
  activeTab,
  selectedTrainer, // Dodaj selectedTrainer jako prop
  setSelectedTrainer, // Dodaj setSelectedTrainer jako prop
}) {
    const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie do edycji
    const [showEditModal, setShowEditModal] = useState(false); // Pokazanie okna edycji
    const [trainers, setTrainers] = useState([]);
   // const [selectedTrainer, setSelectedTrainer] = useState(null);
   
    console.log('trainers', trainers)

    useEffect(() => {
        const fetchTrainers = async () => {
          try {
            const response = await axios.get(`/projects/${projectId}/trainers/${typeId}`);
            if (response.data.success) {
              setTrainers(response.data.trainers);
              console.log('participantId',participantId)
            }
          } catch (error) {
            console.error("Błąd podczas pobierania trenerów projektu:", error);
          }
        };
        
        fetchTrainers();
      }, [projectId, activeTab]);

      const currentType = projectTypesAll.find((type) => type.name === activeTab);
      const typeId = currentType?.id;
      console.log("Obecne typeId:", projectTypesAll);



   

    const handleSelectSlot = (slotInfo) => {
    const title = window.prompt("Podaj tytuł wydarzenia:");
    if (title && selectedTrainer) {
      onAddEvent({
        start: slotInfo.start,
        end: slotInfo.end,
        title,
        trainerId: selectedTrainer.id,
      });
      
    } else {
        console.log('slotInfo',slotInfo)
     // alert("Wybierz trenera przed dodaniem wydarzenias.");
    }
  };

  const handleSelectEvent = (event) => {
    /* setSelectedEvent(event); // Ustaw wybrane wydarzenie 
    setShowEditModal(true); // Pokaż okno edycji  */
    console.log("Kliknięte wydarzenie:", event);
    onEditEvent(event); // Wywołaj funkcję przekazaną z ProjectParticipantDetails
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
      <BigCalendar
       events={events}
       localizer={localizer}
       startAccessor="start"
       endAccessor="end"
       selectable
       onSelectEvent={handleSelectEvent} // Obsługuje kliknięcie wydarzenia
       onSelectSlot={handleSelectSlot} // Obsługa dodawania wydarzeń
       style={{ height: 500 }}
      />


      {/* {showEditModal && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditEvent}
        />
      )} */}

    </div>
  );
}

export default Calendar1;
