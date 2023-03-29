const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ! req request and res response
app.use(express.static("public"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/notes", (req, res) =>
  // res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
//ADDING A NOTE
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  req.body.id = uuidv4();
  db.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => console.log(err));
  //ARRAY.push(WHAT)
  res.json(db);
});
//GETTING ALL NOTES
app.get("/api/notes", (req, res) => {
  res.json(db);
});

// DELETING NOTES
app.delete("/api/notes/:banana", (req, res) => {
  console.log(req.body);
  req.body.id = uuidv4();
  db.pop(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => console.log(err));
  //ARRAY.push(WHAT)
  res.json(db);
  //Find the note that has the id of req.params.banana
  //Delete the note out of the array
  //resave the new db.json file
  //res.json("whatever you would like to return")
});

// app.delete("/potato/:id", (req, res) => {
//   console.log(req.params.id);
//   res.json("HEY");
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
