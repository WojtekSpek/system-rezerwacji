import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams, useNavigate } from "react-router-dom";
import CreateEventModal from "./CreateEventModalGroup";
import EditGroupEventModal from "./EditGroupEventModal";
//TODO ZROBIĆ validacje czasu jak przy grupowych w calendar1

const localizer = momentLocalizer(moment);

function GroupTrainingCalendar({trainers,groupName,groupParticipantIds}) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Pokazanie okna edycji
  const [isEditing, setIsEditing] = useState(false);
  
  const { id } = useParams(); // ID projektu z URL
  const { id_gr } = useParams(); // ID szkolenia grupowego z URL
  const navigate = useNavigate();
  const projectId = id;
  const trainingId = id_gr;
  const [selectedSlot, setSelectedSlot] = useState(null); // Przechowuje dane o zaznaczeniu
  console.log('groupParticipantIds1',groupParticipantIds)


  useEffect(() => {
    fetchEvents();
    
  }, [trainingId]);

 
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/calendar/group-events/${trainingId}`);
      console.log('response',response)
      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        console.error("Błąd podczas pobierania wydarzeń:", response.data.message);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania wydarzeń grupowych:", error);
    }
  };

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
      
        
        const handleAddEvent = async (newEventData) => {
          
      
          // Jeśli istnieje ID, edytujemy wydarzenie
          if (newEventData.id) {
              try {
                  const response = await axios.put(`/calendar/group-events/${newEventData.id}`, newEventData);
                  if (response.data.success) {
                      setEvents((prevEvents) =>
                        prevEvents.map((evt) =>
                          evt.id === newEventData.id
                            ? { ...evt, ...newEventData, groupParticipantIds: groupParticipantIds }
                            : evt
                        )
                      );
                      console.log('newEventData',newEventData)
                      alert("Wydarzenie zostało zaktualizowane!");
                  }
              } catch (error) {
                  console.error("Błąd podczas edytowania wydarzenia:", error);
                  alert("Nie udało się zaktualizować wydarzenia.");
              }
              return;
          }
      
          // Obsługa grupowego wydarzenia
          if (newEventData.isGroupEvent) {
              const groupEventData = {
                  title: newEventData.title,
                  start: new Date(newEventData.start),
                  end: new Date(newEventData.end),
                  description: newEventData.description,
                  trainingId: trainingId,
                  projectId: projectId,
                  group_trainer_id: newEventData.group_trainer_id,
                  groupParticipantIds: JSON.stringify(groupParticipantIds || []),
              };
      
              try {
                  console.log("groupEventData", groupEventData);
                  const response = await axios.post("/calendar/group-events", groupEventData);
                  if (response.data.success) {
                      alert("Wydarzenie grupowe zostało dodane!");
                      setEvents((prevEvents) => [
                          ...prevEvents,
                          {
                              ...groupEventData,
                              id: response.data.eventId, // ID z bazy
                              isGroupEvent: true,
                          },
                      ]);
                  } else {
                      alert("Nie udało się dodać wydarzenia grupowego.");
                  }
              } catch (error) {
                  console.error("Błąd podczas dodawania wydarzenia grupowego:", error);
                  alert("Wystąpił błąd podczas zapisu.");
              }
              return;
          }
};


  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    // Możesz otworzyć modal edycji tutaj, jeśli potrzeba
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setSelectedEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
      trainingId,
    });
    setShowCreateModal(true);
  };

  // Stylizowanie wydarzeń
  const eventStyleGetter = (event) => {
    if (event.trainingId !== trainingId) {
      return {
        style: {
          backgroundColor: "#d3d3d3", // Szary dla innych grup
          color: "#000",
          opacity: 0.7,
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "#007bff", // Niebieski dla aktualnej grupy
          color: "#fff",
        },
      };
    }
  };

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

  const sanitizedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [events]);
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Kalendarz szkoleń grupowych</h3>
      <BigCalendar
        localizer={localizer}
        events={sanitizedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        //onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter} // Przypisanie stylu do wydarzenia
        messages={messages} // Przekazanie tłumaczeń
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          console.log('trainingId',trainingId)
          console.log('event.groupId',event)
          if (Number(trainingId) === Number(event.groupId)) {
            // Jeśli jesteś na zakładce z możliwością edycji
            console.log('jestem w isediting')
            setIsEditing(true); // Ustaw tryb edycji
            setShowEditModal(true); // Otwórz modal
          } else {
            console.log('jestem w else  isediting')
            // Jeśli jesteś na zakładce bez możliwości edycji
            setIsEditing(false); // Brak trybu edycji
            setShowEditModal(true); // Otwórz modal, ale w trybie tylko do odczytu
          }
        }}
      />

      {showCreateModal && (
            <CreateEventModal
            show={showCreateModal}
            start={selectedSlot.start}
             end={selectedSlot.end}
            eventData={selectedEvent}
            trainers={trainers}
            groupName={groupName}
           
            onSave={(eventData) => {
                console.log("Zapisano wydarzenie:", eventData); // Debuguj dane zapisywane z modala
                handleAddEvent(eventData); // Wywołaj funkcję dodawania wydarzenia
                setSelectedEvent(null); // Nowe wydarzenie, brak `eventData`
                setShowCreateModal(false); // Zamknij modal po zapisie
                fetchEvents();
                
            }}
            onClose={() => setShowCreateModal(false)}
            />
      )}
      {/* Modal dla tworzenia/edycji wydarzeń */}
      {showEditModal && (
        <EditGroupEventModal
          show={showEditModal}
          event={selectedEvent}
          isEditing={isEditing}
          projectId={projectId}
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

export default GroupTrainingCalendar;
