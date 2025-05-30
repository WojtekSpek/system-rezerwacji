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

const API_BASE_URL = process.env.NODE_ENV == 'production' 
? process.env.REACT_APP_API_BASE_URL
  : process.env.REACT_APP_HOST_LAN_URL + ':' + process.env.CLIENT_PORT;

const app = express();
const PORT = process.env.PORT || 5000; // Lokalnie 5000, na Render użyje zmiennej środowiskowej PORT

// Konfiguracja bazy danych
const db = require("./config/database"); // upewnij się, że masz ten plik


// Konfiguracja CORS
app.use(cors({
  origin: API_BASE_URL, // Zmienna URL twojego frontendu
  credentials: true,
  //preflightContinue: true,
})); 

const path = require("path");



// Middleware
//app.use(bodyParser.json());
app.use(express.json());

// Konfiguracja sesji
if (process.env.NODE_ENV == 'production') {
  app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      secure: true,//jeśli używasz HTTPS
      httpOnly: true,
      sameSite: process.env.COOKIE_SAME_SITE, // jeżeli == "None" to secure też = true
      maxAge: 60 * 60 * 1000,
    },
  }));
}
else {
  app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,//jeśli używasz HTTPS
      httpOnly: true,
      sameSite: 'strict',       
    },
  }));
}

app.use((req, res, next) => {
  console.log("Ciasteczko:",  req.cookies);
  console.log("Ciasteczko w żądaniu:", req.headers.cookie);
  console.log("Sesja użytkownika:", req.session);
  console.log(`Żądanie przychodzi z adresu: ${req.headers.origin}`);
  console.log(`Ścieżka: ${req.path}`);
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

// Serve static files from the React app
/*@! tylko gdy używasz develop local build 
app.use(express.static(path.join(__dirname, "../frontend/build")));
*/

// Catch-all to send all other requests to React's index.html
/*
//@! tylko gdy używasz develop local build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
}); */


app.get('/users/session', function (req, res) {
  console.log('Session na backendzie:', req.session); // Sprawdź sesję przy każdym żądaniu
  
  if (!req.session.user) {
    return res.status(401).send('User not authenticated');
  }
  res.status(200).send(req.session.user);
});


// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});