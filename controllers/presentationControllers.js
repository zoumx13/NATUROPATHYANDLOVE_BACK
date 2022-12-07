const presentationSchema = require("../models/presentationSchema");

const prestations = {
  modifyPresentation: async (req, res) => {
    const { quiSuisJe, concept } = req.body;
    try {
      presentationSchema
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              quiSuisJe: quiSuisJe,
              concept: concept,
            },
          },
          { new: true }
        )
        .then((docs) => res.json({ message: "Presentation modifiée", docs }))
        .catch((err) => res.status(400).send(err));
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getPresentation: async (req, res) => {
    presentationSchema.find({}, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },
  createPresentation: async (req, res) => {
    let { quiSuisJe, concept } = req.body;
    const newPresentation = new presentationSchema({
      quiSuisJe: quiSuisJe,
      concept: concept,
    });
    newPresentation.save((err, data) => {
      if (err) {
        res.status(500).json({ message: "Présentation non créée", err });
      } else {
        res.status(200).json(data);
      }
    });
  },
};

module.exports = prestations;
