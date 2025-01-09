const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../config/database");
const { authenticateUser, authorizeRole } = require("../middlewares/auth");

// Pobieranie projektów
router.get("/", authenticateUser, async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM projects");
    res.json({ success: true, projects: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania projektów:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobieranie uczestników projektu
router.get("/:projectId/participants", async (req, res) => {
  const { projectId } = req.params;
   console.log('odebrane',projectId)
  const query = `
    SELECT p.id, p.firstName, p.lastName
    FROM participants p
    INNER JOIN project_participants pp ON p.id = pp.participant_id
    WHERE pp.project_id = ?
  `;

  try {
    const [rows] = await db.promise().query(query, [projectId]);
    //console.log('rows-',req)
    res.json({ success: true, participants: rows });
  } catch (error) {
    console.error("Błąd podczas pobierania uczestników projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Pobranie wszystkich typów szkoleń
router.get("/trainingTypes", async (req, res) => {
  //console.log('wojtek')
  try {
    const [rows] = await db.promise().query(
      "SELECT id, type FROM training_types"
    );
  
    res.json({
      success: true,
      data: rows, // Zwraca wszystkie typy jako obiekty
    });
  } catch (error) {
    console.error("Błąd podczas pobierania typów szkoleń:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Endpoint GET /projects/:id
router.get("/:id", async (req, res) => {
  const projectId = req.params.id;

  const query = `
    SELECT 
        p.id AS project_id,
        p.name AS project_name,
        p.created_by,
        p.created_at,
        GROUP_CONCAT(pt.type) AS types
    FROM 
        projects p
    LEFT JOIN 
        project_training_types ptt ON p.id = ptt.project_id
    LEFT JOIN 
        training_types pt ON ptt.training_type_id = pt.id
    WHERE 
        p.id = ?
    GROUP BY 
        p.id, p.name, p.created_by, p.created_at;
  `;

  try {
    const [rows] = await db.promise().execute(query, [projectId]);
    //console.log("Wynik zapytania:", rows);
  
    if (Array.isArray(rows) && rows.length > 0) {
      res.json({
        success: true,
        project: rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Projekt nie został znaleziony",
      });
    }
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    res.status(500).json({
      success: false,
      message: "Wystąpił błąd serwera",
    });
  }
});

// Dodawanie projektu
router.post("/addProject", authenticateUser, async (req, res) => {
  const { name, trainingTypes, createdBy } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    const [result] = await db.promise().query(
      "INSERT INTO projects (name, created_at, created_by) VALUES (?, NOW(), ?)",
      [name, createdBy]
    );

    if (trainingTypes && trainingTypes.length > 0) {
      const projectId = result.insertId;
      const typeQueries = trainingTypes.map((typeId) =>
        db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id) VALUES (?, ?)",
          [projectId, typeId]
        )
      );
      await Promise.all(typeQueries);
    }

    res.json({ success: true, message: "Projekt został dodany." });
  } catch (error) {
    console.error("Błąd podczas dodawania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Aktualizacja projektu
router.put("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { name, trainingTypes } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    await db.promise().query("UPDATE projects SET name = ? WHERE id = ?", [name, id]);
    await db.promise().query("DELETE FROM project_training_types WHERE project_id = ?", [id]);

    if (trainingTypes && trainingTypes.length > 0) {
      const typeQueries = trainingTypes.map((typeId) =>
        db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id) VALUES (?, ?)",
          [id, typeId]
        )
      );
      await Promise.all(typeQueries);
    }

    res.json({ success: true, message: "Projekt został zaktualizowany." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

// Usuwanie projektu
router.delete("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM projects WHERE id = ?", [id]);
    res.json({ success: true, message: "Projekt został usunięty." });
  } catch (error) {
    console.error("Błąd podczas usuwania projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.put("/updateProject/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const projectId = req.params.id; // ID projektu z URL
  const { name, types } = req.body; // Dane przesłane w żądaniu

  //console.log("req.body update", req.body);

  if (!name) {
    return res.status(400).json({ success: false, message: "Nazwa projektu jest wymagana." });
  }

  try {
    // Aktualizacja nazwy projektu
    await db.promise().query("UPDATE projects SET name = ? WHERE id = ?", [name, projectId]);

    // Pobierz istniejące typy dla projektu
    const [existingTypes] = await db.promise().query(
      "SELECT training_type_id, planned_hours FROM project_training_types WHERE project_id = ?",
      [projectId]
    );

    const existingTypeIds = existingTypes.map((row) => row.training_type_id);

    // Typy do dodania
    const typesToAdd = types.filter((typeId) => !existingTypeIds.includes(typeId));

    // Typy do usunięcia
    const typesToRemove = existingTypeIds.filter((typeId) => !types.includes(typeId));

    // Usuń typy, które zostały usunięte w aktualizacji
    if (typesToRemove.length > 0) {
      await db.promise().query(
        "DELETE FROM project_training_types WHERE project_id = ? AND training_type_id IN (?)",
        [projectId, typesToRemove]
      );
    }

    // Dodaj nowe typy
    if (typesToAdd.length > 0) {
      const typeInsertPromises = typesToAdd.map((typeId) => {
        return db.promise().query(
          "INSERT INTO project_training_types (project_id, training_type_id, planned_hours) VALUES (?, ?, ?)",
          [projectId, typeId, 0] // Domyślna wartość planned_hours (np. 0 lub null)
        );
      });
      await Promise.all(typeInsertPromises);
    }

    res.json({ success: true, message: "Projekt został zaktualizowany." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});


// Pobranie typów przypisanych do projektu
router.get("/project_training_types/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT t.id,t.type 
       FROM project_training_types pt
       INNER JOIN training_types t ON pt.training_type_id = t.id
       WHERE pt.project_id = ?`,
      [projectId]
    );

    res.json({
      success: true,
     // types: rows.map((row) => row.type), // Wyciągnięcie nazw typów
      types: rows, // Wyciągnięcie nazw typów
    });
    //console.log('types',rows);
  } catch (error) {
    console.error("Błąd podczas pobierania typów projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});



router.post("/:id/participants", async (req, res) => {
  const { id } = req.params;
  const { participantId } = req.body;



  if (!id || !participantId) {
    return res.status(400).json({ success: false, message: "Brak wymaganych danych." });
  }

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





// Usuwanie uczestnika z projektu
router.delete("/:projectId/participants/:participantId", async (req, res) => {
  const { projectId, participantId } = req.params;

  const query = `
    DELETE FROM project_participants
    WHERE project_id = ? AND participant_id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [projectId, participantId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Nie znaleziono uczestnika w projekcie.",
      });
    }

    res.json({
      success: true,
      message: "Uczestnik został usunięty z projektu.",
    });
  } catch (error) {
    console.error("Błąd podczas usuwania uczestnika z projektu:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera.",
    });
  }
});
router.delete("/:projectId/trainers/:typeId/:trainerId", async (req, res) => {
  const { projectId, typeId, trainerId } = req.params;

  const query = `
    DELETE FROM project_trainers
    WHERE project_id = ? AND trainer_id = ? AND training_type_id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [projectId, trainerId, typeId]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Szkoleniowiec został usunięty z projektu." });
    } else {
      res.status(404).json({
        success: false,
        message: "Nie znaleziono szkoleniowca przypisanego do tego typu w projekcie.",
      });
    }
  } catch (error) {
    console.error("Błąd podczas usuwania szkoleniowca z projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.post("/:projectId/trainers", async (req, res) => {
  const { projectId } = req.params;
  const { trainerId, typeId } = req.body;

  if (!trainerId || !typeId) {
    return res.status(400).json({ success: false, message: "Brak wymaganych danych." });
  }

  const query = `
    INSERT INTO project_trainers (project_id, trainer_id, training_type_id)
    VALUES (?, ?, ?)
  `;

  try {
    await db.promise().query(query, [projectId, trainerId, typeId]);
    res.json({ success: true, message: "Szkoleniowiec został dodany do projektu." });
  } catch (error) {
    console.error("Błąd podczas dodawania szkoleniowca do projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.get("/:projectId/trainers/:typeId", async (req, res) => {
  const { projectId, typeId } = req.params;

  const query = `
    SELECT 
      pt.id AS projectTrainerId,
      t.id AS trainerId,
      t.name AS trainerName
    FROM project_trainers pt
    INNER JOIN trainers t ON pt.trainer_id = t.id
    WHERE pt.project_id = ? AND pt.training_type_id = ?
  `;

  try {
    // Upewnij się, że typeId jest przekazywane jako liczba
    const numericTypeId = parseInt(typeId, 10);
    if (isNaN(numericTypeId)) {
      return res.status(400).json({ success: false, message: "Invalid typeId" });
    }

    const [rows] = await db.promise().query(query, [projectId, numericTypeId]);

    res.json({
      success: true,
      trainers: rows.map((row) => ({
        id: row.trainerId,
        name: row.trainerName,
        projectTrainerId: row.projectTrainerId,
      })),
    });
  } catch (error) {
    console.error("Błąd podczas pobierania szkoleniowców:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.get("/:projectId/participants/:participantId", async (req, res) => {
  const { projectId, participantId } = req.params;

  try {
    // Pobieranie danych uczestnika
    const [participantData] = await db.promise().query(
      "SELECT * FROM participants WHERE id = ?",
      [participantId]
    );

    if (participantData.length === 0) {
      return res.status(404).json({ success: false, message: "Nie znaleziono uczestnika." });
    }

    // Pobieranie typów związanych z uczestnikiem i projektem
    const [participantTypes] = await db.promise().query(
      `SELECT t.id AS typeId, t.type 
       FROM project_training_types ptt
       INNER JOIN training_types t ON ptt.training_type_id = t.id
       WHERE ptt.project_id = ?`,
      [projectId]
    );

    res.json({
      success: true,
      participant: {
        ...participantData[0],
        types: participantTypes.map((row) => ({
          id: row.typeId,
          name: row.type, // Zmienna nazwa typu
        })), // Lista typów z id i nazwą
      },
    });
  } catch (error) {
    console.error("Błąd podczas pobierania danych uczestnika projektu:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});

router.put("/:projectId/types/:typeId", async (req, res) => {
  const { projectId, typeId } = req.params;
  const { plannedHours } = req.body;
console.log(req.params)
console.log(req.body)
  try {
    const query = `
      UPDATE project_training_types
      SET planned_hours = ?
      WHERE training_type_id = ? AND project_id = ?
    `;
    await db.promise().query(query, [plannedHours, typeId, projectId]);

    res.json({ success: true, message: "Planowane godziny zostały zaktualizowane." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji planowanych godzin:", error);
    res.status(500).json({ success: false, message: "Błąd serwera." });
  }
});


// Endpoint do obliczenia sumy godzin dla danego typu i projektu
router.get("/events/total-hours/:projectId/:type/:participantId", async (req, res) => {
  const { projectId, type, participantId } = req.params; // Pobierz ID projektu, typ wydarzenia i ID uczestnika z parametrów URL

  console.log("req.params:", req.params);

  if (!projectId || !type || !participantId) {
    return res.status(400).json({
      success: false,
      message: "Brak wymaganych parametrów: projectId, type lub participantId.",
    });
  }

  try {
    // Zapytanie SQL do obliczenia sumy godzin
    const query = `
      SELECT SUM(TIMESTAMPDIFF(SECOND, start, end)) / 3600 AS total_hours
      FROM events
      WHERE type = (
        SELECT type
        FROM training_types
        WHERE id = ?
      )
      AND project_id = ?
      AND participant_id = ?;
    `;

    // Wykonaj zapytanie SQL z parametrami
    const [result] = await db.promise().query(query, [type, projectId, participantId]);
    console.log("SQL Result:", result);

    // Odpowiedź z wynikiem
    res.json({
      success: true,
      totalHours: parseFloat(result[0]?.total_hours || 0), // Parsowanie wyniku jako liczba
    });
  } catch (error) {
    console.error("Błąd podczas obliczania sumy godzin:", error);
    res.status(500).json({
      success: false,
      message: "Nie udało się obliczyć sumy godzin.",
    });
  }
});


// GET /projects/:projectId/types/:typeId/hours
router.get("/:projectId/types/:typeId/planned-hours", async (req, res) => {
  const { projectId, typeId } = req.params;
 console.log('godziny ',req.params)
  try {
    // Sumowanie godzin przydzielonych dla danego typu i projektu
    const query = `
      SELECT 
      planned_hours
      FROM project_training_types
      WHERE project_id = ? AND training_type_id = ? 
    `;
    const [rows] = await db.promise().query(query, [projectId, typeId]);
console.log('rows',rows)
    const assignedHours = rows[0]?.planned_hours || 0;

    res.json({
      success: true,
      assignedHours,
    });
  } catch (error) {
    console.error("Błąd podczas pobierania godzin przydzielonych:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera podczas pobierania godzin.",
    });
  }
});



router.get("/:projectId/participants-with-hours", async (req, res) => {
  const { projectId } = req.params;

  try {
    // Pobierz wszystkie typy godzin powiązane z projektem
    const typesQuery = `
      SELECT tt.id AS typeId, tt.type AS typeName, pt.planned_hours AS plannedHours
      FROM project_training_types pt
      JOIN training_types tt ON tt.id = pt.training_type_id
      WHERE pt.project_id = ?
    `;
    const [types] = await db.promise().query(typesQuery, [projectId]);

    // Pobierz dane uczestników i ich godzin
    const participantsQuery = `
      SELECT 
          p.id AS participantId,
          p.firstName,
          p.lastName,
          e.groupId AS typeId,
          tt.type AS typeName,
          SUM(TIMESTAMPDIFF(SECOND, e.start, e.end) / 3600) AS totalHours
      FROM project_participants pp
      INNER JOIN participants p ON pp.participant_id = p.id
      LEFT JOIN events e ON e.participant_id = p.id AND e.project_id = pp.project_id
      LEFT JOIN training_types tt ON tt.id = e.groupId AND isGroupEvent=0
      WHERE pp.project_id = ?
      GROUP BY p.id, e.groupId;
    `;
    const [rows] = await db.promise().query(participantsQuery, [projectId]);

    // Grupowanie uczestników i uzupełnianie typów godzin
    const groupedParticipants = rows.reduce((acc, row) => {
      const { participantId, firstName, lastName, typeId, typeName, totalHours } = row;

      // Znajdź lub utwórz uczestnika
      let participant = acc.find((p) => p.participantId === participantId);
      if (!participant) {
        participant = {
          participantId,
          firstName,
          lastName,
          types: {}, // Obiekt na typy godzin
        };
        acc.push(participant);
      }

      // Dodaj dane typu godzin (tylko jeśli istnieją)
      if (typeId) {
        participant.types[typeId] = {
          typeName,
          totalHours: totalHours || 0,
          plannedHours: 0, // Ustawimy później
        };
      }

      return acc;
    }, []);

    // Uzupełnij brakujące typy godzin dla każdego uczestnika
    groupedParticipants.forEach((participant) => {
      types.forEach((type) => {
        if (!participant.types[type.typeId]) {
          participant.types[type.typeId] = {
            typeName: type.typeName,
            totalHours: 0,
            plannedHours: type.plannedHours || 0,
          };
        } else {
          // Przypisz planowane godziny z `types`
          participant.types[type.typeId].plannedHours = type.plannedHours || 0;
        }
      });
    });

    res.json({ success: true, participants: groupedParticipants });
  } catch (error) {
    console.error("Błąd podczas pobierania uczestników i godzin:", error);
    res.status(500).json({ success: false, message: "Nie udało się pobrać danych." });
  }
});


// GET - Pobierz planned_hours dla wybranego projektu i typów
router.get("/:projectId/training-types/hours", async (req, res) => {
  const { projectId } = req.params;

  try {
    const query = `
      SELECT pt.training_type_id, t.type AS typeName, pt.planned_hours
      FROM project_training_types pt
      INNER JOIN training_types t ON pt.training_type_id = t.id
      WHERE pt.project_id = ?
    `;
    const [rows] = await db.promise().query(query, [projectId]);
console.log('rows',rows);
    res.json({
      success: true,
      trainingHours: rows,
    });
  } catch (error) {
    console.error("Błąd podczas pobierania godzin szkoleń:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera.",
    });
  }
});

// PUT - Aktualizuj planned_hours dla konkretnego typu szkolenia
router.put("/:projectId/training-types/:typeId", async (req, res) => {
  const { projectId, typeId } = req.params;
  const { plannedHours } = req.body;
  console.log('req.body',req.body)
  console.log('req.params',req.params)
  try {
    const query = `
      UPDATE project_training_types
      SET planned_hours = ?
      WHERE project_id = ? AND training_type_id = ?
    `;
    const [result] = await db.promise().query(query, [plannedHours, projectId, typeId]);

    if (result.affectedRows > 0) {
      res.json({
        success: true,
        message: "Czas szkolenia został zaktualizowany.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Nie znaleziono typu szkolenia dla projektu.",
      });
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji godzin szkoleń:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera.",
    });
  }
});

module.exports = router;
