const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");
router.put("/:projectId/group-training/:groupId", async (req, res) => {
    const projectId = req.params.projectId;
    const groupId = req.params.groupId;
    const { plannedHours } = req.body;
  
    try {
      const [result] = await db.promise().query(
        `
        UPDATE group_trainings
        SET hours = ?
        WHERE projectId = ? AND id = ?
        `,
        [plannedHours, projectId, groupId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Nie znaleziono grupy lub projektu.",
        });
      }
  
      res.json({
        success: true,
        message: "Godziny zajęć grupowych zostały zaktualizowane.",
      });
    } catch (error) {
      console.error("Błąd podczas aktualizacji godzin zajęć grupowych:", error);
      res.status(500).json({
        success: false,
        message: "Błąd podczas aktualizacji godzin zajęć grupowych.",
      });
    }
  });
router.get("/:projectId/group-trainers/:groupId", async (req, res) => {
    const { projectId, groupId } = req.params;
      console.log('req.params',req.params)
    try {
      const query = `
        SELECT t.id, t.name, t.email
        FROM group_trainers gt
        JOIN trainers t ON gt.trainerId = t.id
        WHERE gt.groupId = ? AND gt.projectId = ?
      `;
  
      const [trainers] = await db.promise().query(query, [groupId, projectId]);
  
      res.json({ success: true, trainers });
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców dla grupy:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  }); 
// Endpoint do przypisywania szkoleniowca do grupy
router.post("/:projectId/group-trainers", async (req, res) => {
    const { projectId } = req.params;
    const { trainerId, groupId } = req.body;
  
    // Walidacja danych wejściowych
    if (!trainerId || !groupId) {
      return res.status(400).json({
        success: false,
        message: "Brakuje wymaganych parametrów: trainerId lub groupId",
      });
    }
  
    try {
      // Sprawdź, czy grupa istnieje
      const [group] = await db.promise().query(
        "SELECT id FROM group_trainings WHERE id = ? AND projectId = ?",
        [groupId, projectId]
      );
      if (group.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nie znaleziono grupy dla podanego projectId i groupId.",
        });
      }
  
      // Sprawdź, czy szkoleniowiec istnieje
      const [trainer] = await db.promise().query(
        "SELECT id FROM trainers WHERE id = ?",
        [trainerId]
      );
      if (trainer.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nie znaleziono szkoleniowca o podanym trainerId.",
        });
      }
      
      
      // Dodaj szkoleniowca do grupy
      await db.promise().query(
        "INSERT INTO group_trainers (trainerId, groupId,projectId, assignedAt) VALUES (?, ?, ?,NOW())",
        [trainerId, groupId,projectId]
      );
  
      res.json({
        success: true,
        message: "Szkoleniowiec został przypisany do grupy.",
      });
    } catch (error) {
      console.error("Błąd podczas przypisywania szkoleniowca do grupy:", error);
      res.status(500).json({
        success: false,
        message: "Wystąpił błąd podczas przypisywania szkoleniowca do grupy.",
      });
    }
  });
 // Pobieranie szkoleniowców przypisanych do grupy
// Endpoint do pobierania nazwy grupy na podstawie ID
router.get("/:id/name", async (req, res) => {
    const groupId = req.params.id;
  
    try {
      const [rows] = await db.promise().query(
        "SELECT name FROM group_trainings WHERE id = ?",
        [groupId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Grupa nie znaleziona" });
      }
  
      res.json({ success: true, name: rows[0].name });
    } catch (error) {
      console.error("Błąd podczas pobierania nazwy grupy:", error);
      res.status(500).json({ success: false, message: "Błąd serwera" });
    }
  });
  
// Pobieranie uczestników przypisanych do szkolenia grupowego
router.get("/group-trainings/:trainingId/participants", async (req, res) => {
  const { trainingId } = req.params;

  try {
    // Zapytanie SQL do pobrania uczestników przypisanych do szkolenia
    const [participants] = await db.promise().query(
      `
      SELECT 
        p.id,
        p.firstName,
        p.lastName,
        p.email,
        p.phoneNumber
      FROM 
        group_training_participants gtp
      JOIN 
        participants p
      ON 
        gtp.participantId = p.id
      WHERE 
        gtp.trainingId = ?
      `,
      [trainingId]
    );

    res.json({ success: true, participants });
  } catch (error) {
    console.error("Błąd podczas pobierania uczestników szkolenia grupowego:", error);
    res.status(500).json({ success: false, message: "Błąd serwera" });
  }
});


router.post("/group-trainings/:trainingId/participants", async (req, res) => {
  const { trainingId } = req.params;
  const { participantId } = req.body;
  try {
    await db.promise().query("INSERT INTO group_training_participants (trainingId, participantId) VALUES (?, ?)", [trainingId, participantId]);
    res.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas dodawania uczestnika:", error);
    res.status(500).json({ success: false });
  }
});

// Endpoint do usuwania szkoleniowca z grupy
router.delete("/projects/:projectId/group-trainers/:groupId/:trainerId", async (req, res) => {
    const { projectId, groupId, trainerId } = req.params;
  
    try {
      // Sprawdź, czy wpis istnieje
      const [existing] = await db.promise().query(
        "SELECT * FROM group_trainers WHERE projectId = ? AND groupId = ? AND trainerId = ?",
        [projectId, groupId, trainerId]
      );
  
      if (existing.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nie znaleziono szkoleniowca w tej grupie.",
        });
      }
  
      // Usuń wpis
      await db.promise().query(
        "DELETE FROM group_trainers WHERE projectId = ? AND groupId = ? AND trainerId = ?",
        [projectId, groupId, trainerId]
      );
  
      res.status(200).json({
        success: true,
        message: "Szkoleniowiec został usunięty z grupy.",
      });
    } catch (error) {
      console.error("Błąd podczas usuwania szkoleniowca z grupy:", error);
      res.status(500).json({
        success: false,
        message: "Błąd serwera podczas usuwania szkoleniowca z grupy.",
      });
    }
  });

