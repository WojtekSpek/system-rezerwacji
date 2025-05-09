import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactModal from "react-modal";

import urlProvider from "../urlProvider";

// Chakra UI, Tabs, ikony, ProgressCircle itd.
import { Tabs, Box } from "@chakra-ui/react";
import { LuFolder, LuUser, LuCalendar } from "react-icons/lu"
import { ProgressCircle } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Toaster } from "./ui/toaster";
import { useUpdateData } from "../hooks/useUpdateData";

const localizer = momentLocalizer(moment);
ReactModal.setAppElement("#root"); // Ustawienie głównego elementu aplikacji
moment.locale("pl"); // Ustaw język polski

function TrainerDetails() {
  const { trainersId } = useParams();
  const id = trainersId;
  //@2 const [uploadedFiles, setUploadedFiles] = useState([]); // Lista plików
  const [file, setFile] = useState(null); // Wybrany plik do dodania
  // @1 const [trainer, setTrainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  //const [editedTrainer, setEditedTrainer] = useState({});
  //@2 const [availableTypes, setAvailableTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("Dane osobowe"); // Domyślna zakładka
  //@2 const [events, setEvents] = useState([]); // Wydarzenia dla kalendarza
  const [selectedEvent, setSelectedEvent] = useState(null); // Wybrane wydarzenie
  const [isModalOpen, setIsModalOpen] = useState(false); // Widoczność modalu
  // @1 const [participant, setParticipant] = useState(null);
  //@2 nie używane const [skills, setSkills] = useState([]); // Wszystkie dostępne umiejętności
  //@2 const [trainerSkills, setTrainerSkills] = useState([]); // Umiejętności przypisane do trenera
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  // @2 const [filteredSkills, setFilteredSkills] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();
  /* const [editedTrainer, setEditedTrainer] = useState({
    ...trainer,
    skills: trainer?.skills || [], // Ustaw domyślnie pustą tablicę
  }); */
  const [editedTrainer, setEditedTrainer] = useState({
    trainer: {},
    skills: [], // Ustaw domyślnie pustą tablicę
  });
  const queryClient = useQueryClient();

  /* @2
   const fetchTrainerSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills/${id}/skills`);
      if (response.data.success) {
        setTrainerSkills(response.data.skills);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania umiejętności trenera:", error);
    }
  }; */

  const fetchTrainerSkills = async () => {
    const response = await axios.get(`${API_BASE_URL}/skills/${id}/skills`);
    if (!response.data.success) {
      console.error("Błąd podczas pobierania umiejętności trenera:", response.data.error);
      throw (new Error("Błąd podczas pobierania umiejętności trenera."));
    }
    
    return response.data.skills;
  };
  
  const { data: trainerSkills = [],
  isLoading: isLoadingTrainerSkills,
  isError: isErrorTrainerSkills,
  error: errorTrainerSkills } = useQuery({
    queryKey: ["trainerSkills"],
    queryFn: () => fetchTrainerSkills(),
  })

  // Wyszukiwanie umiejętności
  /* @2
  const handleSkillSearch = async (query) => {
    if (!query) {
      setFilteredSkills([]);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/skills/search`, { params: { query } });
      if (response.data.success) {
        setFilteredSkills(response.data.skills);
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania umiejętności:", error);
    }
  }; */
  
  const handleSkillSearch = async (query) => {
    if (!query) {
      queryClient.setQueryData("filteredSkills", []);
      return;
    }

    const response = await axios.get(`${API_BASE_URL}/skills/search`, { params: { query } });
    if (!response.data.success) {
      console.error("Błąd podczas wyszukiwania umiejętności:", response.data.error);
      throw (new Error("Błąd podczas pobierania umiejętności trenera."));
    }
    
    return response.data.skills;
  };
  
  const { data: filteredSkills = [],
  isLoading: isLoadingSkillSearch,
  isError: isErrorSkillSearch,
  error: errorSkillSearch } = useQuery({
    queryKey: ["filteredSkills"],
    queryFn: () => handleSkillSearch(),
  })

  const handleAddSkill = (skill) => {
    // Upewnij się, że `skills` jest tablicą
    if (!Array.isArray(editedTrainer.skills)) {
      setEditedTrainer((prev) => ({ ...prev, skills: [] }));
    }
  
    // Jeśli umiejętność już istnieje, nie dodawaj jej ponownie
    if ((editedTrainer.skills || []).some((s) => s.id === skill.id)) {
      alert("Ta umiejętność jest już dodana.");
      return;
    }
  
    // Dodaj nową umiejętność
    setEditedTrainer((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), skill], // Bezpiecznie dodaj do istniejącej tablicy
    }));
  };
  
  
  
  // Usuwanie umiejętności
  const handleRemoveSkill = (skillId) => {
    setEditedTrainer((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== skillId),
    }));
  };


  //console.log('event.participantId',events)

  useEffect(() => {
    //fetchEvents();
    console.log('useEffect')
    //fetchTrainerDetails();
    //fetchAvailableTypes();
    //fetchFiles();
    
    //fetchTrainerSkills();
    
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

  /* @2 
  const fetchEvents = async () => {
    console.log('tu_fetchEvents')
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/calendar/${id}/events`, {
        withCredentials: true,
      });
      console.log('tu_fetchEvents',`${API_BASE_URL}/trainers/calendar/${id}/events`)
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
  }; */

  const fetchEvents = async () => {
    console.log('tu_fetchEvents')
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/calendar/${id}/events`, {
        withCredentials: true,
      });

      console.log('tu_fetchEvents',`${API_BASE_URL}/trainers/calendar/${id}/events`)
      if (response.data.success) {
        return (
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
      throw (new Error("Błąd podczas pobierania szczegółów zajęć."));
    }
  };
  
  const { data: events = {},
  isLoading: isLoadingEvents,
  isError: isErrorEvents,
  error: errorEvents } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  })
  

  /* const fetchParticipant = async (participantId) => {
    console.log('tratata')
    try {
      const response = await axios.get(
        `${API_BASE_URL}/participants/${participantId}`
      ); // API endpoint zwracający szczegóły uczestnika
      if (response.data.success) {
        setParticipant(response.data.participant);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szczegółów uczestnika:", error);
    }
  }; */


  const fetchParticipant = async (participantId) => {
    if (participantId === undefined) return;

    const response = await axios.get(
      `${API_BASE_URL}/participants/${participantId}`
    ); // API endpoint zwracający szczegóły uczestnika

    if (!response.data.success) {
      console.error("Błąd podczas pobierania szczegółów uczestnika:", response.data);
      throw (new Error("Błąd podczas pobierania szczegółów uczestnika."));
    }
    
    return response.data.participant;   
  
  };
  
  const { data: participant = {},
  isLoading: isLoadingParticipant,
  isError: isErrorParticipant,
  error: errorParticipant } = useQuery({
    queryKey: ["participant"],
    queryFn: () => fetchParticipant(),
  })

  /* @2 const fetchFiles = async () => {
    try {
      const response = await axios.get(`/files/trainer/${trainersId}`);
      if (response.data.success) {
        setUploadedFiles(response.data.files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }; */
  
  const fetchFiles = async () => {
    const response = await axios.get(`/files/trainer/${trainersId}`);
    if (!response.data.success) {
      console.error("Error fetching files:", response.data.error);
      throw (new Error("Błąd podczas pobierania listy plików."));
    }
    
    return response.data.files;
  };
  
  const { data: uploadedFiles = {},
  isLoading: isLoadingUploadedFiles,
  isError: isErrorUploadedFiles,
  error: errorUploadedFiles } = useQuery({
    queryKey: ["uploadedFiles"],
    queryFn: () => fetchFiles(),
  })
  
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
  

  /* const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setTrainer(response.data.trainer);
      }
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  }; */

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/${id}`, {
        withCredentials: true,
      });

      if (!response.data.success) {
        console.error("Błąd podczas pobierania szczegółów uczestnika:", response.data.error.messages);
        throw (new Error("Błąd podczas pobierania szczegółów uczestnika."));
      }
      
      return response.data.trainer;

    } catch (error) {
      console.error("Error fetching trainer details:", error);
      throw (new Error("Błąd podczas pobierania szczegółów uczestnika."));
    }    
  
  };
  
  const { data: trainer = {},
  isLoading: isLoadingTrainer,
  isError: isErrorTrainer,
  error: errorTrainer } = useQuery({
    queryKey: ["trainer", id],
    queryFn: () => fetchTrainerDetails(),
  })

  /*
  @2 const fetchAvailableTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers/trainingTypes`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setAvailableTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching training types:", error);
    }
  }; */

  const fetchAvailableTypes = async () => {
    const response = await axios.get(`${API_BASE_URL}/trainers/trainingTypes`, {
      withCredentials: true,
    });
    if (!response.data.success) {
      console.error("Error fetching training types:", response.data.error);
      throw (new Error("Błąd podczas pobierania typów zajęć."));
    }
    
    return response.data.data;
  };
  
  const { data: availableTypes = {},
  isLoading: isLoadingAvailableTypes,
  isError: isErrorAvailableTypes,
  error: errorAvailableTypes } = useQuery({
    queryKey: ["availableTypes"],
    queryFn: () => fetchAvailableTypes(),
  })
  
  const handleSave = async () => {
    console.log("Saving trainer:", editedTrainer);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/trainers/editTrainer/${id}`,
        editedTrainer,
        { withCredentials: true }
      );
       if (response.data.success) {
      alert("Dane zostały zapisane.");
      await fetchTrainerDetails(); // Ponowne pobranie szczegółów trenera
      await fetchTrainerSkills(); // Ponowne pobranie umiejętności trenera
      setIsEditing(false);
    }
  } catch (error) {
    console.error("Error saving trainer data:", error);
    alert("Wystąpił błąd podczas zapisywania danych.");
  }
};

const renderTrainerPersonalDataTabContent = () => {
  return (<div>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
          setEditedTrainer({
            ...trainer,
            skills: trainerSkills || [], // Przypisz umiejętności do edytowanego trenera
          });
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
      <div className="mb-4">
        <h3 className="font-semibold">Umiejętności:</h3>
        <ul>
          {trainerSkills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>);
};

const renderTrainerFilesTabContnet = () => {
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
                href={`${API_BASE_URL}/files/trainers/${id}/${file}`} // Ścieżka do pliku
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
};

const renderTrainerCallendarTabContent = () => {
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
          //setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
          queryClient.setQueryData(['participant', null]);
        }}
        className="relative bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
        >
        {selectedEvent && (
          <div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                //setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
                queryClient.setQueryData(['participant', null]);
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
    </div>);
};

const renderTabContentChakraUI = () => {
  return (<div className="flex justify-between items-center mb-2">
    <Tabs.Root lazyMount unmountOnExit defaultValue="Dane osobowe" value={activeTab}
      onValueChange={(activeTabValue) => setActiveTab(activeTabValue.value)} >
      <Tabs.List gap={5} borderBottomWidth={3}>
        <Tabs.Trigger value="Dane osobowe" key={0} whiteSpace="nowrap" >
          <LuUser boxSize="16px" />
          Dane osobowe
        </Tabs.Trigger>
        <Tabs.Trigger value="Pliki" key={1} whiteSpace="nowrap" >
          <LuFolder boxSize="16px" />
          Pliki
        </Tabs.Trigger>
        <Tabs.Trigger value="Kalendarz" key={2} whiteSpace="nowrap" >
          <LuCalendar boxSize="16px"/>
          Kalendarz
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Dane osobowe" key={0}>{renderTrainerPersonalDataTabContent()}</Tabs.Content>
      <Tabs.Content value="Pliki" key={1}>{renderTrainerFilesTabContnet()}</Tabs.Content>
      <Tabs.Content value="Kalendarz" key={2}>{renderTrainerCallendarTabContent()}</Tabs.Content>
    </Tabs.Root>
  </div>)
};

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dane osobowe":
        return (
          <div>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setEditedTrainer({
                  ...trainer,
                  skills: trainerSkills || [], // Przypisz umiejętności do edytowanego trenera
                });
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
            <div className="mb-4">
              <h3 className="font-semibold">Umiejętności:</h3>
              <ul>
                {trainerSkills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
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
                        href={`${API_BASE_URL}/files/trainers/${id}/${file}`} // Ścieżka do pliku
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
                    //setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
                    queryClient.setQueryData(['participant', null]);
                  }}
                  className="relative bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20 z-50"
                  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
                  >
                  {selectedEvent && (
                    <div>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          //setParticipant(null); // Wyczyść dane uczestnika po zamknięciu
                          queryClient.setQueryData(['participant', null]);
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

  if (isLoadingTrainer) {
    return (<div className="flex items-center justify-center h-screen">
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </div>);
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{trainer.name}</h2>
        
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
            <div className="mb-4">
              <label className="font-semibold">Umiejętności:</label>
              <div className="flex flex-col gap-2">
                {/* Wyszukiwanie umiejętności */}
                <div className="relative">
                <input
                  type="text"
                  placeholder="Wyszukaj umiejętność..."
                  value={skillSearchQuery}
                  onChange={(e) => {
                    setSkillSearchQuery(e.target.value);
                    handleSkillSearch(e.target.value); // Wywołaj wyszukiwanie
                  }}
                  onBlur={() => queryClient.setQueryData("filteredSkills", [])} // Ukryj listę po opuszczeniu pola
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {/* Lista podpowiedzi */}
                {filteredSkills.length > 0 && skillSearchQuery && (
                  <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 z-10">
                    {filteredSkills.map((skill) => (
                      <li
                        key={skill.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={() => handleAddSkill(skill)} // Zapobiegaj zamykaniu listy na kliknięcie
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>


                {/* Lista dodanych umiejętności */}
                <div className="flex flex-wrap gap-2">
                  {(editedTrainer.skills || []).map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSkill(skill.id)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {editedTrainer.skills?.length === 0 && <p>Brak przypisanych umiejętności</p>}
                </div>
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
          renderTabContentChakraUI()
        )}

    </div>
  );
}

export default TrainerDetails;
