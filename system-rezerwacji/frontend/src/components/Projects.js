import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [supportTypesFromDB, setSupportTypesFromDB] = useState([]); // Typy wsparcia z bazy danych
  const [newProject, setNewProject] = useState({
    name: "",
    supports: [], // Początkowo pusta tablica
  });
  
  const [projectName, setProjectName] = useState(""); // Nazwa projektu
  const [supportTypes, setSupportTypes] = useState([]); // Typy wsparcia
  const [participants, setParticipants] = useState([]); // Lista uczestników
  const [editProject, setEditProject] = useState(null); // Projekt do edycji
  const [successMessage, setSuccessMessage] = useState("");
  const [trainers, setTrainers] = useState([]); // Lista szkoleniowców
  const [selectedTrainers, setSelectedTrainers] = useState([]); // Wybrani szkoleniowcy dla danego typu wsparcia
  const [supports, setSupports] = useState([]); // Dane dotyczące godzin i szkoleniowców




  useEffect(() => { //pobiera liste projektow przy kazdym renderowaniu
    fetchProjects();
    fetchSupportTypes();
    
  }, []);
  useEffect(() => {
    if (Array.isArray(supportTypesFromDB) && supportTypesFromDB.length > 0) {
      console.log("Ustawianie newProject z supportTypesFromDB");
      setNewProject((prev) => ({
        ...prev,
        supports: supportTypesFromDB.map((type) => ({ type: type.type, hours: 0, trainers: [] })),
      }));
    }
  }, [supportTypesFromDB]);

  useEffect(() => {
    // Inicjalizacja danych wsparcia na podstawie typów
    setSupports(
      supportTypes.map((type) => ({
        type: type.type,
        hours: 0,
        trainers: [],
      }))
    );
  }, [supportTypes]);

  useEffect(() => {
    fetchTrainers();
  }, []);
  
  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainers"); // Endpoint do szkoleniowców
      if (response.data.success) {
        setTrainers(response.data.trainers);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
    }
  };

  const handleTrainerChange = (index, trainerId) => {
    const updatedTrainers = [...selectedTrainers];
    updatedTrainers[index] = { trainerId };
    setSelectedTrainers(updatedTrainers);
  };

  const handleAddTrainer = () => {
    setSelectedTrainers([...selectedTrainers, { trainerId: null }]);
  };

  const handleRemoveTrainer = (index) => {
    const updatedTrainers = selectedTrainers.filter((_, i) => i !== index);
    setSelectedTrainers(updatedTrainers);
  };

  const fetchSupportTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trainingTypes");
      console.log("Otrzymane dane z API:", response.data);
  
      // Użyj response.data.data, aby uzyskać tablicę typów
      if (response.data.success && Array.isArray(response.data.data)) {
        setSupportTypes(response.data.data);
        console.log("supportTypesFromDB ustawione:", response.data.data);
      } else {
        console.error("Nieprawidłowe dane z API:", response.data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania typów wsparcia:", error);
    }
  };
  
  

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      console.log("Otrzymane dane:", response.data.projects);

      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania projektów:", error);
    }
  };

  const addProject = async () => {
    console.log("Dane projektu przed walidacją:", newProject);
    console.log("Zawartość supports1:", !newProject.name);
    console.log("Zawartość supports2:", !Array.isArray(newProject.supportTypes)); // sprawdza czy a argument jest tablica
    console.log("Zawartość supports3:", newProject.supports.some((hours) => hours > 0));

    if (!newProject.name ||  !newProject.supports.some((support) => support.hours > 0)) { //some warunek w tablicy
      alert("Wypełnij nazwę projektu i dodaj co najmniej jeden typ wsparcia!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/AddProject", newProject);
  
      if (response.data.success) {
        alert("Projekt zapisany!");
        setNewProject({
          name: "",
          supports: supportTypesFromDB.map(() => ({ type: "", hours: 0 })),
          //trainers: [],
          //participants: [],
        });
        // Automatyczne odświeżenie listy projektów
      fetchProjects();
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania projektu:", error);
    }
  };
  const handleHoursChange = (index, hours) => {
    const updatedSupports = [...supports];
    updatedSupports[index].hours = parseInt(hours, 10) || 0;
    setSupports(updatedSupports);
  };

  

  const handleSupportChange = (index, value) => {
    const updatedSupports = [...newProject.supports];
    updatedSupports[index] = value;
    setNewProject({ ...newProject, supports: updatedSupports });
  };
  const deleteProject = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten projekt?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/deleteProject/${id}`);
      if (response.data.success) {
        setSuccessMessage("Projekt został usunięty.");
        fetchProjects();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania projektu:", error);
    }
  };

  const updateProject = async () => {
    if (!editProject.name) {
      alert("Podaj nazwę projektu!");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/updateProject", editProject);
      if (response.data.success) {
        setSuccessMessage("Projekt został zaktualizowany.");
        setEditProject(null); // Wyjście z trybu edycji
        fetchProjects();
      }
    } catch (error) {
      console.error("Błąd podczas edytowania projektu:", error);
    }
  };

  return (
    <div class="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projekty</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          Dodaj nowy
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-4">Dodaj nowy projekt</h2>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="projectName">Nazwa projektu</label>
            <input
                type="text"
                placeholder="Nazwa projektu"
                className="border border-gray-300 p-2 rounded w-full mb-2"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
          </div>
          <div class="mb-4">
          <h2 className="text-lg font-semibold mb-4">Zarządzanie wsparciem</h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Lewe okno: Wprowadzanie godzin */}
        <div>
          <h3 className="font-semibold mb-4">Wprowadź liczbę godzin</h3>
          {supports.map((support, index) => (
            <div key={index} className="mb-4">
              <label className="block font-semibold mb-2">{support.type}</label>
              <input
                type="number"
                placeholder="Liczba godzin"
                className="border border-gray-300 p-2 rounded w-full"
                value={support.hours || ""}
                onChange={(e) => handleHoursChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Prawe okno: Dodawanie szkoleniowców */}
        <div>
          <h3 className="font-semibold mb-4">Przypisz szkoleniowców</h3>
          {supports.map((support, index) => (
            <div key={index} className="mb-4">
              <label className="block font-semibold mb-2">{support.type}</label>
              <Select
                isMulti
                options={trainers
                  .filter((trainer) => trainer.types.includes(support.type)) // Filtruj szkoleniowców według typu
                  .map((trainer) => ({
                    value: trainer.id,
                    label: trainer.name,
                  }))}
                value={trainers
                  .filter((trainer) => support.trainers.includes(trainer.id))
                  .map((trainer) => ({
                    value: trainer.id,
                    label: trainer.name,
                  }))}
                onChange={(selectedOptions) =>
                  handleTrainerChange(index, selectedOptions)
                }
                placeholder="Wybierz szkoleniowców"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          ))}
        </div>
      </div>
         </div> 
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addProject}
          >
            Zapisz
          </button>
        </div>
      )}

    <ul>
        {projects.map((project) => (
          <li key={project.id} className="flex justify-between items-center mb-2">
            {editProject && editProject.id === project.id ? (
              <div>
                <input
                  type="text"
                  value={editProject.name}
                  onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-64 mr-2"
                />
                <button
                  onClick={updateProject}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mr-2"
                >
                  Zapisz
                </button>
                <button
                  onClick={() => setEditProject(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                  Anuluj
                </button>
              </div>
            ) : (
              <>
                <span>{project.name}</span>
                <div>
                  <button
                    onClick={() => setEditProject(project)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mr-2"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
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

export default Projects;
