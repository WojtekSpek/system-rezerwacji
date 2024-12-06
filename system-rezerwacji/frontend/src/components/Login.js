import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin  }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log("Odpowiedź z backendu:", response.data); // Debug odpowiedzi z backendu

      if (response.data.success) {
        // Logowanie zakończone sukcesem
        onLogin(response.data.username, response.data.role);
      } else {
        // Jeśli backend zwróci `success: false`
        console.error("Błąd logowania:", response.data.message);
        alert(response.data.message || "Nieprawidłowe dane logowania");
      }
    } catch (error) {
      // Obsługa błędów serwera
      console.error("Błąd serwera:", error);
      alert("Błąd serwera. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Logowanie</h1>
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Login:</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hasło:</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

export default Login;
