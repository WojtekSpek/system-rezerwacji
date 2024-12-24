const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

// Endpoint: Pobierz wydarzenia dla trenera
router.get("/:trainersId/events", async (req, res) => {
  const { trainersId } = req.params;

  try {
    const query = `
      SELECT id, title, description, start, end
      FROM events
      WHERE project_trainer_id = ?
    `;

    const [events] = await db.promise().query(query, [trainersId]);

    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Błąd podczas pobierania wydarzeń" });
  }
});
//dodawanie szkoleniowca
router.post("/Types", authenticateUser, authorizeRole("admin"),  (req, res) => {
    const { name } = req.body;
  
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Nazwa typu szkolenia jest wymagana" });
    }
  
    const query = "INSERT INTO training_types (name) VALUES (?)";
    db.query(query, [name], (err, result) => {
      if (err) {
        console.error("Błąd podczas dodawania typu szkolenia:", err);
        res.status(500).send({ success: false, message: "Błąd serwera" });
      } else {
        res.status(201).json({ success: true, message: "Typ szkolenia dodany pomyślnie" });
      }
    });
  });
  router.post("/addTrainer", async (req, res) => {
    const { name, types } = req.body;
  
    console.log("Otrzymane dane:", { name, types });
  
    if (!name || !Array.isArray(types) || types.length === 0) {
      return res.status(400).json({ success: false, message: "Brak wymaganych danych" });
    }
  
    try {
      // Dodaj szkoleniowca do bazy
      const trainerInsertQuery = "INSERT INTO trainers (name) VALUES (?)";
      const [trainerResult] = await db.promise().query(trainerInsertQuery, [name]);
  
      const trainerId = trainerResult.insertId; // Pobierz ID dodanego szkoleniowca
  
      // Dodaj typy szkoleń dla szkoleniowca
      const typeInsertQuery = "INSERT INTO trainer_types (trainer_id, type_id,type) VALUES (?, ?, ?)";
      const typePromises = types.map((typeObj) => {
        // Załóżmy, że `typeObj` zawiera `id` (type_id) oraz `type` (type_name)
        return db.promise().query(typeInsertQuery, [trainerId, typeObj.id, typeObj.type]);
      });
  
      await Promise.all(typePromises); // Poczekaj na zapis wszystkich typów
  
      res.json({ success: true, message: "Szkoleniowiec został dodany" });
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
      res.status(500).json({ success: false, message: "Błąd serwera" });
    }
  });
  
  router.get("/trainingTypes", (req, res) => {
  console.log('jestem')
    const query = "SELECT * FROM training_types";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Błąd podczas pobierania typów szkoleń:", err);
        res.status(500).send("Błąd serwera");
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

  // Usuwanie szkoleniowca
  router.delete("/deleteTrainer/:id", (req, res) => {
    const { id } = req.params;
  
    const deleteQuery = "DELETE FROM trainers WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Błąd podczas usuwania szkoleniowca:", err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.json({ success: true });
      }
    });
  });
  
  // Edytowanie szkoleniowca
  router.put("/editTrainer/:id", async (req, res) => {
    const trainerId = req.params.id;
    const { name, email, phone, types } = req.body; // Destrukturyzacja danych
  
    console.log("Otrzymane req.body:", req.body);
    console.log("Otrzymane req.params.id:", trainerId);
  
    // Pobierz listę dostępnych typów z bazy danych
    const [validTypes] = await db.promise().query("SELECT type FROM training_types");
    const validTypeSet = new Set(validTypes.map((t) => t.type)); // Szybsza walidacja za pomocą Set
  
    const invalidTypes = types.filter((type) => !validTypeSet.has(type));
    if (invalidTypes.length > 0) {
      console.error("Nieprawidłowe dane typu:", invalidTypes);
      return res
        .status(400)
        .json({ success: false, message: `Nieprawidłowe typy: ${invalidTypes.join(", ")}` });
    }
  
    try {
      // Zaktualizuj dane trenera
      await db.promise().query(
        "UPDATE trainers SET name = ?, email = ?, phone = ? WHERE id = ?",
        [name, email, phone, trainerId]
      );
  
      // Usuń istniejące typy i dodaj nowe
      await db.promise().query("DELETE FROM trainer_types WHERE trainer_id = ?", [trainerId]);
      const typeInsertPromises = types.map((type) =>
        db.promise().query(
          "INSERT INTO trainer_types (trainer_id, type) VALUES (?, ?)",
          [trainerId, type]
        )
      );
      await Promise.all(typeInsertPromises);
  
      res.json({ success: true, message: "Dane trenera zostały zaktualizowane." });
    } catch (error) {
      console.error("Błąd podczas aktualizacji trenera:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  
  router.get("/Types", (req, res) => {
    const query = "SELECT * FROM training_types";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Błąd podczas pobierania typów szkoleń:", err);
        res.status(500).send("Błąd serwera");
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

  router.get("/:id", async (req, res) => {
    const trainerId = req.params.id;
  
    const query = `
      SELECT trainers.id, trainers.name, trainers.email, trainers.phone, 
             GROUP_CONCAT(trainer_types.type) AS types
      FROM trainers
      LEFT JOIN trainer_types ON trainers.id = trainer_types.trainer_id
      WHERE trainers.id = ?
      GROUP BY trainers.id;
    `;
  
    try {
      const [results] = await db.promise().query(query, [trainerId]);
      if (!results.length) {
        return res.status(404).json({ success: false, message: "Trainer not found" });
      }
  
      res.json({
        success: true,
        trainer: {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          phone: results[0].phone,
          types: results[0].types ? results[0].types.split(",") : [],
        },
      });
    } catch (error) {
      console.error("Błąd podczas pobierania danych trenera:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  

  //pobieranie szkoleniowcow
router.get("/", (req, res) => {
    const query = "SELECT trainers.id, trainers.name, trainers.email,trainers.phone, GROUP_CONCAT(trainer_types.type) AS types       FROM trainers       LEFT JOIN trainer_types ON trainers.id = trainer_types.trainer_id       GROUP BY trainers.id"     ;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({
        success: true,
        trainers: results.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          types: row.types ? row.types.split(",") : [],
        })),
      });
    });
  });

//pobieranie typow szkolen



//pobieranie typow szkolen

  //dodawanie typow szkolen
router.post("/addTrainingType", (req, res) => {
    const { type } = req.body;
    const query = "INSERT INTO training_types (type) VALUES (?)";
    db.query(query, [type], (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    });
  });
  
  router.delete("/deleteTrainingType/:id", (req, res) => {
    const typeId = req.params.id;
    const query = "DELETE FROM training_types WHERE id = ?";
    db.query(query, [typeId], (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: "Błąd serwera podczas usuwania." });
      } else {
        res.json({ success: true, message: "Typ szkolenia został usunięty." });
      }
    });
  });
  router.put("/updateTrainingType", (req, res) => {
    const { id, type } = req.body;
    const query = "UPDATE training_types SET type = ? WHERE id = ?";
    db.query(query, [type, id], (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: "Błąd serwera podczas edycji." });
      } else {
        res.json({ success: true, message: "Typ szkolenia został zaktualizowany." });
      }
    });
  });
  router.get("/trainersType", async (req, res) => {
    const { typeId } = req.query; // Pobierz typeId z query params
  
    if (!typeId) {
      return res.status(400).json({ success: false, message: "typeId jest wymagane." });
    }
  
    try {
      const [rows] = await db.promise().query(
        `SELECT t.id, t.name 
         FROM trainers t
         INNER JOIN trainer_types tt ON t.id = tt.trainer_id
         WHERE tt.type_id = ?`,
        [typeId]
      );
  
      res.json({
        success: true,
        trainers: rows,
      });
      console.log('rows_type',rows);
    } catch (error) {
      console.error("Błąd podczas pobierania szkoleniowców:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  module.exports = router;