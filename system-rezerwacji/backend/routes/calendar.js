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
        SELECT e.id, e.title, e.description, e.start, e.end, t.name AS trainerName
        FROM events e
        LEFT JOIN trainers t ON e.project_trainer_id = t.id
        WHERE e.project_id = ?
      `;
      const [events] = await db.promise().query(query, [projectId]);
  
      res.json({
        success: true,
        events: events.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          start: event.start,
          end: event.end,
          trainerName: event.trainerName || "Nieprzypisany",
        })),
      });
    } catch (error) {
      console.error("Błąd podczas pobierania wydarzeń:", error);
      res.status(500).json({ success: false, message: "Błąd serwera" });
    }
  });
  // Dodawanie wydarzenia
router.post("/events", async (req, res) => {
    const { title, description, start, end, trainerId, projectId } = req.body;
    console.log(req.body);
    if (!title || !start || !end || !projectId) {
      return res.status(400).json({ success: false, message: "Wymagane pola: title, start, end, projectId." });
    }
  
    try {
      const query = `
        INSERT INTO events (title, description, start, end, project_trainer_id, project_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.promise().query(query, [title, description, start, end, trainerId, projectId]);
  
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
    const { title, start, end, trainerId } = req.body;
  
    try {
      const query = `
        UPDATE events
        SET title = ?, start = ?, end = ?, trainer_id = ?
        WHERE id = ?
      `;
      await db.promise().query(query, [title, start, end, trainerId, id]);
      res.json({ success: true, message: "Wydarzenie zostało zaktualizowane." });
    } catch (error) {
      console.error("Błąd podczas aktualizacji wydarzenia:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
module.exports = router;
