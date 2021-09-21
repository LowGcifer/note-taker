const express = require("express");
const fs = require("fs");
const path = require("path");
const uniquid = require("uniquid");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  let rawData = fs.readFileSync("./db/db.json", "utf8");
  let notesData = JSON.parse(rawData);
  res.json(notesData);
});

app.post("/api/notes", (req, res) => {
  let rawData = fs.readFileSync("./db/db.json", "utf8");
  let notesData = JSON.parse(rawData);
  const newNoteData = req.body;
  newNoteData.id = uniquid();
  notesData.push(newNoteData);
  let newNotesData = JSON.stringify(notesData);
  fs.writeFileSync("./db/db.json", newNotesData);
  res.json(newNotesData);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteIdToDelete = req.params.id;
  let notesData = JSON.parse(rawData);
  notesData = notesData.filter((data) => data.id != noteIdToDelete);
  let newNotesData = JSON.stringifyu(notesData);
  fs.writeFileSync("./db/db.json", newNotesData);
});

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
