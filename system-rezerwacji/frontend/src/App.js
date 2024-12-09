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

// Konfiguracja Axios do obsługi ciasteczek
axios.defaults.withCredentials = true; // Włącz przesyłanie ciasteczek
axios.defaults.baseURL = "http://localhost:5000"; // Adres backendu

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Zamiast domyślnego użytkownika
  const [view, setView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddUserClick = () => {
    setView("addUser");
  };

  const onUserAdd = (newUser) => {
    console.log("Dodano użytkownika:", newUser);
    // Możesz dodać logikę wysyłania danych do backendu tutaj
  };

  const isAdmin = user?.role === "admin";

  // Weryfikacja sesji po załadowaniu aplikacji
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/session"); // Endpoint sprawdzający sesję
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
      await axios.post("/logout"); // Endpoint wylogowania w backendzie
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  console.log("Aktualny widok:", view);

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
            <LeftPanel setView={setView} />
            {view === "settings" && isAdmin && <Settings setView={setView} />}
            {view === "addUser" && isAdmin && <AddUser onUserAdd={onUserAdd} />}
            {view === "home" && <div>Witaj, {user?.name || "Gościu"}!</div>}
            {view === "projects" && <Projects />}
            {view === "trainers" && <Trainers />}
            {view === "trainingTypes" && <TrainingTypes />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
