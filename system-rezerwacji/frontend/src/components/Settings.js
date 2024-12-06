import React from "react";

function Settings({ setView}) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ustawienia</h2>
      <button onClick={() => setView("addUser")} className="p-2 bg-green-500 text-white rounded hover:bg-green-400">
        
      
        Dodaj użytkowników
      </button>
    </div>
  );
}

export default Settings;
