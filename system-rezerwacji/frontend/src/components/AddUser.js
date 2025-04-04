import React, { useState, useEffect } from "react";
import axios from "axios";
import urlProvider from "../urlProvider";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Dodano pole email
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [editUser, setEditUser] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();
console.log(users)
  // Pobierz użytkowników z backendu
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!username || !password || !email || !role) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    try {
      if (editUser) {
        console.log('email',email)
        // Edycja istniejącego użytkownika
        const response = await axios.put(`${API_BASE_URL}/users/updateUser`, {
          id: editUser.id,
          username,
          email, // Aktualizacja email
          password,
          role,
        });

        if (response.data.success) {
          setSuccessMessage("Użytkownik został pomyślnie zaktualizowany!");
        }
      } else {
        // Dodanie nowego użytkownika
        const response = await axios.post(`${API_BASE_URL}/users/addUser`, {
          username,
          email, // Dodanie email
          password,
          role,
        });

        if (response.data.success) {
          setSuccessMessage("Użytkownik został pomyślnie dodany!");
        }
      }

      fetchUsers(); // Odśwież listę użytkowników
      clearForm(); // Wyczyść formularz
    } catch (error) {
      console.error("Błąd podczas dodawania/edycji użytkownika:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/users/deleteUser/${id}`);
      if (response.data.success) {
        setSuccessMessage("Użytkownik został pomyślnie usunięty!");
        fetchUsers();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania użytkownika:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setUsername(user.username);
    setEmail(user.email); // Ustaw email podczas edycji
    setPassword(""); // Hasło zawsze trzeba wprowadzić od nowa
    setRole(user.role);
  };

  const clearForm = () => {
    setUsername("");
    setEmail(""); // Wyczyść pole email
    setPassword("");
    setRole("");
    setEditUser(null);
    setSuccessMessage("");
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">{editUser ? "Edytuj użytkownika" : "Dodaj użytkownika"}</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}

      {/* Formularz */}
      <div className="flex flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Wybierz rolę</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editUser ? "Zaktualizuj użytkownika" : "Dodaj użytkownika"}
        </button>
        {editUser && (
          <button
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Anuluj edycję
          </button>
        )}
      </div>

      {/* Lista użytkowników */}
      <h3 className="text-xl font-bold mb-2">Lista użytkowników</h3>
      <div className="bg-white shadow p-4 rounded">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-2 flex justify-between items-center">
              <div>
                <span>{user.username}</span> <span className="text-gray-500 italic">({user.role})</span>
                <span className="block text-sm text-gray-500">{user.email}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddUser;
