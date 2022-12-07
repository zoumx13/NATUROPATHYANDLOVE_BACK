var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

let usersRouter = require("./routes/users");
let articlesRouter = require("./routes/articles");
let prestationsRouter = require("./routes/prestations");
let presentationRouter = require("./routes/presentation");

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "assets/uploads")));

// Création de route ici

// app.use("/", blogRouteur);
app.use("/", usersRouter);
app.use("/", articlesRouter);
app.use("/", prestationsRouter);
app.use("/", presentationRouter);

module.exports = app;
