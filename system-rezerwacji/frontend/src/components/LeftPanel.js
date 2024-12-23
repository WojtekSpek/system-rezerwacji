import React from "react";
import { Link, useLocation } from "react-router-dom";

function LeftPanel({ selectedProject, setSelectedProject, selectedTab, setSelectedTab }) {
  const location = useLocation(); // Pobiera bieżący URL

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        {/* Projekty */}
        <li
          className={`cursor-pointer p-2 hover:bg-gray-700 ${
            isActive("/projects") ? "bg-gray-600 font-bold" : ""
          }`}
        >
          <Link to="/projects">Projekty</Link>
        </li>

        {/* Szkoleniowcy */}
        <li
          className={`cursor-pointer p-2 hover:bg-gray-700 ${
            isActive("/trainers") ? "bg-gray-600 font-bold" : ""
          }`}
        >
          <Link to="/trainers">Szkoleniowcy</Link>
        </li>

        {/* Uczestnicy */}
        <li
          className={`cursor-pointer p-2 hover:bg-gray-700 ${
            isActive("/participants") ? "bg-gray-600 font-bold" : ""
          }`}
        >
          <Link to="/participants">Uczestnicy</Link>
        </li>
      </ul>

      {/* Dynamiczne podmenu */}
      {selectedProject && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Podmenu projektu</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                selectedTab === "projectDetails" && "bg-gray-300 font-bold"
              }`}
              onClick={() => setSelectedTab("projectDetails")}
            >
              Projekt
            </li>
            <li
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                selectedTab === "projectParticipants" && "bg-gray-300 font-bold"
              }`}
              onClick={() => setSelectedTab("projectParticipants")}
            >
              Uczestnicy projektu
            </li>
            <li
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                selectedTab === "projectTrainers" && "bg-gray-300 font-bold"
              }`}
              onClick={() => setSelectedTab("projectTrainers")}
            >
              Szkoleniowcy
            </li>
          </ul>
          <button onClick={() => setSelectedProject(null)} className="mt-4 text-blue-500">
            Powrót do listy projektów
          </button>
        </div>
      )}
    </div>
  );
}

export default LeftPanel;
