const articlesSchema = require("../models/articlesSchema");

const articles = {
  createPost: async (req, res) => {
    const { title, subtitle } = req.body;
    const newArticles = new articlesSchema({
      title: title,
      subtitle: subtitle,
      date: Date(),
      display: false,
      imgIllustration: "galerie1.jpg",
    });
    try {
      const article = await newArticles.save();
      return res.status(201).json(article._id);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  modifyPost: async (req, res) => {
    const { title, subtitle, text, display } = req.body;
    try {
      if (title) {
        articlesSchema
          .findOneAndUpdate(
            {
              _id: req.params.idArticle,
            },

            {
              $set: {
                title: title,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Article modifié", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (subtitle) {
        articlesSchema
          .findOneAndUpdate(
            {
              _id: req.params.idArticle,
            },

            {
              $set: {
                subtitle: subtitle,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Article modifié", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (text) {
        articlesSchema
          .findOneAndUpdate(
            {
              _id: req.params.idArticle,
            },

            {
              $set: {
                text: text,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Article modifié", docs }))
          .catch((err) => res.status(400).send(err));
      }
      if (display === false || display === true) {
        articlesSchema
          .findOneAndUpdate(
            {
              _id: req.params.idArticle,
            },

            {
              $set: {
                display: display,
              },
            },
            { new: true }
          )
          .then((docs) => res.json({ message: "Article modifié", docs }))
          .catch((err) => res.status(400).send(err));
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  deletePost: async (req, res) => {
    articlesSchema.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "error", err });
      } else {
        res.status(200).json({ message: "data", data });
      }
    });
  },
  getPosts: async (req, res) => {
    articlesSchema.find({}, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },
  getPostDetails: async (req, res) => {
    articlesSchema.findById(req.params.idArticle, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Echec" });
      } else {
        res.json(data);
      }
    });
  },

  addImgArticle: (req, res) => {
    if (req.file) {
      const name = req.file.filename;
      const id = req.params.id;
      if (id) {
        const filter = { _id: id };
        const updateImage = {
          imgIllustration: name,
        };
        articlesSchema.findOneAndUpdate(filter, updateImage, (err) => {
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

module.exports = articles;
