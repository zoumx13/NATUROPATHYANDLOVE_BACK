const galerieSchema = require("../models/galerieSchema");

const galerie = {
  createGalerie: async (req, res) => {
    const { title, description, imgIllustration } = req.body;
    console.log(title, description);
    const newGalerie = new galerieSchema({
      title: title,
      description: description,
      imgIllustration: imgIllustration,
    });
    newGalerie.save((err, data) => {
      if (err) {
        console.log("ERRRRRRRRRRRRRREUR");
        res.status(500).json({ message: "Galerie non créée", err });
      } else {
        console.log("OKKKKKKKKKKKKKKKKKKKK");
        res.status(200).json(data);
      }
    });
  },
  deleteGalerie: async (req, res) => {
    galerieSchema.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "error", err });
      } else {
        res.status(200).json({ message: "data", data });
      }
    });
  },
  getGalerie: async (req, res) => {
    galerieSchema.find({}, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },
  addImgGalerie: (req, res) => {
    if (req.file) {
      const name = req.file.filename;
      const id = req.params.id;
      if (id) {
        const filter = { _id: id };
        const updateImage = {
          imgIllustration: name,
        };
        galerieSchema.findOneAndUpdate(filter, updateImage, (err) => {
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

module.exports = galerie;
