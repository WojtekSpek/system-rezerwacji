import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TrainerDetails() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/trainers/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setTrainer(response.data.trainer);
      }
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  if (!trainer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Trainer Details</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Name:</h3>
        <p>{trainer.name}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Email:</h3>
        <p>{trainer.email}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Phone:</h3>
        <p>{trainer.phone}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Training Types:</h3>
        <p>{trainer.types.join(", ")}</p>
      </div>
      {trainer.cv && (
        <div className="mb-4">
          <h3 className="font-semibold">CV:</h3>
          <a
            href={`http://localhost:5000/uploads/${trainer.cv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Download CV
          </a>
        </div>
      )}
    </div>
  );
}

export default TrainerDetails;
