const express = require("express");
const router = express.Router();
const recaptcha = require("../controllers/recaptchaControllers");

router.post('/mail', recaptcha.verifyCaptcha)

module.exports = router