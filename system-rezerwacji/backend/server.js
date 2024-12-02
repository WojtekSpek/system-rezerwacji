const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfiguracja bazy danych
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Nazwa użytkownika bazy danych
  password: "password", // Hasło do bazy danych
  database: "rezerwacja", // Nazwa bazy danych
});

// Połączenie z bazą danych
db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
    return;
  }
  console.log("Połączono z bazą danych.");
});

// Endpoint: logowanie
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Błąd serwera" });
    } else if (results.length > 0) {
      res.status(200).send({ message: "Zalogowano pomyślnie" });
    } else {
      res.status(401).send({ error: "Nieprawidłowe dane logowania" });
    }
  });
});

// Endpoint: dodanie użytkownika
app.post("/add-user", (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err) => {
    if (err) {
      res.status(500).send({ error: "Błąd dodawania użytkownika" });
    } else {
      res.status(201).send({ message: "Użytkownik dodany pomyślnie" });
    }
  });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
