const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
     
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      req.session.user = { id: user.id, username: user.username, role: user.role }; // Zapisz użytkownika w sesji
      res.json({ success: true, user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: "Nieprawidłowe dane logowania." });
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Błąd podczas wylogowywania:", err);
        return res.status(500).json({ success: false, message: "Błąd serwera." });
      }
      res.json({ success: true, message: "Wylogowano pomyślnie." });
    });
  });
  
router.get("/session", (req, res) => {
    if (req.session && req.session.user) {
      res.json({ success: true, user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: "Nie zalogowano." });
    }
  });

  router.post("/addUser", (req, res) => {
    const { username, role } = req.body;
  
    if (!username || !role) {
      return res.status(400).json({ success: false, message: "Brak danych." });
    }
  
    const sql = "INSERT INTO users (username, role) VALUES (?, ?)";
    db.query(sql, [username, role], (err, results) => {
      if (err) {
        console.error("Błąd podczas dodawania użytkownika:", err);
        return res.status(500).json({ success: false, message: "Błąd serwera." });
      }
      res.json({ success: true, message: "Użytkownik dodany pomyślnie." });
    });
  });
  router.delete("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Błąd usuwania użytkownika:", err);
        res.status(500).json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  });
  router.put("/updateUser", (req, res) => {
    const { id, username, password, role } = req.body;
    const sql = "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?";
    db.query(sql, [username, password, role, id], (err, result) => {
      if (err) {
        console.error("Błąd aktualizacji użytkownika:", err);
        res.status(500).json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  });
module.exports = router;
