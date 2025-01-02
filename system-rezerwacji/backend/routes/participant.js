const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser } = require("../middlewares/auth");


// Pobieranie uczestników
router.get("/", authenticateUser, async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM participants");
    res.json({ success: true, participants: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania uczestników:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.post("/addParticipant", authenticateUser, async (req, res) => {
    const {
      firstName,
      lastName,
      pesel,
      gender,
      voivodeship,
      city,
      postalCode,
      street,
      houseNumber,
      apartmentNumber,
      phoneNumber,
      email,
      disabilityLevel,
      nationality,
    } = req.body;
  
    const createdBy = req.user.username; // Nazwa użytkownika dodającego uczestnika
  
    const query = `
      INSERT INTO participants (
        firstName, lastName, pesel, gender, voivodeship, city, postalCode,
        street, houseNumber, apartmentNumber, phoneNumber, email, disabilityLevel, created_by,nationality
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
  console.log('req.body',req.body)
    try {
      await db.promise().query(query, [
        firstName,
        lastName,
        pesel,
        gender,
        voivodeship,
        city,
        postalCode,
        street,
        houseNumber,
        apartmentNumber,
        phoneNumber,
        email,
        disabilityLevel,
        createdBy,
        nationality,
      ]);
  
      res.json({ success: true, message: "Uczestnik został dodany!" });
    } catch (error) {
      console.error("Błąd podczas dodawania uczestnika:", error);
  
      // Obsługa błędu unikalności
      if (error.code === "ER_DUP_ENTRY") {
        const duplicateField = error.sqlMessage.includes("email")
          ? "email"
          : "pesel";
        return res.status(400).json({
          success: false,
          message: `Uczestnik z tym ${duplicateField} już istnieje.`,
        });
      }
  
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  router.put("/editParticipant/:id", authenticateUser, async (req, res) => {
    const {
      firstName,
      lastName,
      pesel,
      gender,
      voivodeship,
      city,
      postalCode,
      street,
      houseNumber,
      apartmentNumber,
      phoneNumber,
      email,
      disabilityLevel,
      nationality,
    } = req.body;
  console.log('req.body__123',req.body)
    const updatedBy = req.user.username; // Nazwa użytkownika edytującego uczestnika
    const participantId = req.params.id; // ID uczestnika, którego dane będą edytowane
  
    const query = `
      UPDATE participants
      SET 
        firstName = ?,
        lastName = ?,
        pesel = ?,
        gender = ?,
        voivodeship = ?,
        city = ?,
        postalCode = ?,
        street = ?,
        houseNumber = ?,
        apartmentNumber = ?,
        phoneNumber = ?,
        email = ?,
        disabilityLevel = ?,
        updated_by = ?,
        nationality = ?
      WHERE id = ?
    `;
  
    try {
      const [result] = await db.promise().query(query, [
        firstName,
        lastName,
        pesel,
        gender,
        voivodeship,
        city,
        postalCode,
        street,
        houseNumber,
        apartmentNumber,
        phoneNumber,
        email,
        disabilityLevel,
        updatedBy,
        nationality,
        participantId,
      ]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Uczestnik nie został znaleziony." });
      }
  
      res.json({ success: true, message: "Dane uczestnika zostały zaktualizowane!" });
    } catch (error) {
      console.error("Błąd podczas edycji uczestnika:", error);
  
      // Obsługa błędu unikalności
      if (error.code === "ER_DUP_ENTRY") {
        const duplicateField = error.sqlMessage.includes("email")
          ? "email"
          : "pesel";
        return res.status(400).json({
          success: false,
          message: `Uczestnik z tym ${duplicateField} już istnieje.`,
        });
      }
  
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  

  router.get("/:projectId/participants/:participantId/hours", async (req, res) => {
    const { projectId, participantId } = req.params;
  
    try {
      // Pobierz planowane godziny dla wszystkich typów w projekcie
      const plannedQuery = `
        SELECT pt.training_type_id, pt.planned_hours, tt.type
        FROM project_training_types pt
        JOIN training_types tt ON pt.training_type_id = tt.id
        WHERE pt.project_id = ?
      `;
      const [plannedHours] = await db.promise().query(plannedQuery, [projectId]);
  
      // Pobierz sumę godzin zaplanowanych dla uczestnika w projekcie
      const assignedQuery = `
        SELECT project_trainer_id AS training_type_id, SUM(TIMESTAMPDIFF(HOUR, start, end)) AS assigned_hours
        FROM events 
        WHERE project_id = ? AND participant_id = ?
        GROUP BY project_trainer_id
      `;
      const [assignedHours] = await db.promise().query(assignedQuery, [projectId, participantId]);
  
      // Mapowanie danych: dopasowanie godzin planowanych do zaplanowanych
      const hoursData = plannedHours.map((planned) => {
        // Dopasuj przydzielone godziny do planowanych typów
        const assigned = assignedHours.find((a) => a.training_type_id === planned.training_type_id) || { assigned_hours: 0 };
        
        return {
          typeName: planned.type, // Nazwa z tabeli `training_types`
          plannedHours: planned.planned_hours,
          assignedHours: assigned.assigned_hours,
          remainingHours: Math.max(0, planned.planned_hours - assigned.assigned_hours), // Zapewnij, że nie ma wartości ujemnych
        };
      });
  
      console.log('hoursData ', hoursData);
      res.json({ success: true, hours: hoursData });
    } catch (error) {
      console.error("Błąd podczas pobierania godzin uczestnika:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  
      router.get("/:id/Details", async (req, res) => {
        const { id } = req.params;
        try {
          // Pobieranie danych uczestnika
          const [participantData] = await db.promise().query(
            "SELECT * FROM participants WHERE id = ?",
            [id]
          );
      
      
          res.json({
            success: true,
            participant: {
              ...participantData[0],
             
            },
          });
        } catch (error) {
          console.error("Błąd podczas pobierania danych uczestnika projektu:", error);
          res.status(500).json({ success: false, message: "Błąd serwera." });
        }
      });

      router.get("/events/:participantId", async (req, res) => {
        const { participantId } = req.params;
      
        try {
          const [events] = await db.promise().query(
            `SELECT id, start, end FROM events WHERE participant_id = ? OR JSON_CONTAINS(groupParticipantIds, ?)`,
            [participantId,participantId]
          );
      
          res.json({ success: true, events });
        } catch (error) {
          console.error("Błąd podczas pobierania wydarzeń:", error);
          res.status(500).json({ success: false, message: "Błąd serwera." });
        }
      });
      
module.exports = router;
