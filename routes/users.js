const express = require("express");
const router = express.Router();
const users = require("../controllers/usersControllers");

router.post("/connexion", users.SignIn);
router.post("/inscription", users.CreateUser);

module.exports = router;
