import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios do komunikacji z backendem
import LeftPanel from "./components/LeftPanel";
import TopBar from "./components/TopBar";
import Settings from "./components/Settings";
import AddUser from "./components/AddUser";
import Projects from "./components/Projects";
import Login from "./components/Login"; // Ekran logowania
import TrainingTypes from "./components/TrainingTypes";
import Trainers from "./components/Trainers";
import Participants from "./components/Participants";
import ProjectDetails from "./components/ProjectDetails"; // Szczegóły projektu
import ProjectParticipants from "./components/ProjectParticipants"; // Nowy komponent
import ProjectTrainers from "./components/ProjectTrainers"; // Nowy komponent
import ProjectParticipantDetails from "./components/ProjectParticipantDetails";

// Konfiguracja Axios do obsługi ciasteczek
axios.defaults.withCredentials = true; // Włącz przesyłanie ciasteczek
axios.defaults.baseURL = "http://localhost:5000"; // Adres backendu

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Zamiast domyślnego użytkownika
  const [view, setView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null); // Wybrany projekt
  const [projects, setProjects] = useState([]); // Lista projektów
  const [selectedParticipant, setSelectedParticipant] = useState(null); // Wybrany uczestnik

  // Obsługa dodawania użytkownika
  const onUserAdd = (newUser) => {
    console.log("Dodano użytkownika:", newUser);
  };

  // Sprawdzenie, czy użytkownik jest adminem
  const isAdmin = user?.role === "admin";

  // Weryfikacja sesji po załadowaniu aplikacji
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/users/session"); // Endpoint sprawdzający sesję
        if (response.data.success) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Błąd podczas sprawdzania sesji:", error);
      }
    };

    checkSession();
  }, []);

  // Obsługa logowania
  const handleLogin = async (username, role) => {
    const loggedInUser = { name: username, role };
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  // Obsługa wylogowania
  const handleLogout = async () => {
    try {
      await axios.post("/users/logout"); // Endpoint wylogowania w backendzie
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  // Aktualizacja projektu w stanie
  const updateProjectInState = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        // Jeśli użytkownik nie jest zalogowany, pokaż ekran logowania
        <Login onLogin={handleLogin} />
      ) : (
        // Jeśli użytkownik jest zalogowany, pokaż panel główny
        <>
          <TopBar
            user={user}
            isAdmin={isAdmin}
            onLogout={handleLogout}
            onSettingsClick={() => setView("settings")}
            selectedProject={selectedProject || null}
          />
          <div className="main-layout flex">
            <LeftPanel
              view={view}
              setView={(newView) => {
                setView(newView);
                if (
                  newView !== "projectDetails" &&
                  newView !== "projectParticipants" &&
                  newView !== "projectTrainers"
                ) {
                  setSelectedProject(null); // Resetuje wybrany projekt, gdy opuszczamy widoki projektu
                }
              }}
              selectedProject={selectedProject} // Przekazanie do bocznego menu
            />
            {/* Widoki aplikacji */}
            <div className="flex-1 p-4">
              {view === "settings" && isAdmin && <Settings setView={setView} />}
              {view === "addUser" && isAdmin && <AddUser onUserAdd={onUserAdd} />}
              {view === "home" && <div>Witaj, {user?.name || "Gościu"}!</div>}
              {view === "projects" && (
                <Projects
                  setView={setView} // Przekazujemy setView
                  setSelectedProject={setSelectedProject} // Przekazujemy funkcję ustawiania projektu
                  projects={projects}
                  setProjects={setProjects} // Przekazujemy funkcję aktualizacji projektów
                />
              )}
              {view === "trainers" && <Trainers />}
              {view === "trainingTypes" && <TrainingTypes />}
              {view === "participants" && <Participants />}
              {view === "projectDetails" && (
                <ProjectDetails
                  project={selectedProject}
                  onBack={() => setView("projects")}
                  onUpdate={updateProjectInState}
                />
              )}
              {view === "projectParticipants" && (
                <ProjectParticipants
                  project={selectedProject}
                  projectId={selectedProject?.id}
                  setView={setView} // Dodaj funkcję przełączania widoku
                  setSelectedParticipant={setSelectedParticipant} // Dodaj funkcję ustawiania uczestnika
                />
              )}
              {view === "projectTrainers" && (
                <ProjectTrainers projectId={selectedProject?.id} />
              )}
              {view === "projectParticipantDetails" && (
                <ProjectParticipantDetails
                participantId={selectedParticipant?.id}
                 projectId={selectedProject?.id}
                  participant={selectedParticipant} // Przekazujemy wybranego uczestnika
                  onBack={() => setView("projectParticipants")} // Powrót do listy uczestników
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
