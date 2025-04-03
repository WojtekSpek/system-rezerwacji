import React, { useState, useEffect } from "react";
import axios from "axios";
import urlProvider from "../urlProvider";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();


  // Pobieranie listy użytkowników
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      console.error("Błąd podczas pobierania użytkowników:", err);
    }
  };

  const handleAddUser = async () => {
    if (!newUsername || !newPassword) {
      setMessage("Podaj nazwę użytkownika i hasło.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/add-user`, {
        username: newUsername,
        password: newPassword,
        role: "user",
      });

      if (response.status === 201) {
        setMessage("Dodano użytkownika pomyślnie!");
        setNewUsername("");
        setNewPassword("");
        fetchUsers(); // Odśwież listę użytkowników
      }
    } catch (err) {
      console.error("Błąd podczas dodawania użytkownika:", err);
      setMessage("Nie udało się dodać użytkownika.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Administracyjny</h1>

      {/* Formularz dodawania użytkownika */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Dodaj użytkownika</h2>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className="border p-2 mr-2"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className="border p-2 mr-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>

      {/* Lista użytkowników */}
      <div>
        <h2 className="text-2xl mb-4">Lista użytkowników</h2>
        <ul className="list-disc pl-6">
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
