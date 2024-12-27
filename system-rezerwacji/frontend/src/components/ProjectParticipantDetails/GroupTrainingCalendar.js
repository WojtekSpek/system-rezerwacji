import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams, useNavigate } from "react-router-dom";
import CreateEventModal from "./CreateEventModalGroup";


const localizer = momentLocalizer(moment);

function GroupTrainingCalendar({ }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { id } = useParams(); // ID projektu z URL
  const { id_gr } = useParams(); // ID szkolenia grupowego z URL
  const navigate = useNavigate();
  const projectId = id;
  const trainingId = id_gr;

  useEffect(() => {
    fetchEvents();
  }, [trainingId]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/calendar/group-events/${trainingId}`);
      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        console.error("Błąd podczas pobierania wydarzeń:", response.data.message);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania wydarzeń grupowych:", error);
    }
  };
  const handleAddEvent = async (newEventData) => {
   
        // Dodawanie wydarzenia grupowego
        const groupEventData = {
          title: newEventData.title,
          start: newEventData.start,
          end: newEventData.end,
          description: newEventData.description,
          trainingId: newEventData.trainingId,
          projectId: projectId,
        };
    
        try {
          const response = await axios.post("/calendar/group-events", groupEventData);
          if (response.data.success) {
            alert("Wydarzenie grupowe zostało dodane!");
            setEvents((prevEvents) => [...prevEvents, { ...newEventData, isGroupEvent: true }]);
          } else {
            alert("Nie udało się dodać wydarzenia grupowego.");
          }
        } catch (error) {
          console.error("Błąd podczas dodawania wydarzenia grupowego:", error);
          alert("Wystąpił błąd podczas zapisu.");
        }
       
    };
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    // Możesz otworzyć modal edycji tutaj, jeśli potrzeba
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      title: "",
      start: slotInfo.start,
      end: moment(slotInfo.start).add(1, "hours").toDate(),
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
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter} // Przypisanie stylu do wydarzenia
        messages={messages} // Przekazanie tłumaczeń
      />

      {showCreateModal && (
            <CreateEventModal
            show={showCreateModal}
            eventData={selectedEvent}
            onSave={(eventData) => {
                console.log("Zapisano wydarzenie:", eventData); // Debuguj dane zapisywane z modala
                handleAddEvent(eventData); // Wywołaj funkcję dodawania wydarzenia
                setSelectedEvent(null); // Nowe wydarzenie, brak `eventData`
                setShowCreateModal(false); // Zamknij modal po zapisie
            }}
            onClose={() => setShowCreateModal(false)}
            />
      )}
    </div>
  );
}

export default GroupTrainingCalendar;
