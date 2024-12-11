const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

// Pobieranie projektów
router.get("/", authenticateUser, async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM projects");
    res.json({ success: true, projects: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania projektów:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Dodawanie projektu
router.post("/addProject", authenticateUser, async (req, res) => {
  const { name, trainingTypes, createdBy } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    const [result] = await db.promise().query(
      "INSERT INTO projects (name, created_at, created_by) VALUES (?, NOW(), ?)",
      [name, createdBy]
    );

    if (trainingTypes && trainingTypes.length > 0) {
      const projectId = result.insertId;
      const typeQueries = trainingTypes.map((typeId) =>
        db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id) VALUES (?, ?)",
          [projectId, typeId]
        )
      );
      await Promise.all(typeQueries);
    }

    res.json({ success: true, message: "Projekt został dodany." });
  } catch (error) {
    console.error("Błąd podczas dodawania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Aktualizacja projektu
router.put("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { name, trainingTypes } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    await db.promise().query("UPDATE projects SET name = ? WHERE id = ?", [name, id]);
    await db.promise().query("DELETE FROM project_training_types WHERE project_id = ?", [id]);

    if (trainingTypes && trainingTypes.length > 0) {
      const typeQueries = trainingTypes.map((typeId) =>
        db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id) VALUES (?, ?)",
          [id, typeId]
        )
      );
      await Promise.all(typeQueries);
    }

    res.json({ success: true, message: "Projekt został zaktualizowany." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Usuwanie projektu
router.delete("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM projects WHERE id = ?", [id]);
    res.json({ success: true, message: "Projekt został usunięty." });
  } catch (error) {
    console.error("Błąd podczas usuwania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.put("/updateProject/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const projectId = req.params.id; // ID projektu z URL
  const { name, types } = req.body; // Dane przesłane w żądaniu

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    // Aktualizacja nazwy projektu
    await db.promise().query("UPDATE projects SET name = ? WHERE id = ?", [name, projectId]);

    // Aktualizacja typów projektu
    await db.promise().query("DELETE FROM project_training_types WHERE project_id = ?", [projectId]);

    if (types && types.length > 0) {
      const typeInsertPromises = types.map((typeId) => {
        return db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id) VALUES (?, ?)",
          [projectId, typeId]
        );
      });
      await Promise.all(typeInsertPromises);
    }

    res.json({ success: true, message: "Projekt został zaktualizowany." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobranie typów przypisanych do projektu
router.get("/project_training_types/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT t.type 
       FROM project_training_types pt
       INNER JOIN training_types t ON pt.training_type_id = t.id
       WHERE pt.project_id = ?`,
      [projectId]
    );

    res.json({
      success: true,
      types: rows.map((row) => row.type), // Wyciągnięcie nazw typów
    });
  } catch (error) {
    console.error("Błąd podczas pobierania typów projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobranie wszystkich typów szkoleń
router.get("/trainingTypes", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT id, type FROM training_types"
    );

    res.json({
      success: true,
      data: rows, // Zwraca wszystkie typy jako obiekty
    });
  } catch (error) {
    console.error("Błąd podczas pobierania typów szkoleń:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

module.exports = router;
