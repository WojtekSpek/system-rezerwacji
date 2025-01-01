import React, { useState, useEffect } from "react";
import axios from "axios";

function SkillSettings() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}//skills/skills`);
      setSkills(response.data.skills);
    } catch (error) {
      console.error("Błąd podczas pobierania umiejętności:", error);
    }
  };

  const addSkill = async () => {
    if (!newSkill) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/skills/skills`, { name: newSkill });
      if (response.data.success) {
        setSkills((prev) => [...prev, { id: response.data.skillId, name: newSkill }]);
        setNewSkill("");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania umiejętności:", error);
    }
  };

  const deleteSkill = async (skillId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę umiejętność?")) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}//skills/skills/${skillId}`);
      if (response.data.success) {
        setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
        alert("Umiejętność została usunięta.");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania umiejętności:", error);
      alert("Nie udało się usunąć umiejętności.");
    }
  };

  return (
    <div>
      <h2>Ustawienia umiejętności</h2>
      <input
        type="text"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="Dodaj nową umiejętność"
      />
      <button onClick={addSkill}>Dodaj</button>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id} className="flex justify-between items-center">
            <span>{skill.name}</span>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillSettings;
