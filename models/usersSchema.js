const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  identifiant: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("userSchema", usersSchema);
