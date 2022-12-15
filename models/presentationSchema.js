const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({

  title: String,
  resume: String,
  description: String,
  imgIllustration: String,


});

module.exports = mongoose.model("presentationSchema", presentationSchema);
