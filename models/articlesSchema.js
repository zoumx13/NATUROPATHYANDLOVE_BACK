const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  text: {
    type: String,
  },
 
  imgIllustration: {
    type: String,
  },
  date: {
    type: String,
  },
  display: {
    type: Boolean,
  },
});

module.exports = mongoose.model("articlesSchema", articlesSchema);
