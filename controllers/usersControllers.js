const usersSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const users = {
  CreateUser: async (req, res) => {
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(505).json(err);
      } else {
        const newUser = new usersSchema({
          identifiant: req.body.identifiant,
          password: hash,
        });
        newUser.save((err, data) => {
          if (err) {
            res.status(500).json({ message: "Impossible de s'enregistrer" });
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
  },
  SignIn: async (req, res) => {
    const identifiant = req.body.identifiant;
    const password = req.body.password;

    usersSchema.findOne({ identifiant: identifiant }, (err, data) => {
      if (!data) {
        res.status(404).json({ message: "Echec1" });
      } else {
        bcrypt.compare(password, data.password, (error, hash) => {
          if (error) {
            res.status(404).json({ message: "Echec2" });
          } else {
            if (!hash) {
              res.status(404).json({ message: "Echec3" });
            } else {
              const token = jwt.sign(
                {
                  userId: data._id,
                },
                process.env.DB_TOKEN_SECRET_KEY,
                { expiresIn: maxAge }
              );
              res.json({
                token: token,
                message: "Connecté",
              });
            }
          }
        });
      }
    });
  },
};

module.exports = users;
