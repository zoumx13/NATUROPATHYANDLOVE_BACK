const mongoose = require("mongoose");

const galerieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imgIllustration: {
    type: String,
  },
});

module.exports = mongoose.model("galerieSchema", galerieSchema);
