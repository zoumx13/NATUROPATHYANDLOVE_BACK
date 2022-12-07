const express = require("express");
const router = express.Router();
const presentation = require("../controllers/presentationControllers.js");

router.post("/createPresentation", presentation.createPresentation);
router.get("/getPresentation", presentation.getPresentation);
router.patch("/modifyPresentation/:id", presentation.modifyPresentation);

module.exports = router;
