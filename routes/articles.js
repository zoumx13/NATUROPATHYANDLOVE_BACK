const express = require("express");
const router = express.Router();
const articles = require("../controllers/articlesControllers");
const multer = require("multer");
const uploadArticle = multer({ dest: "assets/uploads/articles" });

router.post("/createPost", articles.createPost);
router.get("/getPosts", articles.getPosts);
router.delete("/deletePost/:id", articles.deletePost);
router.patch("/modifyPost/:id", articles.modifyPost);
router.post(
  "/createImageArticle/:id",
  uploadArticle.single("file"),
  articles.addImgArticle
);

module.exports = router;
