const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  article: {
    type: String,
  },
  imgIllustration: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("articlesSchema", articlesSchema);
