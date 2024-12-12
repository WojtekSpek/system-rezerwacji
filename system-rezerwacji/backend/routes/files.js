const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Konfiguracja multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { projectId, participantId } = req.params;
    const dir = path.join(__dirname, "files", `project_${projectId}`, `participant_${participantId}`);
    fs.mkdirSync(dir, { recursive: true }); // Tworzy katalog, jeśli nie istnieje
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".pdf", ".doc", ".docx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Nieprawidłowy format pliku"));
    }
    cb(null, true);
  },
});

// Endpoint: Upload pliku
router.post("/:projectId/:participantId", upload.single("file"), (req, res) => {
  try {
    res.json({ success: true, message: "Plik został przesłany pomyślnie", filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: "Błąd podczas przesyłania pliku" });
  }
});

// Endpoint: Pobierz pliki uczestnika
router.get("/:projectId/:participantId", (req, res) => {
  const { projectId, participantId } = req.params;
  const dir = path.join(__dirname, "files", `project_${projectId}`, `participant_${participantId}`);

  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Błąd podczas pobierania plików" });
    }
    res.json({ success: true, files });
  });
});

// Endpoint: Usuń plik
router.delete("/:projectId/:participantId/:fileName", (req, res) => {
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
