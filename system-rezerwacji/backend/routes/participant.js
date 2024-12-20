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
    } = req.body;
  
    const createdBy = req.user.username; // Nazwa użytkownika dodającego uczestnika
  
    const query = `
      INSERT INTO participants (
        firstName, lastName, pesel, gender, voivodeship, city, postalCode,
        street, houseNumber, apartmentNumber, phoneNumber, email, disabilityLevel, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
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


  router.get("/:projectId/participants/:participantId/hours", async (req, res) => {
    const { projectId, participantId } = req.params;
  
    try {
      // Pobierz planowane godziny dla wszystkich typów w projekcie
      const plannedQuery = `
        SELECT training_type_id, planned_hours 
        FROM project_training_types 
        WHERE project_id = ?
      `;
      const [plannedHours] = await db.promise().query(plannedQuery, [projectId]);
  
      // Pobierz sumę godzin zaplanowanych dla uczestnika w projekcie
      const assignedQuery = `
         SELECT type, SUM(TIMESTAMPDIFF(HOUR, start, end)) AS assigned_hours
      FROM events 
      WHERE project_id = ? AND participant_id = ?
      GROUP BY type
      `;
      const [assignedHours] = await db.promise().query(assignedQuery, [projectId, participantId]);
  
      // Mapowanie danych: dopasowanie godzin planowanych do zaplanowanych
      const hoursData = plannedHours.map((planned) => {
        const assigned = assignedHours.find((a) => a.type_id === planned.type_id) || { assigned_hours: 0 };
        return {
          typeId: planned.typeName,
          plannedHours: planned.planned_hours,
          assignedHours: assigned.assigned_hours,
          remainingHours: planned.planned_hours - assigned.assigned_hours,
        };
      });
  console.log(plannedHours);
      res.json({ success: true, hours: hoursData });
    } catch (error) {
      console.error("Błąd podczas pobierania godzin uczestnika:", error);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    }
  });
  
module.exports = router;
