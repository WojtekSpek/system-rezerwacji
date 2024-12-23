import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftPanel from "./components/LeftPanel";
import TopBar from "./components/TopBar";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import ProjectParticipants from "./components/ProjectParticipants";
import ProjectTrainers from "./components/ProjectTrainers";
import Participants from "./components/Participants";
import Trainers from "./components/Trainers";
import TrainingTypes from "./components/TrainingTypes";
import Login from "./components/Login";

axios.defaults.withCredentials = true; // Włącz przesyłanie ciasteczek
axios.defaults.baseURL = "http://localhost:5000"; // Adres backendu

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Użytkownik
  const [selectedProject, setSelectedProject] = useState(null); // Wybrany projekt
  const [selectedTab, setSelectedTab] = useState("projectDetails"); // Wybrane podmenu

  // Sprawdzenie sesji po załadowaniu aplikacji
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/users/session");
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
    setUser({ name: username, role });
    setIsLoggedIn(true);
  };

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
              isAdmin={user?.role === "admin"}
              onLogout={handleLogout}
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

                  {/* Szczegóły projektu */}
                  <Route
                    path="/projects/:id"
                    element={
                      selectedProject ? (
                        <>
                          {selectedTab === "projectDetails" && (
                            <ProjectDetails project={selectedProject} />
                          )}
                          {selectedTab === "projectParticipants" && (
                            <ProjectParticipants project={selectedProject} />
                          )}
                          {selectedTab === "projectTrainers" && (
                            <ProjectTrainers project={selectedProject} />
                          )}
                        </>
                      ) : (
                        <div>Wybierz projekt, aby zobaczyć szczegóły.</div>
                      )
                    }
                  />

                  {/* Pozostałe sekcje */}
                  <Route path="/participants" element={<Participants />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/trainingTypes" element={<TrainingTypes />} />
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
