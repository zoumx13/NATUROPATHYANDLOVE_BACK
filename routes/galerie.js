const express = require("express");
const router = express.Router();
const galerie = require("../controllers/galerieControllers");
const multer = require("multer");
const uploadGalerie = multer({ dest: "assets/uploads/galerie" });

router.get("/getGalerie", galerie.getGalerie);
router.post("/createGalerie", galerie.createGalerie);
router.delete("/deleteGalerie/:id", galerie.deleteGalerie);
router.post(
  "/createImageGalerie/:id",
  uploadGalerie.single("file"),
  galerie.addImgGalerie
);

module.exports = router;
