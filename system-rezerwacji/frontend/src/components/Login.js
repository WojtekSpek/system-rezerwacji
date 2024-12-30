import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        { username, password },
        { withCredentials: true } // Przesyłanie ciasteczek sesji
      );
      if (response.data.success) {
        onLogin(response.data.username, response.data.role); // Wywołanie funkcji `onLogin`
      } else {
        setError("Nieprawidłowe dane logowania");
      }
    } catch (err) {
      console.error("Błąd podczas logowania:", err);
      if (err.response && err.response.status === 401) {
        setError("Nieprawidłowe dane logowania.");
      } else {
        setError("Błąd serwera. Spróbuj ponownie później.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Logowanie</h1>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Login:</label>
          <input
            type="text"
            className="border w-full p-2 rounded focus:ring focus:ring-blue-200"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(""); // Resetuj błąd
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Hasło:</label>
          <input
            type="password"
            className="border w-full p-2 rounded focus:ring focus:ring-blue-200"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // Resetuj błąd
            }}
          />
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

export default Login;
