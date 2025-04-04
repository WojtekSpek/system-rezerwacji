import React, { useState, useEffect } from "react";
import axios from "axios";
import urlProvider from "../urlProvider";

function SkillSettings() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingName, setEditingName] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills/skills`);
      setSkills(response.data.skills);
    } catch (error) {
      console.error("Błąd podczas pobierania umiejętności:", error);
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;
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
      const response = await axios.delete(`${API_BASE_URL}/skills/skills/${skillId}`);
      if (response.data.success) {
        setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
      }
    } catch (error) {
      console.error("Błąd podczas usuwania umiejętności:", error);
    }
  };

  const startEditing = (skill) => {
    setEditingSkill(skill.id);
    setEditingName(skill.name);
  };

  const saveEditing = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/skills/skills/${editingSkill}`, {
        name: editingName,
      });
      if (response.data.success) {
        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === editingSkill ? { ...skill, name: editingName } : skill
          )
        );
        setEditingSkill(null);
        setEditingName("");
      }
    } catch (error) {
      console.error("Błąd podczas edytowania umiejętności:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ustawienia umiejętności</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Dodaj nową umiejętność"
          className="flex-grow border rounded px-3 py-2"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj
        </button>
      </div>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            {editingSkill === skill.id ? (
              <div className="flex items-center gap-2 flex-grow">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-grow border rounded px-2 py-1"
                />
                <button
                  onClick={saveEditing}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Zapisz
                </button>
                <button
                  onClick={() => setEditingSkill(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Anuluj
                </button>
              </div>
            ) : (
              <>
                <span className="flex-grow">{skill.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(skill)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillSettings;
