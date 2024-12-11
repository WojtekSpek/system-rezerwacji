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
  
module.exports = router;
