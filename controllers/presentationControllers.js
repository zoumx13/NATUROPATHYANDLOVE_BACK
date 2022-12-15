const presentationSchema = require("../models/presentationSchema");

const prestations = {
  modifyPresentation: async (req, res) => {
    const { title, resume, description } = req.body;
    try {
      if (title) {
        presentationSchema
          .findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                title: title,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Presentation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (resume) {
        presentationSchema
          .findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                resume: resume,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Presentation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (description) {
        presentationSchema
          .findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                description: description,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Presentation modifiée", docs }))
          .catch((err) => res.status(400).send(err));

      }
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
    let { title, resume, description } = req.body;
    const newPresentation = new presentationSchema({
      title: title,
      resume: resume,
      description: description,
      imgIllustration: "galerie1.jpg"
    });
    newPresentation.save((err, data) => {
      if (err) {
        res.status(500).json({ message: "Présentation non créée", err });
      } else {
        res.status(200).json(data);
      }
    });
  },
  addImgPresentation: (req, res) => {
    if (req.file) {
      const name = req.file.filename;
      const id = req.params.id;
      if (id) {
        const filter = { _id: id };
        const updateImage = {
          imgIllustration: name,
        };
        presentationSchema.findOneAndUpdate(filter, updateImage, (err) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json({ message: name });
          }
        });
      } else {
        res.json({ message: "Echec" });
      }
    } else {
      res.json({ message: "Echec" });
    }
  },
};

module.exports = prestations;
