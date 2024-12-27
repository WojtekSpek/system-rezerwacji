const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/", async (req, res) => {
    const { content, entityId, entityType, createdBy } = req.body;
    try {
      const [result] = await db.promise().query(
        "INSERT INTO comments (content, entityId, entityType, createdBy) VALUES (?, ?, ?, ?)",
        [content, entityId, entityType, createdBy]
      );
      res.json({ success: true, commentId: result.insertId });
    } catch (error) {
      console.error("Błąd podczas dodawania komentarza:", error);
      res.status(500).json({ success: false });
    }
  });
  
  router.get("/", async (req, res) => {
    const { entityId, entityType } = req.query;
    try {
      const [comments] = await db.promise().query(`
      SELECT 
          c.id, 
          c.content, 
          c.createdAt, 
          c.updatedAt, 
          u.username 
      FROM 
          comments c
      JOIN 
          users u
      ON 
          c.createdBy = u.id
      WHERE 
          c.entityId = ? 
          AND c.entityType = ?
      ORDER BY 
          c.createdAt DESC
      `,        [entityId, entityType]
      );
      console.log('get',comments)
      res.json({ success: true, comments });
    } catch (error) {
      console.error("Błąd podczas pobierania komentarzy:", error);
      res.status(500).json({ success: false });
    }
  });

  router.put("/comments/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      await db.promise().query("UPDATE comments SET content = ? WHERE id = ?", [content, id]);
      res.json({ success: true });
    } catch (error) {
      console.error("Błąd podczas edycji komentarza:", error);
      res.status(500).json({ success: false });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.promise().query("DELETE FROM comments WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
      res.status(500).json({ success: false });
    }
  });

  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.promise().query("DELETE FROM comments WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
      res.status(500).json({ success: false });
    }
  });

  module.exports = router;
