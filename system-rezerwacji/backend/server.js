require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

// Importy tras
const projectRoutes = require("./routes/project");
const participantRoutes = require("./routes/participant");
const userRoutes = require("./routes/user");
const trainersRoutes = require("./routes/trainers");
const filesRoutes = require("./routes/files");
const calendarRoutes = require("./routes/calendar");
const commentaryRoutes = require("./routes/Commentary");
const groupRoutes = require("./routes/group");
const skillsRoutes = require("./routes/skills");
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const app = express();
const PORT = process.env.PORT || 5000; // Lokalnie 5000, na Render użyje zmiennej środowiskowej PORT

// Konfiguracja bazy danych
const db = require("./config/database"); // upewnij się, że masz ten plik

// Konfiguracja CORS
app.use(cors({
  origin: ["http://system-rezerwacji:10000", "http://localhost:3000" ], // Zmienna URL twojego frontendu
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Konfiguracja sesji
app.use(session({
  secret: "e1b8b0eae26b2f72a024db11c8f238e849a9c3d4a2f98d239c3f07cda7b8f1e2",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true, jeśli używasz HTTPS
    httpOnly: true,
    sameSite: "None",
  },
}));
app.use((req, res, next) => {
  console.log("Ciasteczko w żądaniu:", req.headers.cookie);
  console.log("Sesja użytkownika:", req.session);
  next();
});

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

// Rejestracja tras
app.use("/projects", projectRoutes);
app.use("/participants", participantRoutes);
app.use("/users", userRoutes);
app.use("/trainers", trainersRoutes);
app.use("/files", filesRoutes);
app.use("/calendar", calendarRoutes);
app.use("/comments", commentaryRoutes);
app.use("/group", groupRoutes);
app.use("/skills", skillsRoutes);

// Uruchomienie serwera

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
