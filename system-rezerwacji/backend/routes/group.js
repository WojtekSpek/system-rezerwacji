const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");


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