import React from "react";
import { useNavigate } from "react-router-dom";

function Settings({ setView}) {
  const navigate = useNavigate();

  const ADDClick = () => {
    navigate("/AddUser"); // Przekierowanie na stronę ustawień
  };
  const TYPEClick = () => {
    navigate("/TrainingTypes"); // Przekierowanie na stronę ustawień
  };
  const SkillClick = () => {
    navigate("/SkillSettings"); // Przekierowanie na stronę ustawień
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ustawienia</h2>
      <button onClick={ADDClick} className="p-2 bg-green-500 text-white rounded hover:bg-green-400 mr-2 mb-2">
        
      
        Dodaj użytkowników
      </button>
      <button
        onClick={TYPEClick}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400 mr-2 mb-2"
      >
        Typy szkoleń
      </button>
      <button
        onClick={SkillClick}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-400 mb-2"
      >
        Umiejętności
      </button>
    </div>

    
  );
}

export default Settings;
