import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftPanel from "./components/LeftPanel";
import TopBar from "./components/TopBar";
import Projects from "./components/Projects";
import ProjectParticipants from "./components/ProjectParticipants";
import ProjectDetails from "./components/ProjectDetails";
import ProjectParticipantDetails from "./components/ProjectParticipantDetails";
import ProjectTrainers from "./components/ProjectTrainers";
import ProjectNotes from "./components/ProjectNotes";
import ProjectGroup from "./components/ProjectGroup";
import ProjectGroupTrainingDetails from "./components/ProjectGroupTrainingDetails";
import Participants from "./components/Participants";
import ParticipantDetails from "./components/ParticipantDetails";
import Trainers from "./components/Trainers";
import TrainerDetails from "./components/TrainerDetails";
import TrainingTypes from "./components/TrainingTypes";
import Login from "./components/Login";
import Adminsetting from "./components/Settings";
import AdminAddUser from "./components/AddUser";
import AdminTrainingTypes from "./components/TrainingTypes";
import AdminSkillSettings from "./components/SkillSettings";
//const API_BASE_URL = "https://system-rezerwacji-1.onrender.com";

axios.defaults.withCredentials = true; // Włącz przesyłanie ciasteczek
//axios.defaults.baseURL = `${API_BASE_URL}`; // Adres backendu

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Użytkownik
  const [selectedProject, setSelectedProject] = useState(null); // Wybrany projekt
  const [selectedTab, setSelectedTab] = useState("projectDetails"); // Wybrane podmenu
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Czy użytkownik jest adminem
  const [isLoading, setIsLoading] = useState(true); // Czy dane użytkownika są ładowane

  // Sprawdzenie sesji po załadowaniu aplikacji
 

// Funkcja sprawdzająca sesję
const checkSession = async () => {
  console.log("Rozpoczynam sprawdzanie sesji...");
  try {
    const response = await axios.get("https://system-rezerwacji-1.onrender.com/users/session");
    console.log("Dane zwrócone z /users/session:", response.data);

    if (response.data.success) {
      setUser(response.data.user);
      setIsLoggedIn(true);
      setIsAdmin(response.data.user.role === "admin");
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  } catch (error) {
    console.error("Błąd podczas sprawdzania sesji:", error);
  } finally {
    setIsLoading(false);
    console.log("Kończę sprawdzanie sesji...");
  }
};

useEffect(() => {
  checkSession();
}, []);

// Obsługa logowania
const handleLogin = async (username, role) => {
  try {
    const loggedInUser = { name: username, role };
    setUser(loggedInUser);
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");

    // Wymuś ponowne sprawdzenie sesji
    await checkSession();
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
  }
};

  // Oczekiwanie na zakończenie ładowania danych użytkownika
  if (isLoading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }
  // Obsługa wylogowania
  const handleLogout = async () => {
    try {
      await axios.post("/users/logout");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <TopBar
              user={user}
              isAdmin={isAdmin}
              onLogout={handleLogout}
              selectedProject={selectedProject} // Dodano
            />
            <div className="main-layout flex">
              {/* Panel boczny */}
              <LeftPanel
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />

              {/* Główna zawartość */}
              <div className="flex-1 p-4">
                <Routes>
                  {/* Widok domyślny */}
                  <Route
                    path="/"
                    element={<div>Witaj, {user?.name || "Gościu"}!</div>}
                  />
                  
                  {/* Lista projektów */}
                  <Route
                    path="/projects"
                    element={
                      <Projects
                        setSelectedProject={setSelectedProject}
                      />
                    }
                  />
                  <Route
                    path="/projects/:id/participants"
                    element={
                      <ProjectParticipants
                        setSelectedParticipant={setSelectedParticipant}
                      />
                    }
                  />
                  <Route
                    path="/projects/:id/participants/:participantId/details"
                    element={<ProjectParticipantDetails />}
                  />
                <Route
                    path="/participants/:participantId/details"
                    element={<ParticipantDetails />}
                  />
                  
                  <Route
                    path="/trainer/:trainersId"
                    element={<TrainerDetails />}
                  />
                  {/* Szczegóły projektu */}
                  <Route path="/projects/:id">
                    <Route path="details" element={<ProjectDetails />} />
                    <Route path="participants" element={<ProjectParticipants />} />
                    <Route path="trainers" element={<ProjectTrainers />} />
                    <Route path="group" element={<ProjectGroup />} />
                    <Route path="notes" element={<ProjectNotes/>} />
                    <Route path="Group/:id_gr" element={<ProjectGroupTrainingDetails />} />
                  </Route>


                  {/* Pozostałe sekcje */}
                  <Route path="/participants" element={<Participants />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/trainingTypes" element={<TrainingTypes />} />
                  <Route path="/settings" element={<Adminsetting/>} />
                  <Route path="/AddUser" element={<AdminAddUser/>} />
                  <Route path="/TrainingTypes" element={<AdminTrainingTypes/>} />
                  <Route path="/SkillSettings" element={<AdminSkillSettings/>} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
