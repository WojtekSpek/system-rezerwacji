import React from "react";

function ProjectDetails({ project, onBack }) {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 mb-4"
      >
        Powrót do listy projektów
      </button>
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p>
        <strong>Utworzony przez:</strong> {project.created_by}
      </p>
      <p>
        <strong>Data utworzenia:</strong> {project.created_at}
      </p>
      {/* Tutaj dodamy menu boczne w przyszłości */}
    </div>
  );
}

export default ProjectDetails;