router.delete("/group-trainings/:trainingId/participants/:participantId", async (req, res) => {
  const { trainingId, participantId } = req.params;
  try {
    await db.promise().query("DELETE FROM group_training_participants WHERE trainingId = ? AND participantId = ?", [trainingId, participantId]);
    res.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas usuwania uczestnika:", error);
    res.status(500).json({ success: false });
  }
});
router.get("/:projectId/group-training/hours", async (req, res) => {
    const projectId = req.params.projectId;
  
    try {
      const [rows] = await db.promise().query(
        `
        SELECT 
          g.groupId AS groupId, 
          gt.name AS groupName, 
          gt.hours 
        FROM group_trainings gt
        JOIN group_trainers g ON g.groupId = gt.id
        WHERE gt.projectId = ?
        `,
        [projectId]
      );
  console.log('rows',rows)
      res.json({
        success: true,
        groupHours: rows,
      });
    } catch (error) {
      console.error("Błąd podczas pobierania godzin zajęć grupowych:", error);
      res.status(500).json({
        success: false,
        message: "Błąd podczas pobierania godzin zajęć grupowych.",
      });
    }
  });
  
/* router.post("/group-trainings", async (req, res) => {
    const { projectId, name, hours } = req.body;
    try {
      const [result] = await db.promise().query(
        "INSERT INTO group_trainings (projectId, name, hours) VALUES (?, ?, ?)",
        [projectId, name, hours]
      );
      res.json({ success: true, trainingId: result.insertId });
    } catch (error) {
      console.error("Błąd podczas dodawania szkolenia grupowego:", error);
      res.status(500).json({ success: false });
    }
  }); */

  router.get("/group-trainings/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
      const [trainings] = await db.promise().query(
        "SELECT * FROM group_trainings WHERE projectId = ? ORDER BY createdAt DESC",
        [projectId]
      );
      res.json({ success: true, trainings });
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleń grupowych:", error);
      res.status(500).json({ success: false });
    }
  });

 router.get("/group-trainings/details/:trainingId", async (req, res) => {
    const { trainingId } = req.params;
    try {
      const [trainingDetails] = await db.promise().query(
        "SELECT * FROM group_trainings WHERE id = ?",
        [trainingId]
      );
      res.json({ success: true, training: trainingDetails[0] });
    } catch (error) {
      console.error("Błąd podczas pobierania szczegółów szkolenia:", error);
      res.status(500).json({ success: false });
    }
  });

  router.post('/group-trainings', async (req, res) => {
    const { projectId, name, hours } = req.body;
  
    if (!projectId || !name || !hours) {
      return res.status(400).json({ success: false, message: 'Wszystkie pola są wymagane.' });
    }
  
    try {
      // Dodaj szkolenie do bazy danych
      const result = await db.promise().query(
        'INSERT INTO group_trainings (project_id, name, hours) VALUES (?, ?, ?)',
        [projectId, name, hours]
      );
  
      res.status(201).json({ success: true, trainingId: result.insertId });
    } catch (error) {
      console.error('Błąd podczas dodawania szkolenia grupowego:', error);
      res.status(500).json({ success: false, message: 'Błąd serwera.' });
    }
  });

  router.put('/group-trainings/:trainingId', async (req, res) => {
    const { trainingId } = req.params;
    const { name, hours } = req.body;
  
    if (!name || !hours) {
      return res.status(400).json({ success: false, message: 'Wszystkie pola są wymagane.' });
    }
  
    try {
      await db.promise().query(
        'UPDATE group_trainings SET name = ?, hours = ? WHERE id = ?',
        [name, hours, trainingId]
      );
  
      res.status(200).json({ success: true, message: 'Szkolenie zostało zaktualizowane.' });
    } catch (error) {
      console.error('Błąd podczas edytowania szkolenia grupowego:', error);
      res.status(500).json({ success: false, message: 'Błąd serwera.' });
    }
  });
  
  router.delete('/group-trainings/:trainingId', async (req, res) => {
    const { trainingId } = req.params;
  
    try {
      await db.promise().query('DELETE FROM group_trainings WHERE id = ?', [trainingId]);
  
      res.status(200).json({ success: true, message: 'Szkolenie zostało usunięte.' });
    } catch (error) {
      console.error('Błąd podczas usuwania szkolenia grupowego:', error);
      res.status(500).json({ success: false, message: 'Błąd serwera.' });
    }
  });
  
  

  module.exports = router;