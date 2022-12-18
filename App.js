var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

let usersRouter = require("./routes/users");
let articlesRouter = require("./routes/articles");
let prestationsRouter = require("./routes/prestations");
let presentationRouter = require("./routes/presentation");
let galerieRouter = require("./routes/galerie");
let recaptchaRouter = require("./routes/recaptcha")

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "assets/uploads")));

// Création de route ici

app.use("/", usersRouter);
app.use("/", articlesRouter);
app.use("/", prestationsRouter);
app.use("/", presentationRouter);
app.use("/", galerieRouter);
app.use("/", recaptchaRouter)

module.exports = app;
