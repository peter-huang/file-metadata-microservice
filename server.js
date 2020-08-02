"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});

// Add middle ware
var multer = require("multer");
var multerCfg = {};

var bodyParser = require("body-parser");
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/
// File Upload
app.post(
  "/api/fileanalyse",
  multer(multerCfg).single("upfile"),
  (req, res, next) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  }
);
