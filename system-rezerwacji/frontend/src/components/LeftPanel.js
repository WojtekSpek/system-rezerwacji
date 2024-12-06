import React from "react";

function LeftPanel({ view, setView }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
            <li
              className={`cursor-pointer hover:text-blue-500 ${
                view === "projects" && "font-bold"
              }`}
              onClick={() => setView("projects")}
            >
              Projekty
        </li>
        <li>
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded">
            Dodawanie trenerów
          </button>
        </li>
      </ul>
    </div>
  );
}

export default LeftPanel;
