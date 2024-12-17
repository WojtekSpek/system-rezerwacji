const express = require('express');
const router = express.Router();
const db = require('../config/database');

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
router.get("/events/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const query = `
      SELECT 
        e.id, 
        e.title, 
        e.description, 
        e.start, 
        e.end, 
        pt.id AS projectTrainerId, -- Id z tabeli project_trainers
        t.name AS trainerName,
        ty.type AS type -- Typ przypisany do wydarzenia
      FROM events e
      LEFT JOIN project_trainers pt ON e.project_trainer_id = pt.id -- Połączenie z project_trainers
      LEFT JOIN trainers t ON pt.trainer_id = t.id -- Połączenie z trainers
      LEFT JOIN training_types ty ON pt.training_type_id = ty.id -- Połączenie z types
      WHERE e.project_id = ?
    `;
    const [events] = await db.promise().query(query, [projectId]);
    console.log("Pobieranie wydarzeń:", events);

    res.json({
      success: true,
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        trainerName: event.trainerName || "Nieprzypisany",
        projectTrainerId: event.projectTrainerId, // Dodanie projectTrainerId do odpowiedzi
        typeName: event.type || "Nieokreślony", // Dodanie typu do odpowiedzi
      })),
    });
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń:", error);
    res.status(500).json({ success: false, message: "Błąd serwera" });
  }
});


  // Dodawanie wydarzenia
router.post("/events", async (req, res) => {
    const { title, description, start, end, projectTrainerId, projectId } = req.body;
    console.log("Event to insert:", {
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      projectTrainerId: req.body.projectTrainerId, // to musi być poprawne id
      projectId: req.body.projectId,
      type: req.body.type,
    });
    console.log('body', req.body)
    if (!title || !start || !end || !projectId) {
      return res.status(400).json({ success: false, message: "Wymagane pola: title, start, end, projectId." });
    }
  
    try {
      const query = `
        INSERT INTO events (title, description, start, end, project_trainer_id, project_id, type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.promise().query(query, [title, description, start, end, projectTrainerId, projectId,type]);
  
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
  
    console.log("Aktualizacja wydarzenia:", {
      id,
      title,
      description,
      start,
      end,
      projectTrainerId,
      projectId,
    });
  
    if (!title || !start || !end || !projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Wymagane pola: title, start, end, projectId." });
    }
  
    try {
      const query = `
        UPDATE events
        SET title = ?, description = ?, start = ?, end = ?, project_trainer_id = ?, project_id = ?
        WHERE id = ?
      `;
      const [result] = await db.promise().query(query, [
        title,
        description,
        start,
        end,
        projectTrainerId,
        projectId,
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
