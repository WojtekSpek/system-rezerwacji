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
app.post("/AddProject", async (req, res) => {
  const { name, supports } = req.body;

  try {
    // Zapis projektu
    const [projectResult] = await db.promise().query(
      "INSERT INTO projects (name) VALUES (?)",
      [name]
    );
    const projectId = projectResult.insertId;

    // Zapis typów wsparcia i przypisanych szkoleniowców
    for (const support of supports) {
      const [supportResult] = await db.promise().query(
        "INSERT INTO supports (project_id, type, hours) VALUES (?, ?, ?)",
        [projectId, support.type, support.hours]
      );

      const supportId = supportResult.insertId;
      for (const trainerId of support.trainers) {
        await db.promise().query(
          "INSERT INTO support_trainers (support_id, trainer_id) VALUES (?, ?)",
          [supportId, trainerId]
        );
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas zapisywania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd podczas zapisywania projektu." });
  }
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
//dodawanie typow szkolen
app.post("/addTrainingType", (req, res) => {
  const { type } = req.body;
  const query = "INSERT INTO training_types (type) VALUES (?)";
  db.query(query, [type], (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true });
  });
});
//pobieranie typow szkolen
app.get("/trainingTypes", (req, res) => {
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
//dodawanie szkoleniowca
app.post("/trainingTypes", (req, res) => {
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


//pobieranie szkoleniowcow
app.get("/trainers", (req, res) => {
  const query = `
    SELECT trainers.id, trainers.name, GROUP_CONCAT(trainer_types.type) AS types
    FROM trainers
    LEFT JOIN trainer_types ON trainers.id = trainer_types.trainer_id
    GROUP BY trainers.id
  `;
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
app.delete("/deleteTrainingType/:id", (req, res) => {
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
app.put("/updateTrainingType", (req, res) => {
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
app.delete("/deleteProject/:id", (req, res) => {
  const projectId = req.params.id;
  const query = "DELETE FROM projects WHERE id = ?";
  db.query(query, [projectId], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: "Błąd serwera podczas usuwania projektu." });
    } else {
      res.json({ success: true, message: "Projekt został usunięty." });
    }
  });
});
app.put("/updateProject", (req, res) => {
  const { id, name } = req.body;
  const query = "UPDATE projects SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: "Błąd serwera podczas edycji projektu." });
    } else {
      res.json({ success: true, message: "Projekt został zaktualizowany." });
    }
  });
});
app.post("/addTrainer", async (req, res) => {
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
app.delete("/deleteTrainer/:id", (req, res) => {
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
app.put("/editTrainer/:id", (req, res) => {
  const { id } = req.params;
  const { name, types } = req.body;

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
          const typeInsertQuery =
            "INSERT INTO trainer_types (trainer_id, type) VALUES (?, ?)";
          const typePromises = types.map((typeObj) => {
            return db.promise().query(typeInsertQuery, [id, typeObj.type]);
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
