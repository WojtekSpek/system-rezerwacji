const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");


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

router.post("/group-trainings", async (req, res) => {
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
  });

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
// Pobieranie szkoleniowców przypisanych do grupy
router.get("/group/:projectId/group-trainers/:groupId", async (req, res) => {
  const { projectId, groupId } = req.params;

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
  module.exports = router;