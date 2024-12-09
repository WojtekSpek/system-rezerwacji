import React from "react";

function UserDashboard({ username }) {
  console.log("Dane użytkownika:", user);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Witaj, {username}!</h1>
      <p className="text-lg mt-4">
        Dziękujemy za zalogowanie do systemu rezerwacji.
      </p>

      {/* Przykładowe przyszłe funkcje */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Twoje opcje:</h2>
        <ul className="list-disc pl-6 text-left">
          <li>Zarezerwuj termin szkolenia</li>
          <li>Sprawdź swoje rezerwacje</li>
          <li>Zaktualizuj swoje dane</li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
