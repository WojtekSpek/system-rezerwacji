import React from "react";

function TopBar({ user, isAdmin, onLogout, onSettingsClick,selectedProject }) {
    console.log("Dane użytkownika w TopBar:", isAdmin);

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">System Rezerwacji</h1>
      <h1 className="text-lg font-bold">
        {selectedProject ? `Projekt: ${selectedProject.name}` : "System Rezerwacji"}
      </h1>
      <div className="flex items-center space-x-4">
        <span>{user.name}</span>
        {isAdmin && (
          <button
            onClick={onSettingsClick}
            className="p-2 bg-blue-700 rounded hover:bg-blue-600"
          >
            ⚙️
          </button>
        )}
        <button
          onClick={onLogout}
          className="p-2 bg-red-600 rounded hover:bg-red-500"
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
}

export default TopBar;
