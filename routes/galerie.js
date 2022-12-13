const express = require("express");
const router = express.Router();
const galerie = require("../controllers/galerieControllers");
const multer = require("multer");
const uploadGalerie = multer({ dest: "assets/uploads/galerie" });
const token = require("../middlewares/middleware");

router.get("/getGalerie", galerie.getGalerie);
router.post("/createGalerie", token.checkToken, galerie.createGalerie);
router.delete("/deleteGalerie/:id", token.checkToken, galerie.deleteGalerie);
router.post(
  "/createImageGalerie/:id",
  uploadGalerie.single("file"),
  galerie.addImgGalerie
);

module.exports = router;
