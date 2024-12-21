import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ParticipantDetails({ id, onViewChange }) {
  //const { id } = useParams();
 // const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedParticipant, setUpdatedParticipant] = useState({});

  useEffect(() => {
    fetchParticipantDetails();
  }, [id]);

  const fetchParticipantDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/participants/${id}`);
      if (response.data.success) {
        setParticipant(response.data.participant);
        setUpdatedParticipant(response.data.participant);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szczegółów uczestnika:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedParticipant((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/participants/${id}`, updatedParticipant);
      if (response.data.success) {
        alert("Dane zostały zaktualizowane!");
        setIsEditing(false);
        fetchParticipantDetails();
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian:", error);
    }
  };

  return (
    <div className="p-4">
    
      {participant ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Szczegóły uczestnika</h2>
          {!isEditing ? (
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
              
          
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-20"
              >
                Edytuj
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Imię:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedParticipant.firstName}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Nazwisko:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedParticipant.lastName}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedParticipant.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                  Anuluj
                </button>
                <button
                  onClick={saveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Zapisz
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Ładowanie danych uczestnika...</p>
      )}
    </div>
  );
}

export default ParticipantDetails;
