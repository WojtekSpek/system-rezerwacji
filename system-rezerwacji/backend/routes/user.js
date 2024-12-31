const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

router.post("/login",authenticateUser, authorizeRole("admin"),  async (req, res) => {
  const { username, password } = req.body;

  console.log("Żądanie logowania:", req.body); // Debugowanie danych wejściowych

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Brak nazwy użytkownika lub hasła." });
  }

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      
      // Zapisz użytkownika w sesji
      req.session.user = { id: user.id, username: user.username, role: user.role };

      console.log("Sesja użytkownika po zalogowaniu:", req.session.user); // Debugowanie sesji
      console.log("Nagłówki odpowiedzi przed wysłaniem:", res.getHeaders());

      return res.json({ success: true, user: req.session.user });
    } else {
      return res.status(401).json({ success: false, message: "Nieprawidłowe dane logowania." });
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    return res.status(500).json({ success: false, message: "Błąd serwera." });
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
router.get("/session",authenticateUser, authorizeRole("admin"),  (req, res) => {
  console.log("Sprawdzanie sesji:", req.session);
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
