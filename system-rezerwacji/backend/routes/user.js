const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
   console.log ('req.body',req.body)  
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
  router.get("/", async (req, res) => {
    try {
      const [rows] = await db.promise().query("SELECT id, username, role, email FROM users");
      res.json({
        success: true,
        users: rows, // Lista użytkowników
      });
    } catch (error) {
      console.error("Błąd podczas pobierania listy użytkowników:", error);
      res.status(500).json({
        success: false,
        message: "Błąd serwera podczas pobierania użytkowników.",
      });
    }
  }); 
router.get("/session", (req, res) => {
  console.log("Sprawdzanie sesji:", req.session);
    if (req.session && req.session.user) {
      res.json({ success: true, user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: "Nie zalogowano." });
    }
  });

  router.post("/addUser", (req, res) => {
    const { username, role,email,password, } = req.body;
  
    if (!username || !role) {
      return res.status(400).json({ success: false, message: "Brak danych." });
    }
  
    const sql = "INSERT INTO users (username, role,email,password,) VALUES (?, ?)";
    db.query(sql, [username, role,email,password,], (err, results) => {
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
    const { id, username, email, password, role } = req.body;
      console.log('req.body',req.body)
        if (!id || !username || !email || !password || !role) {
          return res.status(400).json({ success: false, message: "Wszystkie pola są wymagane." });
        }

        try {
          const query = `UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
           db.promise().query(query, [username, email, password, role, id]);

          res.json({ success: true, message: "Użytkownik został zaktualizowany." });
        } catch (error) {
          console.error("Błąd podczas aktualizacji użytkownika:", error);
          res.status(500).json({ success: false, message: "Błąd serwera." });
        }
  });
module.exports = router;
