const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const port = process.env.PORT || "8000";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/home.html'));
  });

app.get("/word-list", (req, res) => {
    fs.readFile('output.json', 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });