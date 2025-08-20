// server.js (ESM version)
// Run with: npm run server

import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

// SQLite connection (creates file if it doesn't exist)
const db = new Database("events.db");

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL
  )
`).run();

// Health check
app.get("/", (req, res) => {
    res.send("🎺 Welcome to the New Orleans Events API (SQLite)!");
});

// READ all
app.get("/api/events", (req, res) => {
    const rows = db.prepare("SELECT * FROM events ORDER BY date ASC, id ASC").all();
    res.json(rows);
});

// CREATE
app.post("/api/events", (req, res) => {
    const { name, date, location } = req.body || {};
    if (!name || !date || !location) {
        return res.status(400).json({ error: "name, date, and location are required" });
    }
    const info = db
        .prepare("INSERT INTO events (name, date, location) VALUES (?, ?, ?)")
        .run(name.trim(), date.trim(), location.trim());
    const created = db.prepare("SELECT * FROM events WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(created);
});

// UPDATE
app.put("/api/events/:id", (req, res) => {
    const { id } = req.params;
    const { name, date, location } = req.body || {};
    const existing = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
    if (!existing) return res.status(404).json({ error: "Event not found" });

    const next = {
        name: name?.trim() || existing.name,
        date: date?.trim() || existing.date,
        location: location?.trim() || existing.location,
    };

    const info = db
        .prepare("UPDATE events SET name = ?, date = ?, location = ? WHERE id = ?")
        .run(next.name, next.date, next.location, id);

    if (info.changes) {
        const updated = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
        return res.json(updated);
    }
    res.status(500).json({ error: "No changes applied" });
});

// DELETE
app.delete("/api/events/:id", (req, res) => {
    const { id } = req.params;
    const info = db.prepare("DELETE FROM events WHERE id = ?").run(id);
    if (!info.changes) return res.status(404).json({ error: "Event not found" });
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
