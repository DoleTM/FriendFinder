var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });