const express = require("express");
require("express-async-errors");
require("dotenv").config();
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", (req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen({ port: 5000 }, () => {
  console.log("listening on port 5000");
});
