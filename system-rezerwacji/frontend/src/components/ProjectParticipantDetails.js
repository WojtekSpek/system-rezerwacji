import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectParticipantDetails({ participantId, projectId, onBack }) {
  const [participant, setParticipant] = useState(null); // Dane uczestnika w ramach projektu
  const [activeTab, setActiveTab] = useState("Dane osobowe"); // Domyślna zakładka
  const [projectTypes, setProjectTypes] = useState([]); // Typy przypisane do uczestnika w projekcie
  const [uploadedFiles, setUploadedFiles] = useState([]); // Lista plików
  const [file, setFile] = useState(null); // Wybrany plik do dodania

  useEffect(() => {
    fetchParticipantDetails();
    fetchFiles();
  }, [participantId, projectId]); //funkcja uruchamia sie po zmianie [participantId, projectId]

 // Pobierz pliki uczestnika
 const fetchFiles = async () => {
    try {
      const response = await axios.get(`/files/${projectId}/${participantId}`);
      if (response.data.success) {
        setUploadedFiles(response.data.files);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania plików uczestnika:", error);
    }
  };

  // Dodaj plik
  const handleFileUpload = async () => {
    if (!file) {
      alert("Wybierz plik do przesłania!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`/files/${projectId}/${participantId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        alert("Plik został przesłany!");
        setFile(null);
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    }
  };

  // Usuń plik
  const handleFileDelete = async (fileName) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten plik?")) return;
    try {
      const response = await axios.delete(`/files/${projectId}/${participantId}/${fileName}`);
      if (response.data.success) {
        alert("Plik został usunięty!");
        fetchFiles(); // Odśwież listę plików
      }
    } catch (error) {
      console.error("Błąd podczas usuwania pliku:", error);
    }
  };



  // Pobranie danych uczestnika w ramach projektu
  const fetchParticipantDetails = async () => {
    try {
      const response = await axios.get(`/projects/${projectId}/participants/${participantId}`);
      if (response.data.success) {
        setParticipant(response.data.participant);
        setProjectTypes(response.data.participant.types); // Zakładki dynamiczne z `types`
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych uczestnika projektu:", error);
    }
  };

  // Obsługa renderowania zawartości zakładek
  const renderTabContent = () => {
    switch (activeTab) {
      case "Dane osobowe":
        return (
            <div>
            <h3 className="text-lg font-semibold mb-4">Dane osobowe:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Imię:</strong> {participant?.firstName || "Brak danych"}
              </div>
              <div>
                <strong>Nazwisko:</strong> {participant?.lastName || "Brak danych"}
              </div>
              <div>
                <strong>PESEL:</strong> {participant?.pesel || "Brak danych"}
              </div>
              <div>
                <strong>Płeć:</strong> {participant?.gender || "Brak danych"}
              </div>
              <div>
                <strong>Województwo:</strong> {participant?.voivodeship || "Brak danych"}
              </div>
              <div>
                <strong>Miasto:</strong> {participant?.city || "Brak danych"}
              </div>
              <div>
                <strong>Kod pocztowy:</strong> {participant?.postalCode || "Brak danych"}
              </div>
              <div>
                <strong>Ulica:</strong> {participant?.street || "Brak danych"}
              </div>
              <div>
                <strong>Numer domu:</strong> {participant?.houseNumber || "Brak danych"}
              </div>
              <div>
                <strong>Numer mieszkania:</strong> {participant?.apartmentNumber || "Brak danych"}
              </div>
              <div>
                <strong>Numer telefonu:</strong> {participant?.phoneNumber || "Brak danych"}
              </div>
              <div>
                <strong>Email:</strong> {participant?.email || "Brak danych"}
              </div>
              <div>
                <strong>Stopień niepełnosprawności:</strong> {participant?.disabilityLevel || "Brak danych"}
              </div>
              </div>
        </div>
          
        );
      case "Pliki":
        return (
            <div>
              <h3 className="text-lg font-semibold mb-4">Pliki uczestnika:</h3>
              {/* Lista plików */}
              <ul className="list-disc list-inside mb-4">
                {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {/* Klikalny link do otwierania pliku */}
                        <a
                        href={`/uploads/${file}`} // Ścieżka do pliku
                        target="_blank" // Otwiera plik w nowej karcie
                        rel="noopener noreferrer" // Bezpieczeństwo dla linków zewnętrznych
                        className="text-blue-500 hover:underline"
                        >
                        {file}
                        </a>
                        <button
                        onClick={() => handleFileDelete(file)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                        Usuń
                        </button>
                    </li>
                    ))
                ) : (
                    <p>Brak plików</p>
                )}
                </ul>
              {/* Dodawanie pliku */}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-2"
              />
              <button
                onClick={handleFileUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Dodaj plik
              </button>
            </div>
          );
      default:
        // Zakładki dynamiczne
        if (projectTypes.includes(activeTab)) {
          return (
            <div>
              <h3 className="text-xl font-semibold mb-4">Zakładka: {activeTab}</h3>
              <p>Tu pojawi się zawartość dla typu {activeTab} w ramach projektu.</p>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Górny pasek z imieniem i nazwiskiem oraz przyciskiem powrotu */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                {participant?.firstName} {participant?.lastName}
                </h2>
                <button
                onClick={onBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                Wróć
                </button>
            </div>
      {/* Zakładki */}
      <div className="flex gap-4 border-b mb-4">
        {/* Zakładki stałe */}
        <button
          onClick={() => setActiveTab("Dane osobowe")}
          className={`pb-2 ${activeTab === "Dane osobowe" ? "border-b-2 border-blue-500" : ""}`}
        >
          Dane osobowe
        </button>
        <button
          onClick={() => setActiveTab("Pliki")}
          className={`pb-2 ${activeTab === "Pliki" ? "border-b-2 border-blue-500" : ""}`}
        >
          Pliki
        </button>
        {/* Zakładki dynamiczne */}
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`pb-2 ${activeTab === type ? "border-b-2 border-blue-500" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Zawartość aktywnej zakładki */}
      {participant ? renderTabContent() : <p>Ładowanie danych...</p>}
    </div>
  );
}

export default ProjectParticipantDetails;
