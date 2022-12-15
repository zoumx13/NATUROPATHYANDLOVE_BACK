const express = require("express");
const router = express.Router();
const presentation = require("../controllers/presentationControllers.js");
const multer = require("multer");
const uploadArticle = multer({ dest: "assets/uploads/presentation" });
const token = require("../middlewares/middleware");

router.post("/createPresentation", presentation.createPresentation);
router.get("/getPresentation/", presentation.getPresentation);
router.patch("/modifyPresentation/:id", presentation.modifyPresentation);
router.post(
  "/createImagePresentation/:id",
  uploadArticle.single("file"),
  presentation.addImgPresentation
);

module.exports = router;
