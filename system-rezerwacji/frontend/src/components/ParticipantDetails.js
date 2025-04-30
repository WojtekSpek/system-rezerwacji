import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import urlProvider from "../urlProvider";

import { ProgressCircle } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { Toaster } from "./ui/toaster";
import { useUpdateData } from "../hooks/useUpdateData";

function ParticipantDetails() {
  const { participantId } = useParams();
  //@1 const [participant, setParticipant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedParticipant, setUpdatedParticipant] = useState({});
  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();
  const nationalities = ["Polska", "Ukraińska"]; // Lista dostępnych narodowości

  

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

 /*@1 useEffect(() => {
    //fetchParticipantDetails();
  }, [participantId]); */

 /* @1 const fetchParticipantDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/participants/${participantId}/Details`);
      if (response.data.success) {
        setParticipant(response.data.participant);
        setUpdatedParticipant(response.data.participant);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania szczegółów uczestnika:", error);
    }
  }; */

  
  const fetchParticipantDetails = async () => {
    const response = await axios.get(`${API_BASE_URL}/participants/${participantId}/Details`);
    if (!response.data.success) {
      throw (new Error("Błąd podczas pobierania szczegółów uczestnika."));
    }
    
    return response.data.participant;
  };
  
  const { data: participant = {},
  isLoading: isLoadingParticipant,
  isError: isErrorParticipant,
  error: errorParticipant } = useQuery({
    queryKey: ["participant", participantId],
    queryFn: () => fetchParticipantDetails(),
  })
  
  useEffect(() => {
    if (participant) {
      setUpdatedParticipant({...participant});   
    }
  }, [participant]);

  const validateForm = () => {
    const newErrors = {};

    if (!updatedParticipant.firstName?.trim()) newErrors.firstName = "Imię jest wymagane.";
    if (!updatedParticipant.lastName?.trim()) newErrors.lastName = "Nazwisko jest wymagane.";
    if (!/^\d{11}$/.test(updatedParticipant.pesel)) newErrors.pesel = "PESEL musi mieć dokładnie 11 cyfr.";
    if (!updatedParticipant.gender) newErrors.gender = "Wybór płci jest wymagany.";
    if (!updatedParticipant.voivodeship) newErrors.voivodeship = "Wybór województwa jest wymagany.";
    if (!updatedParticipant.city?.trim()) newErrors.city = "Miasto jest wymagane.";
    if (!/^\d{2}-\d{3}$/.test(updatedParticipant.postalCode)) newErrors.postalCode = "Kod pocztowy musi mieć format xx-xxx.";
    if (!updatedParticipant.street?.trim()) newErrors.street = "Ulica jest wymagana.";
    if (!updatedParticipant.houseNumber?.trim()) newErrors.houseNumber = "Numer domu jest wymagany.";
    if (!/^\d{9}$/.test(updatedParticipant.phoneNumber)) newErrors.phoneNumber = "Numer telefonu musi mieć dokładnie 9 cyfr.";
    if (!/\S+@\S+\.\S+/.test(updatedParticipant.email)) newErrors.email = "Podaj poprawny adres e-mail.";
    if (!updatedParticipant.nationality) newErrors.nationality = "Wybór narodowości jest wymagany.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedParticipant((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /* const saveChanges = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/participants/editParticipant/${participantId}`, updatedParticipant);
      if (response.data.success) {
        alert("Dane uczestnika zostały zaktualizowane!");
        setIsEditing(false);
        fetchParticipantDetails();
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian:", error);
    }
  }; */

  let toasterState = useRef('');

  const updateParticipantDetail = async ({participantId}) => {
    if (!validateForm()) return;
    
    const response = await axios.put(`${API_BASE_URL}/participants/editParticipant/${participantId}`, updatedParticipant);

    console.log("mutation finished");
    if (!response.data.success) {
      console.log("mutation error");
      return response;
    }
    
    console.log("mutation successful", {updatedParticipant});
    
    return response;
  };
  
  const updateParticipantDetailOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic updateParticipantDetail", {oldData, values});
    if (values === undefined) {
      console.warn("updateParticipantDetailOptimistic values are: undefined");
      return oldData;
    }
    
    console.log("@ updateParticipantDetailOptimistic", { VALUE: values });
      
    return {...values?.updatedParticipant};
  };

  const modifyParticipantDetailMutation = useUpdateData(
    ['participantDetailQuery', participantId], // klucz stanu 
    ({participantId}) => updateParticipantDetail({participantId}), // funkcja aktualizująca dane w bazie   
    undefined,//updateParticipantDetailOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    {
      loading: { description: "Proszę czekać, trwa zapisywanie danych..." },
      success: { description: "Dane uczestnika zostały zaktualizowane!" },
      error: { description: "Błąd podczas zapisywania zmian." } // komunikaty statusu 'loading', 'success' i 'error'
    },
    toasterState,
  );

  return (
    <div className="p-4">
    <Toaster />
      <h2 className="text-2xl font-bold mb-4">Szczegóły uczestnika</h2>
      { (participant && !isLoadingParticipant) ? (
        !isEditing ? (
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
            <div>
              <strong>Narodowość:</strong> {participant?.nationality || "Brak danych"}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Edytuj
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Imię", name: "firstName", type: "text" },
              { label: "Nazwisko", name: "lastName", type: "text" },
              { label: "PESEL", name: "pesel", type: "text" },
              { label: "Płeć", name: "gender", type: "select", options: genders },
              { label: "Województwo", name: "voivodeship", type: "select", options: voivodeships },
              { label: "Miasto", name: "city", type: "text" },
              { label: "Kod pocztowy", name: "postalCode",type: "text"  },
              { label: "Ulica", name: "street",type: "text"  },
              { label: "Numer domu", name: "houseNumber" ,type: "text" },
              { label: "Numer mieszkania", name: "apartmentNumber",type: "text"  },
              { label: "Numer telefonu", name: "phoneNumber" ,type: "text" },
              { label: "Email", name: "email",type: "text"  },
              { label: "Stopień niepełnosprawności", name: "disabilityLevel" ,type: "text" },
              { label: "Narodowość", name: "nationality", type: "select", options: nationalities },

            ].map(({ label, name, type, options }) => (
              <div key={name}>
                <label className="block mb-1">{label}:</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={updatedParticipant[name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="">Wybierz</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={updatedParticipant[name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                )}
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
            <div className="mt-4 flex justify-between col-span-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Anuluj
              </button>
              <button
                //onClick={saveChanges}
                onClick={() => {
                  modifyParticipantDetailMutation.mutate({  
                    participant: participant,
                    updatedParticipant: updatedParticipant,
                    participantId: participantId,
                    toasterSuffix: ['participant', participantId]
                });
                setIsEditing(false);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Zapisz
              </button>
            </div>
          </div>
        )
      ) : (
        (<div className="flex items-center justify-center h-screen">
          <ProgressCircle.Root value={null} size="sm">
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        </div>)       
      )}
    </div>
  );
}

export default ParticipantDetails;
