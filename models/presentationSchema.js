const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
  quiSuisJe: [
    {
      resume: String,
      description: [
        {
          subtitle: String,
          paragraphe: String,
        },
      ],
    },
  ],
  concept: [
    {
      resume: String,
      description: [
        {
          subtitle: String,
          paragraphe: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("presentationSchema", presentationSchema);
