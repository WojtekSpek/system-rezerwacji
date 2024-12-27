import React, { useState, useEffect } from "react";
import axios from "axios";

function Commentary({ entityId, entityType }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [entityId, entityType]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments?entityId=${entityId}&entityType=${entityType}`);
      console.log('response',response)
      setComments(response.data.comments);
    } catch (error) {
      console.error("Błąd podczas pobierania komentarzy:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post("/comments", {
        content: newComment,
        entityId,
        entityType,
        createdBy: 1, // Zmień na ID aktualnego użytkownika
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Błąd podczas dodawania komentarza:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć komentarz?")) return;
    try {
      await axios.delete(`/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-4">Notatki</h3>
      {/* Lista komentarzy */}
      <div className="mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border p-2 mb-2 rounded shadow">
              <p>{comment.content}</p>
              <small className="text-gray-500">
                Dodane: {new Date(comment.createdAt).toLocaleString()} {comment.username}
              </small>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 ml-2"
              >
                Usuń
              </button>
            </div>
          ))
        ) : (
          <p>Brak notatek</p>
        )}
      </div>
      {/* Formularz dodawania komentarza */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Dodaj nowy komentarz..."
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
      >
        Dodaj
      </button>
    </div>
  );
}

export default Commentary;
