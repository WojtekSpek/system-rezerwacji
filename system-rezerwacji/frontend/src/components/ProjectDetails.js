function ProjectDetails({ project, onBack }) {
  if (!project) {
    return <div>Brak danych projektu</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Szczegóły projektu</h2>
      <p><strong>Nazwa:</strong> {project.name}</p>
      <p><strong>Utworzony przez:</strong> {project.createdBy}</p>
      <p><strong>Data utworzenia:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 mt-4"
      >
        Powrót
      </button>
    </div>
  );
}

export default ProjectDetails;
