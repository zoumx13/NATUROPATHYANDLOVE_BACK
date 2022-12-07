const express = require("express");
const router = express.Router();
const prestations = require("../controllers/prestationsControllers");
const multer = require("multer");
const uploadPrestation = multer({ dest: "assets/uploads/prestations" });

router.post("/createPrestation", prestations.createPrestation);
router.get("/getPrestations", prestations.getPrestations);
router.get(
  "/getPrestationDetails/:idPrestation",
  prestations.getPrestationDetails
);
router.delete("/deletePrestation/:id", prestations.deletePrestation);
router.patch("/modifyPrestation/:id", prestations.modifyPrestation);
router.post(
  "/createImagePrestation/:id",
  uploadPrestation.single("file"),
  prestations.addImgPrestation
);

module.exports = router;
