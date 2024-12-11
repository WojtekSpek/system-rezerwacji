const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");
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
    console.log("Otrzymane dane1:", types);
    if (!name || !Array.isArray(types) || types.length === 0) {
      return res.status(400).json({ success: false, message: "Brak wymaganych danych" });
    }
  
    try {
      // Dodaj szkoleniowca do bazy
      const trainerInsertQuery = "INSERT INTO trainers (name) VALUES (?)";
      const [trainerResult] = await db.promise().query(trainerInsertQuery, [name]);
  
      const trainerId = trainerResult.insertId; // Pobierz ID dodanego szkoleniowca
  
      // Dodaj typy szkoleń dla szkoleniowca
      const typeInsertQuery = "INSERT INTO trainer_types (trainer_id, type) VALUES (?, ?)";
      const typePromises = types.map((typeObj) => {
        return db.promise().query(typeInsertQuery, [trainerId, typeObj.type]);
      });
  
      await Promise.all(typePromises); // Poczekaj na zapis wszystkich typów
  
      res.json({ success: true, message: "Szkoleniowiec został dodany" });
    } catch (error) {
      console.error("Błąd podczas dodawania szkoleniowca:", error);
      res.status(500).json({ success: false, message: "Błąd serwera" });
    }
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
  router.put("/editTrainer/:id", (req, res) => {
    console.log("Otrzymane req.body:", req.body);
    console.log("Otrzymane req.params.id:", req.params.id);
    const { id } = req.params;
    const { name, types } = req.body;
    const validTypes = types.filter((typeObj) => typeObj && typeObj.type);
    const updateTrainerQuery = "UPDATE trainers SET name = ? WHERE id = ?";
    db.query(updateTrainerQuery, [name, id], (err) => {
      if (err) {
        console.error("Błąd podczas edytowania szkoleniowca:", err);
        res.status(500).json({ success: false, error: err });
      } else {
        const deleteTypesQuery = "DELETE FROM trainer_types WHERE trainer_id = ?";
        db.query(deleteTypesQuery, [id], (err) => {
          if (err) {
            console.error("Błąd podczas usuwania typów szkoleń:", err);
            res.status(500).json({ success: false, error: err });
          } else {
            console.log("Otrzymane types:", types);
            const typeInsertQuery = "INSERT INTO trainer_types (trainer_id, type) VALUES (?, ?)";
            const typePromises = types.map((type) => {
            console.log("id, type:", id, type); // Debug poprawionego zapisu
            return db.promise().query(typeInsertQuery, [id, type]);
            });
            Promise.all(typePromises)
              .then(() => res.json({ success: true }))
              .catch((err) => {
                console.error("Błąd podczas dodawania typów szkoleń:", err);
                res.status(500).json({ success: false, error: err });
              });
          }
        });
      }
    });
  });  

  //pobieranie szkoleniowcow
router.get("/", (req, res) => {
    const query = "SELECT trainers.id, trainers.name, GROUP_CONCAT(trainer_types.type) AS types       FROM trainers       LEFT JOIN trainer_types ON trainers.id = trainer_types.trainer_id       GROUP BY trainers.id"     ;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({
        success: true,
        trainers: results.map((row) => ({
          id: row.id,
          name: row.name,
          types: row.types ? row.types.split(",") : [],
        })),
      });
    });
  });

//pobieranie typow szkolen
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
module.exports = router;

//pobieranie typow szkolen
router.get("/trainingTypes", (req, res) => {
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