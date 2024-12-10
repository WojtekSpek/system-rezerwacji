const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const session = require("express-session");
const { authenticateUser, authorizePermission } = require("../middlewares/auth");

// Inicjalizacja aplikacji
const app = express();
const PORT = 5000;

// Konfiguracja CORS z obsługą ciasteczek
app.use(cors({
  origin: "http://localhost:3000", // Adres Twojego frontendu
  credentials: true, // Pozwolenie na przesyłanie ciasteczek
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Konfiguracja sesji
app.use(session({
  secret: "e1b8b0eae26b2f72a024db11c8f238e849a9c3d4a2f98d239c3f07cda7b8f1e2", // Klucz dla sesji
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Ustaw true tylko dla HTTPS
    httpOnly: true, // Uniemożliwia dostęp do ciasteczka z JavaScript
    sameSite: "lax", // Zapobiega atakom CSRF (możesz użyć "strict" dla większego bezpieczeństwa)
  },
  
}));

// Połączenie z bazą danych
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rezerwacja",
});



// Logowanie użytkownika
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      req.session.user = { id: user.id, username: user.username, role: user.role };
      console.log("Sesja po zalogowaniu:", req.session.user); // Logowanie sesji
      res.status(200).json({
        success: true,
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(401).json({ success: false, message: "Nieprawidłowe dane logowania." });
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});
// Middleware: Autoryzacja dla ról
const authorizeRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Brak dostępu." });
  }
};
// Pobieranie użytkowników
app.get("/users", authenticateUser, authorizeRole("admin"), (req, res) => {
  const sql = "SELECT id, username, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Błąd podczas pobierania użytkowników:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera" });
    }
    res.json({ success: true, users: results });
  });
});

// Dodawanie użytkownika
app.post("/addUser", authenticateUser, authorizeRole("admin"), (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ success: false, message: "Brak danych." });
  }

  const sql = "INSERT INTO users (username, role) VALUES (?, ?)";
  db.query(sql, [username, role], (err) => {
    if (err) {
      console.error("Błąd podczas dodawania użytkownika:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera." });
    }
    res.json({ success: true, message: "Użytkownik dodany pomyślnie." });
  });
});

// Usuwanie użytkownika
app.delete("/deleteUser/:id", authenticateUser, authorizeRole("admin"), (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err) => {
    if (err) {
      console.error("Błąd usuwania użytkownika:", err);
      res.status(500).json({ success: false, message: "Błąd serwera." });
    } else {
      res.json({ success: true, message: "Użytkownik usunięty pomyślnie." });
    }
  });
});

// Dodawanie projektu
app.post("/addProject", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { name} = req.body;
  const createdBy = req.user.username; // Pobierz nazwę użytkownika z sesji
  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }
  try {
    const [result] = await db.promise().query(
      "INSERT INTO projects (name, created_at, created_by) VALUES (?, NOW(), ?)",
      [name, createdBy]
    );
    res.status(201).json({ success: true, message: "Projekt dodany pomyślnie!", projectId: result.insertId });
  } catch (error) {
    console.error("Błąd podczas dodawania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobieranie projektów
app.get("/projects", authenticateUser, (req, res) => {
  
  const query = "SELECT id, name, created_at, created_by FROM projects";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Błąd podczas pobierania projektów:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera." });
    }

    const projects = results.reduce((acc, row) => {
      const project = acc.find((p) => p.id === row.id);
      if (project) {
        project.supports.push({ type: row.type, hours: row.hours });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          createdAt: row.created_at,
          createdBy: row.created_by,
          
        });
      }
      return acc;
    }, []);

    res.json({ success: true, projects });
  });
});

// Usuwanie projektu
app.delete("/projects/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM projects WHERE id = ?", [id]);
    res.json({ success: true, message: "Projekt usunięty pomyślnie." });
  } catch (error) {
    console.error("Błąd podczas usuwania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Obsługa sesji
app.get("/session", (req, res) => {
  console.log("Sesja użytkownika:", req.session); // Loguj pełną sesję
  if (req.session && req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Nie zalogowano." });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Błąd podczas niszczenia sesji:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera." });
    }
    res.json({ success: true, message: "Wylogowano pomyślnie." });
  });
});

// Uruchomienie serwera
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
//pobieranie szkoleniowcow
app.get("/trainers",authenticateUser, authorizeRole("admin"), (req, res) => {
  const query = 
   " SELECT trainers.id, trainers.name, GROUP_CONCAT(trainer_types.type) AS types FROM trainers     LEFT JOIN trainer_types ON trainers.id = trainer_types.trainer_id GROUP BY trainers.id"
  ;
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
//dodawanie szkoleniowca
app.post("/trainingTypes", authenticateUser, authorizeRole("admin"),  (req, res) => {
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
//pobieranie typow szkolen
app.get("/trainingTypes", authenticateUser, authorizeRole("admin"), (req, res) => {
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
app.get("/participants", authenticateUser, (req, res) => {
  db.query("SELECT * FROM participants", (err, results) => {
    if (err) {
      console.error("Błąd podczas pobierania uczestników:", err);
      return res.status(500).json({ success: false, message: "Błąd serwera." });
    }
    res.json({ success: true, participants: results });
  });
});

app.post("/addParticipant", authenticateUser, async (req, res) => {
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
    console.error("Błąd podczas dodawania uczestnika:", error.code);

    // Obsługa błędu unikalności
    if (error.code === "ER_DUP_ENTRY") {
      console.log('1');
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
app.get("/projectParticipants/:projectId", authenticateUser, async (req, res) => {
  const { projectId } = req.params;

  const query = `
    SELECT p.id, p.firstName, p.lastName
    FROM participants p
    INNER JOIN project_participants pp ON p.id = pp.participant_id
    WHERE pp.project_id = ?
  `;

  try {
    const [rows] = await db.promise().query(query, [projectId]);
    res.json({ success: true, participants: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania przypisanych uczestników:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

app.post("/assignParticipants/:projectId", authenticateUser, async (req, res) => {
  const { projectId } = req.params;
  const { participants } = req.body;

  const query = `
    INSERT INTO project_participants (project_id, participant_id)
    VALUES (?, ?)
  `;

  try {
    for (const participantId of participants) {
      await db.promise().query(query, [projectId, participantId]);
    }
    res.json({ success: true, message: "Uczestnicy zostali przypisani." });
  } catch (error) {
    console.error("Błąd podczas przypisywania uczestników:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

app.delete("/projects/:projectId/participants/:participantId", async (req, res) => {
  const { projectId, participantId } = req.params;
  try {
    await db.promise().query(
      "DELETE FROM project_participants WHERE project_id = ? AND participant_id = ?",
      [projectId, participantId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas usuwania uczestnika z projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});
app.get("/projects/:id/participants", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query(
      `SELECT p.id, p.firstName, p.lastName
       FROM participants p
       INNER JOIN project_participants pp ON p.id = pp.participant_id
       WHERE pp.project_id = ?`,
      [id]
    );
    res.json({ success: true, participants: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania uczestników projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});
app.post("/projects/:id/participants", async (req, res) => {
  const { id } = req.params; // ID projektu
  const { participantId } = req.body; // ID uczestnika
  console.error("Błąd podczas dodawania uczestnika do projektu:", participantId);
  try {
    await db.promise().query(
      "INSERT INTO project_participants (project_id, participant_id) VALUES (?, ?)",
      [id, participantId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas dodawania uczestnika do projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});
