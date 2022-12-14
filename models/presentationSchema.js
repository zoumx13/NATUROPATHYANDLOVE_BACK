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
      imgIllustration: [
        {
          type: String,
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
      imgIllustration: [
        {
          type: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("presentationSchema", presentationSchema);
