import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import urlProvider from "../urlProvider";
import { Button, Dialog, ProgressCircle } from "@chakra-ui/react";
import { Toaster } from "./ui/toaster";
import { useUpdateData } from "../hooks/useUpdateData";

function Commentary({ entityId, entityType }) {
  //@1 const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || urlProvider();

  /* @1 
  useEffect(() => {
    fetchComments();
  }, [entityId, entityType]); */
  
  /* @1
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments?entityId=${entityId}&entityType=${entityType}`);
      console.log('response',response)
      setComments(response.data.comments);
    } catch (error) {
      console.error("Błąd podczas pobierania komentarzy:", error);
    }
  }; */
  
  const fetchComments = async ({entityId, entityType}) => {
    const response = await axios.get(`${API_BASE_URL}/comments?entityId=${entityId}&entityType=${entityType}`);

    if (!response.data.success) {
      throw(new Error("Błąd podczas pobierania notatek: ", response.error));
    }
    
    return response.data.comments;
  }; 
  
  const { data: comments = [],
    isLoading: isLoadingComments, 
    isFetching: isFetchingComments,
    isError: isErrorLoadingComments,
    error: errorLoadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments({entityId, entityType}),
  });



  /* @1
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/comments`, {
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
  }; */
  
  let toasterState = useRef('');
      
  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/comments`, {
        content: newComment,
        entityId,
        entityType,
        createdBy: 1, // Zmień na ID aktualnego użytkownika
      });
      setNewComment("");

      return response.data

    } catch (error) {
      console.error("Błąd podczas dodawania komentarza:", error);
      throw (new Error("Błąd podczas dodawania komentarza:", error));
    }       
  };
      
  const addCommentOptimistic = (oldData, values, queryKey) => {
    console.log("Optimistic updateParticipantDetail", {oldData, values});
    if (values === undefined) {
      console.warn("updateParticipantDetailOptimistic values are: undefined");
      return oldData;
    }
    
    const addedComment = {
      content: values?.newComment,
      createdAt: "teraz",
      id: "null",
      username: "pobieram",
      updatedAt: "teraz", // Zmień na ID aktualnego użytkownika
    };

    return [addedComment, ...oldData];
  };
  
  const addCommentMutation = useUpdateData(
    ["comments"], // klucz stanu 
    async () => await addComment(), // funkcja aktualizująca dane w bazie   
    addCommentOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa zapisywanie danych..." },
      success: { description: "Dane uczestnika zostały zaktualizowane!" },
      error: { description: "Błąd podczas zapisywania zmian." } 
    },
    toasterState,
  );

  /* const handleDeleteComment = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć komentarz?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
    }
  }; */
  

  const removeComment = async (id) => {  
    try {
      const response = await axios.delete(`${API_BASE_URL}/comments/${id}`);

      if (!response.data.success) {
        throw (new Error("Błąd podczas usuwania komentarza: ", response.error));
      }

      return response;
    } 
    catch (error) {
      console.error("Błąd podczas usuwania komentarza: ", error);
      throw (new Error("Błąd podczas usuwania komentarza: ", error.message));
    }

  };

  const removeCommentOptimistic = (oldData, values, queryKey) => {
    const commentId = values?.comment.id;
    console.log("Optimistic removeCommentOptimistic", {oldData, values});
    if (values === undefined) {
      console.warn("removeTrainerOptimistic values are: undefined");
      return oldData;
    }
    
    const newCommentsList = oldData?.filter( item => item.id !== commentId );
    return newCommentsList;
  };

  const removeCommentMutation = useUpdateData(
    ["comments"], // klucz stanu 
    async ({comment}) => await removeComment(comment.id), // funkcja aktualizująca dane w bazie   
    removeCommentOptimistic, // funkcja ustawiająca wartość 'optymistyczną'
    { // domyślne komunikaty statusu 'loading', 'success' i 'error'
      loading: { description: "Proszę czekać, trwa zapisywanie danych..." },
      success: { description: "Szkoleniowiec zostały usunięty!" },
      error: { description: "Błąd podczas usuwania szkoleniowca." } 
    },
    toasterState,
  );

  
  const getSpinner = () => {
    return (<>
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista</h2>
      </div>
      <div className="flex items-center justify-center h-screen">
          <ProgressCircle.Root value={null} size="sm">
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
      </div></>);
  };
  
  return (
    <div className="p-4 bg-gray-100 rounded">
      <Toaster />
      <h3 className="text-lg font-bold mb-4">Lista</h3>
      { isLoadingComments ? getSpinner() :
        /* Lista komentarzy */
        <div className="mb-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border p-2 mb-2 rounded shadow">
                <p>{comment.content}</p>
                <small className="text-gray-500">
                  Dodane: {new Date(comment.createdAt).toLocaleString()} {comment.username}
                </small>
                {/* @1 <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 ml-2"
                  >
                  Usuń
                </button> */}
                <Dialog.Root role="alertdialog">
                  <Dialog.Trigger asChild>
                    <Button className="bg-red-500 text-white my-2 px-3 mx-6 h-8 rounded hover:bg-red-600">
                      Usuń
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title size="sm">Usuwanie notatki</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body size="sm">
                          <p>
                          Czy na pewno chcesz usunąć notatkę?
                          </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            > Anuluj</Button>
                          </Dialog.ActionTrigger>
                          <Dialog.ActionTrigger asChild >
                            <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              onClick={() => {
                                //handleDeleteTrainer(trainer.id);
                                removeCommentMutation.mutate({
                                  toasterSuffix: ['remove', 'comment'],
                                  comment: comment,                                  
                                });
                              }}
                              > Usuń</Button>
                          </Dialog.ActionTrigger>    
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Dialog.Root>
              </div>
            ))
          ) : (
            <p>Brak notatek</p>
          )}
        </div> }
      {/* Formularz dodawania komentarza */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Dodaj nową notatkę..."
        />
      <button
        onClick={() => addCommentMutation.mutate({
          newComment: newComment,
          toasterSuffix: ['add', 'comment'],   
        })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
        Dodaj
      </button>
    </div>
  );
}

export default Commentary;
