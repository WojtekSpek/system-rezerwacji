import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import header from "./components/Header";
import home from "./components/Home";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Logika logowania i przekierowania
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />;
  }

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default App;
