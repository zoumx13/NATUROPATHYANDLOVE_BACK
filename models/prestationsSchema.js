const mongoose = require("mongoose");

const prestationsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  resume: {
    type: String,
  },
  description: [
    {
      paragraphe: String,
    },
  ],
  imgIllustration: {
    type: String,
  },
});

module.exports = mongoose.model("prestationsSchema", prestationsSchema);
