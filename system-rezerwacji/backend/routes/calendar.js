const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get("/group-events/:trainingId", async (req, res) => {
  const { trainingId } = req.params;

  try {
    const query = `
      SELECT 
      e.id, 
        e.title, 
        e.description, 
        e.start, 
        e.end,
        e.groupId,
        e.group_trainer_id, 
        gt.name AS groupTrainerName -- Nazwa trenera na podstawie group_trainer_id
        FROM events e
      LEFT JOIN trainers gt ON e.group_trainer_id = gt.id -- Połączenie z tabelą trainers
      WHERE type = 'group_training'
    `;
    const [events] = await db.promise().query(query);

    res.json({ success: true, events });
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń grupowych:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobieranie doradców zawodowych
router.get('/projects/:projectId/advisors', async (req, res) => {
  const { projectId } = req.params;
  try {
    const [rows] = await db.promise().query(
      'SELECT id, name FROM advisors WHERE project_id = ?',
      [projectId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Błąd podczas pobierania doradców:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

// Pobieranie wydarzeń doradcy
router.get('/advisors/:advisorId/events', async (req, res) => {
  const { advisorId } = req.params;
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM events WHERE advisor_id = ?',
      [advisorId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Błąd podczas pobierania wydarzeń:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

// Dodawanie wydarzenia
router.post('/advisors/:advisorId/events', async (req, res) => {
  const { advisorId } = req.params;
  const { projectId, title, start, end, description } = req.body;
  try {
    await db.promise().query(
      'INSERT INTO events (advisor_id, project_id, title, start, end, description) VALUES (?, ?, ?, ?, ?, ?)',
      [advisorId, projectId, title, start, end, description]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Błąd podczas dodawania wydarzenia:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

// Podsumowanie godzin
router.get('/projects/:projectId/hours-summary', async (req, res) => {
  const { projectId } = req.params;
  try {
    const [rows] = await db.promise().query(
      `SELECT a.id AS advisor_id, a.name, SUM(TIMESTAMPDIFF(HOUR, e.start, e.end)) AS total_hours
       FROM advisors a
       LEFT JOIN events e ON a.id = e.advisor_id
       WHERE a.project_id = ?
       GROUP BY a.id`,
      [projectId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Błąd podczas podsumowania godzin:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});
// Pobieranie wydarzeń dla projektu
router.get("/events/:projectId/:participantId", async (req, res) => {
  const { projectId,participantId} = req.params;

  try {
    const query = `
        SELECT 
      e.id, 
      e.title, 
      e.description, 
      e.start, 
      e.end,
      e.group_trainer_id, 
      gt.name AS groupTrainerName, -- Nazwa trenera dla group_trainer_id
      pt.id AS projectTrainerId, -- Id z tabeli project_trainers
      t.name AS trainerName, -- Nazwa trenera dla project_trainer_id
      e.type 
  FROM events e
  LEFT JOIN project_trainers pt ON e.project_trainer_id = pt.id -- Połączenie z project_trainers
  LEFT JOIN trainers t ON pt.trainer_id = t.id -- Połączenie z trainers dla project_trainer_id
  LEFT JOIN trainers gt ON e.group_trainer_id = gt.id -- Połączenie z trainers dla group_trainer_id
  WHERE 
      e.project_id = ? 
      AND (
          e.participant_id = ? OR 
          JSON_CONTAINS(e.groupParticipantIds, ?)
      );
    `;
    const [events] = await db.promise().query(query, [projectId,participantId,participantId]);
    console.log("Pobieranie wydarzeń:", events);

    res.json({
      success: true,
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        GroupTrainerName:event.groupTrainerName,
        trainerName: event.trainerName || event.groupTrainerName,//"Nieprzypisany",
        projectTrainerId: event.projectTrainerId, // Dodanie projectTrainerId do odpowiedzi
        typeName: event.type || "Nieokreślony", // Dodanie typu do odpowiedzi
        GrouptrainerID:event.group_trainer_id,
        TrainerName:event.trainerName,
        
      })),
    });
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń:", error);
    res.status(500).json({ success: false, message: "Błąd serwera" });
  }
});

router.post("/group-events", async (req, res) => {
  const { title, start, end, description, trainingId, projectId,groupParticipantIds,group_trainer_id } = req.body;
console.log('trainingId',trainingId)
  try {
    // Dodaj główne wydarzenie grupowe
    const [groupEventResult] = await db.promise().query(
      `INSERT INTO events (title, start, end, description, project_id, isGroupEvent, groupParticipantIds, group_trainer_id,type,groupId)
       VALUES (?, ?, ?, ?, ?, ?, ?,?, 'group_training',?)`,
      [title, start, end, description, projectId, true,groupParticipantIds,group_trainer_id,trainingId]
    );

    const groupEventId = groupEventResult.insertId;

    // Pobierz uczestników szkolenia grupowego
    const [participants] = await db.promise().query(
      `SELECT participantId FROM group_training_participants WHERE trainingId = ?`,
      [trainingId]
    );

    /* if (participants.length > 0) {
      // Dodaj wydarzenie indywidualne dla każdego uczestnika
      const individualEvents = participants.map((participant) => [
        title,
        start,
        end,
        description,
        projectId,
        false, // Nie jest grupowym wydarzeniem
        participant.participantId,
        "individual_training", // Typ wydarzenia
      ]);

      await db.promise().query(
        `INSERT INTO events (title, start, end, description, project_id, isGroupEvent, participant_id, type)
         VALUES ?`,
        [individualEvents]
      );
    } */

    res.json({ success: true, message: "Wydarzenie grupowe zostało utworzone." });
  } catch (error) {
    console.error("Błąd podczas tworzenia wydarzenia grupowego:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});
router.put("/group-events/:id", async (req, res) => {
  const eventId = req.params.id; // ID wydarzenia do edycji
  const {
    title,
    start,
    end,
    description,
    trainingId,
    projectId,
    groupParticipantIds,
    group_trainer_id
  } = req.body;
console.log('req.body',req.body)
  try {
    // Aktualizuj główne wydarzenie grupowe
    const [updateResult] = await db.promise().query(
      `UPDATE events SET title = ?, start = ?, end = ?, description = ?, project_id = ?, groupParticipantIds = ?, group_trainer_id = ?, groupId = ?
       WHERE id = ?`,
      [
        title,
        start,
        end,
        description,
        projectId,
        JSON.stringify(groupParticipantIds),
        group_trainer_id,
        trainingId,
        eventId,
      ]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Nie znaleziono wydarzenia grupowego." });
    }

    // Edytuj indywidualne wydarzenia związane z uczestnikami grupy
    const [participants] = await db.promise().query(
      `SELECT participantId FROM group_training_participants WHERE trainingId = ?`,
      [trainingId]
    );

    if (participants.length > 0) {
      // Zaktualizuj wydarzenia indywidualne dla każdego uczestnika
      for (const participant of participants) {
        await db.promise().query(
          `UPDATE events SET title = ?, start = ?, end = ?, description = ?, project_id = ?, type = 'individual_training'
           WHERE participant_id = ? AND groupId = ?`,
          [
            title,
            start,
            end,
            description,
            projectId,
            participant.participantId,
            trainingId,
          ]
        );
      }
    }

    res.json({ success: true, message: "Wydarzenie grupowe zostało zaktualizowane." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji wydarzenia grupowego:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

  // Dodawanie wydarzenia
router.post("/events", async (req, res) => {
    const { title, description, start, end, projectTrainerId, projectId,type,isGroupEvent,participantId,groupParticipantIds } = req.body;
    console.log('body', req.body)
    console.log("Event to insert:", {
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      projectTrainerId: req.body.projectTrainerId, // to musi być poprawne id
      projectId: req.body.projectId,
      type: req.body.type,
      isGroupEvent,
      participantId, // Używane dla indywidualnych wydarzeń
      groupParticipantIds, // Używane dla grupowych wydarzeń
      });
   
    if (!title || !start || !end || !projectId) {
      return res.status(400).json({ success: false, message: "Wymagane pola: title, start, end, projectId." });
    }
  
    try {
      const query = `
        INSERT INTO events (title, start, end, project_trainer_id,description, project_id, type, participant_id, isGroupEvent, groupParticipantIds)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
      const [result] = await db.promise().query(query, [title, start, end, projectTrainerId, description, projectId, type, participantId, isGroupEvent, groupParticipantIds]);
  
      res.json({
        success: true,
        message: "Wydarzenie zostało dodane.",
        eventId: result.insertId,
      });
    } catch (error) {
      console.error("Błąd podczas dodawania wydarzenia:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  router.put("/events/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, start, end, projectTrainerId, projectId } = req.body;
  console.log('tutaj',req.body)
    console.log("Aktualizacja wydarzenia:", {
      id,
      title,
      description,
      start,
      end,
      projectTrainerId,
      projectId,
    });
  
    if (!title || !start || !end ) {
      return res
        .status(400)
        .json({ success: false, message: "Wymagane pola: title, start, end" });
    }
  
    try {
      const query = `
        UPDATE events
        SET title = ?, description = ?, start = ?, end = ?, project_trainer_id = ?
        WHERE id = ?;
      `;
      const [result] = await db.promise().query(query, [
        title,
        description,
        start,
        end,
        projectTrainerId,
        id,
      ]);
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Nie znaleziono wydarzenia do aktualizacji." });
      }
  
      res.json({
        success: true,
        message: "Wydarzenie zostało zaktualizowane.",
      });
    } catch (error) {
      console.error("Błąd podczas aktualizacji wydarzenia:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });

  router.delete("/events/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID wydarzenia jest wymagane.",
      });
    }
  
    try {
      const query = `DELETE FROM events WHERE id = ?`;
      const [result] = await db.promise().query(query, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Wydarzenie o podanym ID nie istnieje.",
        });
      }
  
      res.json({
        success: true,
        message: "Wydarzenie zostało pomyślnie usunięte.",
      });
    } catch (error) {
      console.error("Błąd podczas usuwania wydarzenia:", error);
      res.status(500).json({
        success: false,
        message: "Wystąpił błąd podczas usuwania wydarzenia.",
      });
    }
  });
  
module.exports = router;
