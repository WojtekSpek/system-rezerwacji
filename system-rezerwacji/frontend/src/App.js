import React, { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import TopBar from "./components/TopBar";
import Settings from "./components/Settings";
import AddUser from "./components/AddUser";
import Projects from "./components/Projects";
import Login from "./components/Login"; // Ekran logowania
import TrainingTypes from "./components/TrainingTypes";
import Trainers from "./components/Trainers";

function App() {
  // Domyślnie użytkownik jest niezalogowany
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Zamiast domyślnego użytkownika "Jan Kowalski"
  const [view, setView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const handleAddUserClick = () => {setView("addUser");};

  const onUserAdd = (newUser) => {console.log("Dodano użytkownika:", newUser);     // Możesz dodać logikę wysyłania danych do backendu tutaj
  };

  // Sprawdzenie, czy użytkownik jest adminem
  const isAdmin = user?.role === "admin";

  // Weryfikacja stanu logowania po odświeżeniu strony
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Pobierz dane z localStorage
    if (storedUser) {
      setUser(storedUser); // Ustaw dane użytkownika
      setIsLoggedIn(true); // Oznacz jako zalogowany
    }
  }, []);

  const handleLogin = (username, role) => {
    const loggedInUser = { name: username, role };
    setUser(loggedInUser); // Ustaw dane użytkownika
    setIsLoggedIn(true); // Przełącz na zalogowany stan
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Zapisz dane w localStorage
  };

  const handleLogout = () => {
    setUser(null); // Usuń dane użytkownika
    setIsLoggedIn(false); // Przełącz na wylogowany stan
    localStorage.removeItem("user"); // Usuń dane z localStorage
  };
  console.log("Aktualny widok:", view); // Dodaj tutaj logowanie
  return (
    <div className="App">
      {!isLoggedIn ? (
        // Jeśli użytkownik nie jest zalogowany, pokaż ekran logowania
        <Login onLogin={handleLogin} />
      ) : (
        // Jeśli użytkownik jest zalogowany, pokaż panel główny
        <>
          <TopBar user={user} isAdmin={isAdmin} onLogout={handleLogout} onSettingsClick={() => setView("settings")} selectedProject={selectedProject} />
          <div className="main-layout flex">
            <LeftPanel setView={setView} />
            {view === "settings" && isAdmin && <Settings setView={setView} />}
            {view === "addUser" && isAdmin && <AddUser onUserAdd={onUserAdd} />}
            {view === "home" && <div>Witaj, {user.name}!</div>}
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
