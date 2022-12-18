require("dotenv").config();
const nodemailer = require("nodemailer");

const mailController = {
  verifyCaptcha: async (req, res) => {
    if (!req.body.token) {
      return res.json({ msg: "no token captcha" });
    } else {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${req.body.token}`;
      try {
        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(verifyUrl, options);
        let data = await response.json();
        if (data.success === false) {
          return res.json({ msg: "not allowed" });
        }
        return mailController.sendMail(req, res);
      } catch (err) {
        return res.json(500).json({ msg: err });
      }
    }
  },
  sendMail: async (req, res) => {
    try {
      const infos = {
        civilite: req.body.civilite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        interet: req.body.interet,
        message: req.body.message,
      };

      const transporter = mailController.createTransporter();

      const mailOptions = mailController.createOptions(infos);

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ msg: "Formulaire transmis" });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
  createTransporter: (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.REACT_APP_MAIL,
        pass: process.env.REACT_APP_PASSWORD,
        clientId: process.env.REACT_APP_OAUTH_CLIENTID,
        clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.REACT_APP_OAUTH_REFRESH_TOKEN,
      },
    });
    return transporter;
  },
  createOptions: (infos) => {
    let mailOptions = {
      from: infos.email,
      to: process.env.REACT_APP_MAIL,
      subject: "Demande de renseignements Naturopathy & Love",
      replyTo: infos.email,
      text: `Nouveau message pour Naturopathy & Love :\n\n${infos.civilite} ${infos.nom} ${infos.prenom} \n\nTéléphone : ${infos.telephone}\nEmail : ${infos.email}\nIntéressé(e) par : ${infos.interet}\n\nMessage : ${infos.message} `,
    };
    return mailOptions;
  },
};

module.exports = mailController;
