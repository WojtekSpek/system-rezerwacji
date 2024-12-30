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

const app = express();
//const PORT = 5000;

// Konfiguracja bazy danych
const db = require("./config/database"); // upewnij się, że masz ten plik

// Konfiguracja CORS
app.use(cors({
  origin: "http://localhost:3000",
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
    sameSite: "lax",
  },
}));

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
  console.log(`Serwer działa na porcie ${process.env.PORT}`);
});
