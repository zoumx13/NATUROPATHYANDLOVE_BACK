const prestationsSchema = require("../models/prestationsSchema");

const prestations = {
  createPrestation: async (req, res) => {
    const { title, subtitle, resume, description } = req.body;
    const newPrestations = new prestationsSchema({
      title: title,
      subtitle: subtitle,
      resume: resume,
      description: description,
    });
    newPrestations.save((err, data) => {
      if (err) {
        res.status(500).json({ message: "Prestation non créée", err });
      } else {
        res.status(200).json(data);
      }
    });
  },
  modifyPrestation: async (req, res) => {
    const { title, subtitle, resume, description } = req.body;
    try {
      prestationsSchema
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              title: title,
              subtitle: subtitle,
              resume: resume,
              description: description,
            },
          },
          { new: true }
        )
        .then((docs) => res.json({ message: "Prestation modifiée", docs }))
        .catch((err) => res.status(400).send(err));
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  deletePrestation: async (req, res) => {
    prestationsSchema.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "error", err });
      } else {
        res.status(200).json({ message: "data", data });
      }
    });
  },
  getPrestations: async (req, res) => {
    prestationsSchema.find({}, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },
  getPrestationDetails: async (req, res) => {
    prestationsSchema.findById(req.params.idPrestation, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },
  addImgPrestation: (req, res) => {
    if (req.file) {
      const name = req.file.filename;
      const id = req.params.id;
      if (id) {
        const filter = { _id: id };
        const updateImage = {
          imgIllustration: name,
        };
        prestationsSchema.findOneAndUpdate(filter, updateImage, (err) => {
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
