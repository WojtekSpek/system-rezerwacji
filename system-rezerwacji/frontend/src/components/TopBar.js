
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import ikony

function TopBar({ user, isAdmin, onLogout,selectedProject }) {
    console.log("Dane użytkownika w TopBar:", isAdmin);
    useEffect(() => {
      console.log("TopBar: Czy admin:", isAdmin);
      console.log("TopBar: Użytkownik:", user);
    }, [user, isAdmin]);

    const navigate = useNavigate();
   //console.log("selectedProject_top:", selectedProject);
//console.log("selectedProject keys:", Object.keys(selectedProject));
    const onSettingsClick = () => {
      navigate("/settings"); // Przekierowanie na stronę ustawień
    };
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">System Szkoleń</h1>
     {/*  <span>Witaj, {user?.username || "Gościu"}!</span> */}
     {/*  {isAdmin && <span> (Admin)</span>} */}
      <h1 className="text-lg font-bold">
       {selectedProject ? `Projekt: ${selectedProject.name}` : ""}
      </h1>
      
      <div className="flex items-center space-x-4">
        <span><FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: 'white' }} />{user.username}</span>
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
