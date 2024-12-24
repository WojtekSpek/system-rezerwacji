const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Konfiguracja multer dla trenerów
const trainerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { trainersId } = req.params;
    const dir = path.join(__dirname, "files", "trainers", `trainer_${trainersId}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Konfiguracja multer dla uczestników projektu
const participantStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { projectId, participantId } = req.params;
    const dir = path.join(__dirname, "files", `/projects/project_${projectId}`, `participant_${participantId}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const trainerUpload = multer({ storage: trainerStorage });
const participantUpload = multer({ storage: participantStorage });

// Endpoint: Upload pliku dla trenerów
router.post("/trainer/:trainersId", trainerUpload.single("file"), (req, res) => {
  try {
    res.json({ success: true, message: "Plik został przesłany pomyślnie", filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: "Błąd podczas przesyłania pliku" });
  }
});

// Endpoint: Upload pliku dla uczestników projektu
router.post("/participant/:projectId/:participantId", participantUpload.single("file"), (req, res) => {
  try {
    res.json({ success: true, message: "Plik został przesłany pomyślnie", filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: "Błąd podczas przesyłania pliku" });
  }
});

// Endpoint: Pobierz pliki dla trenerów
router.get("/trainer/:trainersId", (req, res) => {
  console.log('test')
  const { trainersId } = req.params;
  const dir = path.join(__dirname, "files", "trainers", `trainer_${trainersId}`);

  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Błąd podczas pobierania plików" });
    }
    res.json({ success: true, files });
  });
});

// Endpoint: Pobierz pliki dla uczestników projektu
router.get("/participant/:projectId/:participantId", (req, res) => {
  const { projectId, participantId } = req.params;
  const dir = path.join(__dirname, "files", `/projects/project_${projectId}`, `participant_${participantId}`);

  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Błąd podczas pobierania plików" });
    }
    res.json({ success: true, files });
  });
});

// Endpoint: Usuń plik dla trenerów
router.delete("/trainer/:trainersId/:fileName", (req, res) => {
  const { trainersId, fileName } = req.params;
  const filePath = path.join(__dirname, "files", `trainer_${trainersId}`, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Błąd podczas usuwania pliku" });
    }
    res.json({ success: true, message: "Plik został usunięty" });
  });
});

// Endpoint: Usuń plik dla uczestników projektu
router.delete("/participant/:projectId/:participantId/:fileName", (req, res) => {
  const { projectId, participantId, fileName } = req.params;
  const filePath = path.join(__dirname, "files", `project_${projectId}`, `participant_${participantId}`, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Błąd podczas usuwania pliku" });
    }
    res.json({ success: true, message: "Plik został usunięty" });
  });
});

module.exports = router;
