import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function LeftPanel({ selectedProject, setSelectedProject, selectedTab, setSelectedTab }) {
  const location = useLocation(); // Pobiera bieżący URL

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        {/* Projekty */}
        <li className="cursor-pointer p-2 hover:bg-gray-700">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
            }
            onClick={() => setSelectedProject(null)}
          >
            Projekty
          </NavLink>
        </li>

        {/* Szkoleniowcy */}
        <li className="cursor-pointer p-2 hover:bg-gray-700">
          <NavLink
            to="/trainers"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
            }
            onClick={() => setSelectedProject(null)}
          >
            Szkoleniowcy
          </NavLink>
        </li>

        {/* Uczestnicy */}
        <li className="cursor-pointer p-2 hover:bg-gray-700">
          <NavLink
            to="/participants"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
            }
            onClick={() => setSelectedProject(null)}
          >
            Uczestnicy
          </NavLink>
        </li>
      </ul>

      {selectedProject && (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Podmenu projektu</h3>
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 hover:bg-gray-700">
            <NavLink
              to={`/projects/${selectedProject}/details`}
              className={({ isActive }) =>
                isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }
            >
              Projekt
            </NavLink>
          </li>
          <li className="cursor-pointer p-2 hover:bg-gray-700">
            <NavLink
              to={`/projects/${selectedProject}/participants`}
              className={({ isActive }) =>
                isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }
            >
              Uczestnicy projektu
            </NavLink>
          </li>
          <li className="cursor-pointer p-2 hover:bg-gray-700">
            <NavLink
              to={`/projects/${selectedProject}/trainers`}
              className={({ isActive }) =>
                isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }
            >
              Szkoleniowcy
            </NavLink>
          </li>
        </ul>
      </div>
    )}

    </div>
  );
}

export default LeftPanel;
