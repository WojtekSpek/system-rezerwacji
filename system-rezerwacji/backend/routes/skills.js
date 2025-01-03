const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

router.post("/skills", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa umiejętności jest wymagana." });
  }

  try {
    const [result] = await db.promise().query("INSERT INTO skills (name) VALUES (?)", [name]);
    res.json({ success: true, skillId: result.insertId });
  } catch (error) {
    console.error("Błąd podczas dodawania umiejętności:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas dodawania umiejętności." });
  }
});
router.put("/skills/:id", async (req, res) => {
  const { id } = req.params; // ID umiejętności
  const { name } = req.body; // Nowa nazwa umiejętności

  if (!name || name.trim() === "") {
    return res.status(400).json({ success: false, message: "Nazwa umiejętności jest wymagana." });
  }

  try {
    const [result] = await db
      .promise()
      .query("UPDATE skills SET name = ? WHERE id = ?", [name, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Umiejętność nie została znaleziona." });
    }

    res.json({ success: true, message: "Umiejętność została zaktualizowana." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji umiejętności:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas aktualizacji umiejętności." });
  }
});

router.get("/skills", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM skills");
    res.json({ success: true, skills: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania umiejętności:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas pobierania umiejętności." });
  }
});

 
router.post("/trainers/:trainerId/skills", async (req, res) => {
  const { trainerId } = req.params;
  const { skillIds } = req.body; // Tablica ID umiejętności

  if (!skillIds || !Array.isArray(skillIds)) {
    return res.status(400).json({ success: false, message: "Lista ID umiejętności jest wymagana." });
  }

  try {
    // Usunięcie istniejących przypisań
    await db.promise().query("DELETE FROM trainer_skills WHERE trainer_id = ?", [trainerId]);

    // Dodanie nowych przypisań
    const insertValues = skillIds.map((skillId) => [trainerId, skillId]);
    await db.promise().query("INSERT INTO trainer_skills (trainer_id, skill_id) VALUES ?", [insertValues]);

    res.json({ success: true, message: "Umiejętności zostały przypisane." });
  } catch (error) {
    console.error("Błąd podczas przypisywania umiejętności:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas przypisywania umiejętności." });
  }
});
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ success: false, skills: [] });

  try {
    const [rows] = await db.promise().query(
      "SELECT id, name FROM skills WHERE name LIKE ?",
      [`%${query}%`]
    );
    res.json({ success: true, skills: rows });
  } catch (error) {
    console.error("Błąd podczas wyszukiwania umiejętności:", error);
    res.status(500).json({ success: false });
  }
});

router.get("/:trainerId/skills", async (req, res) => {
  const { trainerId } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT s.id, s.name 
       FROM skills s
       INNER JOIN trainer_skills ts ON s.id = ts.skill_id
       WHERE ts.trainer_id = ?`,
      [trainerId]
    );
    res.json({ success: true, skills: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania umiejętności szkoleniowca:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas pobierania umiejętności." });
  }
});
router.delete("/skills/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query("DELETE FROM skills WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Umiejętność nie została znaleziona." });
    }

    res.json({ success: true, message: "Umiejętność została usunięta." });
  } catch (error) {
    console.error("Błąd podczas usuwania umiejętności:", error);
    res.status(500).json({ success: false, message: "Błąd serwera podczas usuwania umiejętności." });
  }
});   

module.exports = router;
