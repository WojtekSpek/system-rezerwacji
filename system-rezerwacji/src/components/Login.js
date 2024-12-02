import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Proste weryfikowanie loginu i hasła
    if (username === "operator" && password === "password123") {
      localStorage.setItem("loggedIn", true); // Ustawienie sesji
      navigate("/home"); // Przekierowanie do strony głównej
    } else {
      setError("Nieprawidłowy login lub hasło.");
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
