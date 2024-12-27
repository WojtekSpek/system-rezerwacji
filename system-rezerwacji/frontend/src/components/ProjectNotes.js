import Commentary from "./Commentary";
import { useParams, useNavigate } from "react-router-dom";

function ProjectDetails({ projectId }) {
    const { id } = useParams(); // Pobiera ID projektu z URL
  const navigate = useNavigate();

console.log('id',id)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notatki</h2>
      {/* Inne szczegóły projektu */}
      <Commentary entityId={id} entityType="project" />
    </div>
  );
}

export default ProjectDetails;

