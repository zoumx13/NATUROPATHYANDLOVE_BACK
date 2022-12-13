const express = require("express");
const router = express.Router();
const users = require("../controllers/usersControllers");
const token = require("../middlewares/middleware");

router.post("/connexion", users.SignIn);
router.post("/inscription", users.CreateUser);
router.get("/user", token.tokenContext, users.GetUser);

module.exports = router;
