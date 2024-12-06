const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); // Użyj promise-compatible wersji mysql2


const app = express();
const PORT = 5000;


// Middleware
app.use(cors()); // Obsługa CORS
app.use(bodyParser.json()); // Obsługa JSON w żądaniach
app.use(express.json()); // Middleware do parsowania JSON


// Połączenie z bazą danych
const db = mysql.createPool({
  host: "localhost",        // Adres serwera bazy danych
  user: "root",             // Nazwa użytkownika
  password: "",     // Hasło użytkownika
  database: "rezerwacja",   // Nazwa bazy danych
}
);

// Dodaj .promise() przy użyciu query
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Otrzymano dane logowania:", username, password);

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      console.log("Użytkownik znaleziony:", user);
      res.status(200).json({
        success: true,
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Nieprawidłowe dane logowania.",
      });
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera. Spróbuj ponownie później.",
    });
  }
});



// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});


app.get("/users", (req, res) => {
  const sql = "SELECT id, username, role FROM users"; // Pobierz użytkowników z bazy danych
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Błąd podczas pobierania użytkowników:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera" });
    }
    res.json({ success: true, users: results });
  });
});
app.post("/addUser", (req, res) => {
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
app.delete("/deleteUser/:id", (req, res) => {
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
app.put("/updateUser", (req, res) => {
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
// Dodawanie nowego projektu
app.post("/addProject", (req, res) => {
  const { name, supports } = req.body;

  if (!name || !supports || !Array.isArray(supports)) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  // Wstawianie projektu do tabeli projects
  const insertProjectQuery = "INSERT INTO projects (name) VALUES (?)";
  db.query(insertProjectQuery, [name], (err, result) => {
    if (err) {
      console.error("Błąd podczas dodawania projektu:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    const projectId = result.insertId;

    // Dodawanie typów wsparcia do tabeli supports
    const supportQueries = supports.map((support) => {
      return new Promise((resolve, reject) => {
        const insertSupportQuery =
          "INSERT INTO supports (project_id, type, hours) VALUES (?, ?, ?)";
        db.query(
          insertSupportQuery,
          [projectId, support.type, support.hours],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    });

    Promise.all(supportQueries)
      .then(() => {
        res.json({ success: true, message: "Projekt dodany pomyślnie!" });
      })
      .catch((err) => {
        console.error("Błąd podczas dodawania wsparcia:", err);
        res
          .status(500)
          .json({ success: false, message: "Error adding project supports" });
      });
  });
});

// Pobieranie projektów z bazy danych
app.get("/projects", (req, res) => {
  const query = `
    SELECT p.id, p.name, s.type, s.hours 
    FROM projects p 
    LEFT JOIN supports s ON p.id = s.project_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Błąd podczas pobierania projektów:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    const projects = results.reduce((acc, row) => {
      const project = acc.find((p) => p.id === row.id);
      if (project) {
        project.supports.push({ type: row.type, hours: row.hours });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          supports: row.type ? [{ type: row.type, hours: row.hours }] : [],
        });
      }
      return acc;
    }, []);

    res.json({ success: true, projects });
  });
});
