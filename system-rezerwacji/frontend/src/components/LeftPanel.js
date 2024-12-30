import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faFolderOpen, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'; // Import ikony

function LeftPanel({ selectedProject, setSelectedProject, selectedTab, setSelectedTab }) {
  const location = useLocation(); // Pobiera bieżący URL
//console.log('selectedProject',selectedProject.id)
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        {/* Projekty */}
       
        <NavLink
            to="/projects"
          className={({ isActive }) => (isActive ? "active-li" : "")
        }
        onClick={() => setSelectedProject(null)}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2"><FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '8px', color: 'white' }} />Projekty</a>
            </li>
          )}
        </NavLink>
        <NavLink
             to="/trainers"
          className={({ isActive }) => (isActive ? "active-li" : "")}
          onClick={() => setSelectedProject(null)}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2"><FontAwesomeIcon icon={faPersonChalkboard} style={{ marginRight: '8px', color: 'white' }} />Szkoleniowcy</a>
            </li>
          )}
        </NavLink>
        <NavLink
            to="/participants"
          className={({ isActive }) => (isActive ? "active-li" : "")}
          onClick={() => setSelectedProject(null)}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2"><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '8px', color: 'white' }} />Uczestnicy</a>
            </li>
          )}
        </NavLink>
        
      </ul>

      {selectedProject?.id && (
      <div className="mt-6" style={{ backgroundColor: "#0033a7", padding: "10px" }}>
        <h3 className="text-xl font-semibold mb-2">Podmenu projektu</h3>
        <ul className="space-y-2">
        <NavLink
           to={`/projects/${selectedProject.id}/details`}
          className={({ isActive }) => (isActive ? "active-li" : "")}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2">Projekt</a>
            </li>
          )}
        </NavLink>
        
        <NavLink
          to={`/projects/${selectedProject.id}/participants`}
          
          className={({ isActive }) => (isActive ? "active-li" : "")}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2">Uczestnicy projektu</a>
            </li>
          )}
        </NavLink>
        <NavLink
           to={`/projects/${selectedProject.id}/trainers`}
          className={({ isActive }) => (isActive ? "active-li" : "")}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2">Szkoleniowcy</a>
            </li>
          )}
        </NavLink>
        <NavLink
           to={`/projects/${selectedProject.id}/Group`}
          className={({ isActive }) => (isActive ? "active-li" : "")}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2">Zajęcia grupowe</a>
            </li>
          )}
        </NavLink> 
        <NavLink
          to={`/projects/${selectedProject.id}/notes`}
          className={({ isActive }) => (isActive ? "active-li" : "")}
        >
          {({ isActive }) => (
            <li className={`menu-item ${isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}>
              <a className="block px-4 py-2">Notatki</a>
            </li>
          )}
        </NavLink> 
         
        </ul>
      </div>
    )}

    </div>
  );
}

export default LeftPanel;
