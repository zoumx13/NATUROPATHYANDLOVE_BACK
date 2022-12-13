const prestationsSchema = require("../models/prestationsSchema");

const prestations = {
  createPrestation: async (req, res) => {
    const { title, subtitle, resume } = req.body;
    const newPrestations = new prestationsSchema({
      title: title,
      subtitle: subtitle,
      resume: resume,
      imgIllustration: "galerie1.jpg",
    });
    try {
      const prestation = await newPrestations.save();
      return res.status(201).json(prestation._id);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  modifyPrestation: async (req, res) => {
    const { title, subtitle, resume, description } = req.body;
    console.log(title, subtitle, resume, description, req.params.idPrestation);
    try {
      if (title) {
        prestationsSchema
          .findOneAndUpdate(
            { _id: req.params.idPrestation },
            {
              $set: {
                title: title,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Prestation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (subtitle) {
        prestationsSchema
          .findOneAndUpdate(
            { _id: req.params.idPrestation },
            {
              $set: {
                subtitle: subtitle,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Prestation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (resume) {
        prestationsSchema
          .findOneAndUpdate(
            { _id: req.params.idPrestation },
            {
              $set: {
                resume: resume,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Prestation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (description) {
        prestationsSchema
          .findOneAndUpdate(
            { _id: req.params.idPrestation },
            {
              $set: {
                description: description,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Prestation modifiée", docs }))
          .catch((err) => res.status(400).send(err));
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  deletePrestation: async (req, res) => {
    prestationsSchema.findByIdAndRemove(
      { _id: req.params.idPrestation },
      (err, data) => {
        if (err) {
          res.status(404).json({ message: "error", err });
        } else {
          res.status(200).json({ message: "data", data });
        }
      }
    );
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
