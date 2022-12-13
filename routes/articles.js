const express = require("express");
const router = express.Router();
const articles = require("../controllers/articlesControllers");
const multer = require("multer");
const uploadArticle = multer({ dest: "assets/uploads/articles" });
const token = require("../middlewares/middleware");

router.post("/createPost", token.checkToken, articles.createPost);
router.get("/getPosts", articles.getPosts);
router.get("/getPost/:idArticle", articles.getPostDetails);
router.delete("/deletePost/:id", token.checkToken, articles.deletePost);
router.patch("/modifyPost/:idArticle", token.checkToken, articles.modifyPost);
router.post(
  "/createImageArticle/:idArticle",
  uploadArticle.single("file"),
  articles.addImgArticle
);

module.exports = router;
