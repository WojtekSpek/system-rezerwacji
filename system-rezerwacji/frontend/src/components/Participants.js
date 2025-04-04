import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenericList from "./GenericList";
import { useQuery } from "@tanstack/react-query";
import { ProgressCircle } from "@chakra-ui/react";
import urlProvider from "../urlProvider";

function Participants({ onViewChange }) {
  
  //@1 const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const nationalities = ["Polska", "Ukraińska"]; // Lista dostępnych narodowości
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const selectedCount = selectedParticipants.length;


  const [newParticipant, setNewParticipant] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    gender: "",
    voivodeship: "",
    city: "",
    postalCode: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    phoneNumber: "",
    email: null,
    disabilityLevel: "",
  });
  const navigate = useNavigate(); // Hook do nawigacji
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();
  const handleSelectParticipant = (id) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((participantId) => participantId !== id) : [...prev, id]
    );
  };

  const handleSelectionChange = (selectedItems) => {
    console.log("Zaznaczone elementy:", selectedItems);
  };
  
  const handleMassAction = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/addParticipants`, {
        participantIds: selectedParticipants,
      });
      if (response.data.success) {
        alert("Uczestnicy zostali dodani do projektu!");
        setSelectedParticipants([]); // Wyczyść zaznaczenie po akcji
      }
    } catch (error) {
      console.error("Błąd podczas dodawania uczestników do projektu:", error);
    }
  };
  
  const filterParticipants = () => {
    if (!searchQuery.trim()) {
      return participants; // Jeśli brak zapytania, zwracamy pełną listę
    }
    
    const query = searchQuery.toLowerCase();
    return participants.filter((participant) =>
      `${participant.firstName} ${participant.lastName}`.toLowerCase().includes(query) ||
      participant.pesel?.toLowerCase().includes(query) ||
      participant.email?.toLowerCase().includes(query)
    );
  };
  const handleViewDetails = (id) => {
    navigate(`/participants/${id}/Details`);
  };
   

    const genders = ["Mężczyzna", "Kobieta"];

    const voivodeships = [
        "Dolnośląskie",
        "Kujawsko-Pomorskie",
        "Lubelskie",
        "Lubuskie",
        "Łódzkie",
        "Małopolskie",
        "Mazowieckie",
        "Opolskie",
        "Podkarpackie",
        "Podlaskie",
        "Pomorskie",
        "Śląskie",
        "Świętokrzyskie",
        "Warmińsko-Mazurskie",
        "Wielkopolskie",
        "Zachodniopomorskie",
    ];

  const [errors, setErrors] = useState({}); // Przechowywanie błędów

  useEffect(() => {
    fetchParticipants();
  }, []);

  /// @1 zmina na useQuery 
  /*  const fetchParticipants = async () => {
     try {
       const response = await axios.get(`${API_BASE_URL}/participants`, {
         withCredentials: true, // Umożliwia przesyłanie ciasteczek
       });
       if (response.data.success) {
         setParticipants(response.data.participants);
       }
       console.log('response.data.participants',response.data.participants)
     } catch (error) {
       console.error("Błąd podczas pobierania uczestników:", error);
     }
   }; */

   /// Użyj React Query do pobrania grup projektu
    const fetchParticipants = async () => {
    const response = await axios.get(`${API_BASE_URL}/participants`, {
        withCredentials: true, // Umożliwia przesyłanie ciasteczek
      });
        
      if (!response.data.success) {
        throw(new Error("Błąd podczas pobierania uczestników."));
      }
      
      return response.data.participants;
  }; 
  
  const { data: participants = [],
    isLoading: isLoadingParticipants, 
    isError: isErrorLoadingParticipants,
    error: errorLoadingParticipants } = useQuery({
    queryKey: ["participants"],
    queryFn: () => fetchParticipants(),
  });

  if (isErrorLoadingParticipants) {
    console.log("Błąd podczas pobierania uczestników:", errorLoadingParticipants);
  }
  /// @1 koniec

  const validateForm = () => {
    const newErrors = {};

    if (!newParticipant.firstName.trim()) {
      newErrors.firstName = "Imię jest wymagane.";
    }

    if (!newParticipant.lastName.trim()) {
      newErrors.lastName = "Nazwisko jest wymagane.";
    }

    if (!/^\d{11}$/.test(newParticipant.pesel)) {
      newErrors.pesel = "PESEL musi mieć dokładnie 11 cyfr.";
    }

    if (!newParticipant.gender) {
      newErrors.gender = "Wybór płci jest wymagany.";
    }

    if (!newParticipant.voivodeship) {
      newErrors.voivodeship = "Wybór województwa jest wymagany.";
    }

    if (!newParticipant.city.trim()) {
      newErrors.city = "Miasto jest wymagane.";
    }

    if (!/^\d{2}-\d{3}$/.test(newParticipant.postalCode)) {
      newErrors.postalCode = "Kod pocztowy musi mieć format xx-xxx.";
    }

    if (!newParticipant.street.trim()) {
      newErrors.street = "Ulica jest wymagana.";
    }

    if (!newParticipant.houseNumber.trim()) {
      newErrors.houseNumber = "Numer domu jest wymagany.";
    }

    if (!/^\d{9}$/.test(newParticipant.phoneNumber)) {
      newErrors.phoneNumber = "Numer telefonu musi mieć dokładnie 9 cyfr.";
    }

    if (newParticipant.email && !/\S+@\S+\.\S+/.test(newParticipant.email)) {
      newErrors.email = "Podaj poprawny adres e-mail.";
    } else if (!newParticipant.email || newParticipant.email.trim() === "") {
      newParticipant.email = null;
    }
    if (!newParticipant.nationality) newErrors.nationality = "Wybór narodowości jest wymagany.";

    setErrors(newErrors);

    // Zwraca `true` tylko wtedy, gdy nie ma błędów
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Usuwa błąd przy zmianie pola
  };

  const handleAddParticipant = async () => {
    if (!validateForm()) return;

    try {
        const response = await axios.post(
            `${API_BASE_URL}/participants/addParticipant`,
            newParticipant,
            { withCredentials: true }
      );
      if (response.data.success) {
        alert("Uczestnik został dodany!");
        setShowAddForm(false);
        fetchParticipants();
        setNewParticipant({
          firstName: "",
          lastName: "",
          pesel: "",
          gender: "",
          voivodeship: "",
          city: "",
          postalCode: "",
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          phoneNumber: "",
          email: null,
          disabilityLevel: "",
        });
      }
    } catch (error) {
        console.log("Cały obiekt błędu:", error); // Debugowanie całego błędu
        console.log("Odpowiedź z serwera:", error.response); // Debugowanie odpowiedzi serwera
      
        if (error.response && error.response.status === 400) {
          const serverMessage = error.response.data.message;
          console.log("Komunikat błędu z backendu:", serverMessage); // Debugowanie komunikatu
      
          if (serverMessage.includes("pesel")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              pesel: "Uczestnik z tym numerem PESEL już istnieje.",
            }));
          } else if (serverMessage.includes("email")) {
           
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Uczestnik z tym adresem email już istnieje.",
            }));
          } else {
            alert(serverMessage); // Fallback na alert w przypadku innych błędów
          }
        } else {
          console.error("Błąd podczas dodawania uczestnika:", error);
        }
      }
  };
  const searchFunction = (participant, query) => {
    query = query.toLowerCase();
    return (
      participant.firstName.toLowerCase().includes(query) ||
      participant.lastName.toLowerCase().includes(query) ||
      participant.pesel?.includes(query) ||
      participant.email?.toLowerCase().includes(query)
    );
  };

  /* const renderItem = (participant) => (
    <>
      
      <td style={{ width: 10 || "auto" }} className="border px-4 py-2">{participant.firstName}</td>
      <td className="border px-4 py-2">{participant.lastName}</td>
      <td className="border px-4 py-2">{participant.phoneNumber}</td>
      <td className="border px-4 py-2">{participant.email}</td>
      <td>
        <button
          onClick={() => navigate(`/participant/${participant.id}/Details`)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Szczegóły
        </button>
      </td>
    </>
  ); */

  /// @1 dodanie ProgressCircle (Spinnera) ładowania
  if (isLoadingParticipants) {
    return  (<div className="flex items-center justify-center h-screen">
      <ProgressCircle.Root value={null} size="sm">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </div>);
  }

console.log(errors);
  return (
    <div className="p-4 w-full">
      {!showAddForm ? (
        // Widok listy uczestników
        <>
          
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Lista uczestników</h2>
              <div>
                <button
                  disabled={selectedParticipants.length === 0}
                  onClick={() => handleMassAction()}
                  className={`${
                    selectedParticipants.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-4 py-2 rounded`}
                >
                  Dodaj do projektu
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
                >
                  Dodaj uczestnika
                </button>
              </div>
            </div>

          <GenericList
              items={participants}
              onSelectionChange={handleSelectionChange}
              columns={[
                
                { key: "firstName", label: "Imię" },
                { key: "lastName", label: "Nazwisko" },
                { key: "phoneNumber", label: "Tel" },
                { key: "email", label: "Email" },
                { key: "actions", label: "Akcje" },
              ]}
              renderItem={(participant) => (
                <>
                  
                  <td className="border px-4 py-2">{participant.firstName}</td>
                  <td className="border px-4 py-2">{participant.lastName}</td>
                  <td className="border px-4 py-2">{participant.phoneNumber}</td>
                  <td className="border px-4 py-2">{participant.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleViewDetails(participant.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Szczegóły
                    </button>
                  </td>
                </>
              )}
              searchFunction={searchFunction}
            />

        </>
      ) : (
        // Widok formularza dodawania uczestnika
        <div>
          <h2 className="text-2xl font-bold mb-4">Dodaj uczestnika</h2>
                    <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Imię:</label>
                    <input
                    type="text"
                    name="firstName"
                    value={newParticipant.firstName}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                     {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Nazwisko:</label>
                    <input
                    type="text"
                    name="lastName"
                    value={newParticipant.lastName}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                     {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">PESEL:</label>
                    <input
                    type="text"
                    name="pesel"
                    value={newParticipant.pesel}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                     {errors.pesel && (
                <p className="text-red-500 text-sm">{errors.pesel}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Płeć:</label>
                    <select
                    name="gender"
                    value={newParticipant.gender}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    >
                    <option value="" disabled>
                        Wybierz płeć
                    </option>
                    {genders.map((gender) => (
                        <option key={gender} value={gender}>
                        {gender}
                        </option>
                    ))}
                    </select>
                    {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Województwo:</label>
                    <select
                    name="voivodeship"
                    value={newParticipant.voivodeship}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    >
                    <option value="" disabled>
                        Wybierz województwo
                    </option>
                    {voivodeships.map((voivodeship) => (
                        <option key={voivodeship} value={voivodeship}>
                        {voivodeship}
                        </option>
                    ))}
                    </select>
                    {errors.voivodeship && (
                <p className="text-red-500 text-sm">{errors.voivodeship}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Miasto:</label>
                    <input
                    type="text"
                    name="city"
                    value={newParticipant.city}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                     {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                </div>
                
                <div>
                    <label className="block mb-1">Kod pocztowy:</label>
                    <input
                    type="text"
                    name="postalCode"
                    value={newParticipant.postalCode}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                        {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Ulica:</label>
                    <input
                    type="text"
                    name="street"
                    value={newParticipant.street}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                        {errors.street && (
                <p className="text-red-500 text-sm">{errors.street}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Numer domu:</label>
                    <input
                    type="text"
                    name="houseNumber"
                    value={newParticipant.houseNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                        {errors.houseNumber && (
                <p className="text-red-500 text-sm">{errors.houseNumber}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Numer mieszkania:</label>
                    <input
                    type="text"
                    name="apartmentNumber"
                    value={newParticipant.apartmentNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                        {errors.apartmentNumber && (
                <p className="text-red-500 text-sm">{errors.apartmentNumber}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Numer telefonu:</label>
                    <input
                    type="text"
                    name="phoneNumber"
                    value={newParticipant.phoneNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                        {errors.phoneNumber&& (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input
                    type="email"
                    name="email"
                    value={newParticipant.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                       {errors.email&& (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
                </div>
                <div>
                    <label className="block mb-1">Stopień niepełnosprawności:</label>
                    <input
                    type="text"
                    name="disabilityLevel"
                    value={newParticipant.disabilityLevel}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    />
                                       {errors.disabilityLevel && (
                <p className="text-red-500 text-sm">{errors.disabilityLevel}</p>
              )}
                </div>
                <div key="nationality">
                  <label className="block mb-1">Narodowość:</label>
                  <select
                    name="nationality"
                    value={newParticipant.nationality || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="">Wybierz</option>
                    {nationalities.map((nationality) => (
                      <option key={nationality} value={nationality}>
                        {nationality}
                      </option>
                    ))}
                  </select>
                  {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
                </div>
                </div>
                <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                    Anuluj
                </button>
                <button
                    onClick={handleAddParticipant}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Zapisz
                </button>
                </div>
          
        </div>
      )}
    </div>
  );
}

export default Participants;
